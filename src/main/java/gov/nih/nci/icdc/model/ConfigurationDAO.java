package gov.nih.nci.icdc.model;

import java.io.IOException;
import java.net.URL;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

/**
 * A Configuration bean read configuration setting from
 * classpth:application.properties. This class provides configuration settings.
 */

@Configuration
@PropertySource("classpath:application.properties")
public class ConfigurationDAO {

	@Value("${spring.data.neo4j.username}")
	private String neo4jUserName;

	@Value("${spring.data.neo4j.password}")
	private String neo4jPassword;

	@Value("${neo4j.jdbc.server}")
	private String neo4jJDBCServerURI;

	@Value("${graphql.schema}")
	private List<String> graphqlSchemas;

	@Value("${neo4j.java.driver.server}")
	private String neo4jJavaDriverServerURI;

	
	@Value("${neo4j.graphql.endpoint}")
	private String neo4jGraphQLEndPoint;


	public String getNeo4jGraphQLEndPoint() {
		return neo4jGraphQLEndPoint;
	}

	public void setNeo4jGraphQLEndPoint(String neo4jGraphQLEndPoint) {
		this.neo4jGraphQLEndPoint = neo4jGraphQLEndPoint;
	}

	/**
	 * Read GraphQL Schemas from application.properties
	 * 
	 * @return schema as a String, if fails to read schemas will return empty  string.
	 */
	public String getGraphSchemas() {

		StringBuilder sb = new StringBuilder();
		for (String schema : graphqlSchemas) {
			URL url = Resources.getResource(schema);
			String sdl = "";
			try {
				sdl = Resources.toString(url, Charsets.UTF_8);
				sb.append(sdl);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return sb.toString();

	}

	public List<String> getGraphqlSchemas() {
		return graphqlSchemas;
	}

	public void setGraphqlSchemas(List<String> graphqlSchemas) {
		this.graphqlSchemas = graphqlSchemas;
	}

	public String getNeo4jUserName() {
		return neo4jUserName;
	}

	public void setNeo4jUserName(String neo4jUserName) {
		this.neo4jUserName = neo4jUserName;
	}

	public String getNeo4jPassword() {
		return neo4jPassword;
	}

	public void setNeo4jPassword(String neo4jPassword) {
		this.neo4jPassword = neo4jPassword;
	}

	public String getNeo4jJDBCServerURI() {
		return neo4jJDBCServerURI;
	}

	public void setNeo4jJDBCServerURI(String neo4jJDBCServerURI) {
		this.neo4jJDBCServerURI = neo4jJDBCServerURI;
	}

	public String getNeo4jJavaDriverServerURI() {
		return neo4jJavaDriverServerURI;
	}

	public void setNeo4jJavaDriverServerURI(String neo4jJavaDriverServerURI) {
		this.neo4jJavaDriverServerURI = neo4jJavaDriverServerURI;
	}

	@Bean
	public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
		return new PropertySourcesPlaceholderConfigurer();
	}

}
