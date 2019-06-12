package gov.nih.nci.icdc.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.neo4j.driver.v1.AuthTokens;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.GraphDatabase;
import org.neo4j.driver.v1.Session;
import org.neo4j.driver.v1.StatementResult;
import org.neo4j.driver.v1.Transaction;
import org.neo4j.driver.v1.TransactionWork;
import org.neo4j.graphql.SchemaBuilder;
import org.neo4j.graphql.Translator;
import org.neo4j.graphql.Translator.Cypher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gov.nih.nci.icdc.model.ConfigurationDAO;

/**
 * Service bean for GraphQL to Cypher. This bean expose query function which
 * take graphql and then translate graphql script into cypher, execute cypher
 * return cypher result.
 */

@Service
public class GraphQLToCypherService implements AutoCloseable {

	@Autowired
	private ConfigurationDAO config;

	private Connection conn;

	private Driver driver;

	/**
	 * This function will connect to the neo4j server and init drive. The function
	 * will be triggered after dependency injection done. If connect to neo4j server
	 * fails, the whole application will fail to start.
	 */

	@PostConstruct
	public void initGraphQLService() throws ClassNotFoundException {
		try {
			Class.forName("org.neo4j.jdbc.bolt.BoltDriver");
			this.conn = (Connection) DriverManager.getConnection(config.getNeo4jJDBCServerURI(),
					config.getNeo4jUserName(), config.getNeo4jPassword());
			this.driver = GraphDatabase.driver(config.getNeo4jJavaDriverServerURI(),
					AuthTokens.basic(config.getNeo4jUserName(), config.getNeo4jPassword()));
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public void close() throws Exception {
		driver.close();
	}

	/**
	 * Exposed to the public, this function takes graphql script ( query / mutation
	 * ) translate into cypher and then execute cypher return collection of map
	 * object
	 * 
	 * 
	 * @param graphql script
	 * 
	 * @return List<List<Map<String, Object>>>, if fails to execute cypher will
	 *         return empty object;
	 */

	public List<List<Map<String, Object>>> query(String graphQl) {
		List<Cypher> cyphers = this.translate(graphQl);
		List<List<Map<String, Object>>> results = new ArrayList<List<Map<String, Object>>>();
		for (Cypher cypher : cyphers) {
			results.add(query(cypher.getQuery(), cypher.getParams()));
		}

		return results;
	}

	/**
	 * Private function takes cypher script and params and execute cypher to get
	 * result.
	 * 
	 * @param cypher script and params
	 * 
	 * @return List<Map<String, Object>>, if fails to execute cypher will return
	 *         empty object;
	 */

	private List<Map<String, Object>> query(String query, Map<String, Object> params) {
		try (Session session = driver.session()) {
			List<Map<String, Object>> re = session.writeTransaction(new TransactionWork<List<Map<String, Object>>>() {
				@Override
				public List<Map<String, Object>> execute(Transaction tx) {

					StatementResult result = tx.run(query, params);
					List<Map<String, Object>> listRES = new ArrayList<Map<String, Object>>();
					while (result.hasNext()) {
						listRES.add(result.next().asMap());
					}
					return listRES;
				}

			});
			return re;
		}
	}

	/**
	 * Translator , translate graphql into cypher
	 * 
	 * @param graphql script
	 * 
	 * @return List of cypher object
	 */
	private List<Cypher> translate(String graphql) {
		String schema = config.getGraphSchemas();
		Translator translator = new Translator(SchemaBuilder.buildSchema(schema));
		return translator.translate(graphql);
	}

}