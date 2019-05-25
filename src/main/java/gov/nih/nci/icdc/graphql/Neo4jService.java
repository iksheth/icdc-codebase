package gov.nih.nci.icdc.graphql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.annotation.PostConstruct;

import org.neo4j.driver.v1.AuthTokens;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.GraphDatabase;
import org.neo4j.driver.v1.Record;
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

@Service
public class Neo4jService implements AutoCloseable {

	@Autowired
	private ConfigurationDAO config;

	private Connection conn;

	private Driver driver;

	@PostConstruct
	public void initNeo4jService() throws ClassNotFoundException {
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

	public List<List<Map<String, Object>>> queryWithOutJDBC(String graphQl) {
		List<Cypher> cyphers = this.translate(graphQl);
		List<List<Map<String, Object>>> results = new ArrayList<List<Map<String, Object>>>();
		for (Cypher cypher : cyphers) {
			// cypher = preProcessing(cypher.getQuery(), cypher.getParams());
			results.add(queryByGraphDatabaseDriver(cypher.getQuery(), cypher.getParams()));
		}
		return results;
	}

	public List<Map<String, Object>> queryByGraphDatabaseDriver(String query, Map<String, Object> params) {

		try (Session session = driver.session()) {
			List<Map<String, Object>> re = session
					.writeTransaction(new TransactionWork<List<Map<String, Object>>>() {
						@Override
						public List<Map<String, Object>> execute(Transaction tx) {

							StatementResult result = tx.run(query,params);
							List<Map<String, Object>> listRES =new ArrayList<Map<String, Object>>();
							while(result.hasNext()) {
								listRES.add(result.next().asMap());
							}
							return listRES;
						}

					});
			return re;
		}
	}

	public List<Iterator<Map<String, Object>>> query(String graphQl) {
		List<Cypher> cyphers = this.translate(graphQl);
		List<Iterator<Map<String, Object>>> results = new ArrayList<Iterator<Map<String, Object>>>();
		for (Cypher cypher : cyphers) {
			cypher = preProcessing(cypher.getQuery(), cypher.getParams());
			results.add(query(cypher.getQuery(), cypher.getParams()));
		}
		return results;
	}

	private Cypher preProcessing(String query, Map<String, Object> params) {
		int index = 1;
		Map<String, Object> paramsList = new HashMap<String, Object>();
		for (Map.Entry<String, Object> entry : params.entrySet()) {
			String key = entry.getKey();
			// replace all keys in the query as { index }
			query = query.replace("$" + key, "{" + index + "}");
			// reproduce params
			paramsList.put(String.valueOf(index), entry.getValue());
		}

		return new Cypher(query, paramsList);
	}

	protected List<Cypher> translate(String graphql) {
		String schema = config.getGraphSchemas();
		Translator translator = new Translator(SchemaBuilder.buildSchema(schema));
		return translator.translate(graphql);
	}

	protected Iterator<Map<String, Object>> query(String query, Map<String, Object> params) {
		try {
			// query ="MATCH (n:Person) RETURN n LIMIT 25";
			final PreparedStatement statement = conn.prepareStatement(query);
			setParameters(statement, params);
			// statement.setString(1, "Keanu Reeves");
			final ResultSet result = statement.executeQuery();
			return new Iterator<Map<String, Object>>() {

				boolean hasNext = result.next();
				public List<String> columns;

				@Override
				public boolean hasNext() {
					return hasNext;
				}

				private List<String> getColumns() throws SQLException {
					if (columns != null)
						return columns;
					ResultSetMetaData metaData = result.getMetaData();
					int count = metaData.getColumnCount();
					List<String> cols = new ArrayList<>(count);
					for (int i = 1; i <= count; i++)
						cols.add(metaData.getColumnName(i));
					return columns = cols;
				}

				@Override
				public Map<String, Object> next() {
					try {
						if (hasNext) {
							Map<String, Object> map = new LinkedHashMap<>();
							for (String col : getColumns())
								map.put(col, result.getObject(col));
							hasNext = result.next();
							if (!hasNext) {
								result.close();
								statement.close();
							}
							return map;
						} else
							throw new NoSuchElementException();
					} catch (SQLException e) {
						throw new RuntimeException(e);
					}
				}

				@Override
				public void remove() {
				}
			};
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

	private void setParameters(PreparedStatement statement, Map<String, Object> params) throws SQLException {
		for (Map.Entry<String, Object> entry : params.entrySet()) {
			int index = Integer.parseInt(entry.getKey());
			statement.setObject(index, entry.getValue());
		}
	}

}
