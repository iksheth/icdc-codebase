package gov.nih.nci.icdc.model;


import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;

import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import gov.nih.nci.icdc.service.GraphQLDataFetchers;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

/**
 * This class initialize GraphQL object. 
 * Step1:  define schema
 * Step2:  define how to interoperate with schema through data fetchers. Data fetchers will fetch the data and  wiring the data with schema.
 * 
 */

@Component
public class GraphQLProvider {


    @Autowired
    GraphQLDataFetchers graphQLDataFetchers;

    private GraphQL graphQL;
    
    @Autowired
	private ConfigurationDAO config;

    
    @PostConstruct
    public void init() throws IOException {
        String sdl =config.getGraphSchemas();
        GraphQLSchema graphQLSchema = buildSchema(sdl);
        this.graphQL = GraphQL.newGraphQL(graphQLSchema).build();
    }
    

	/**
	   * Make a executable schema.
	   * Step1 : generate a schema from plain schema string
	   * Step2: make runting wiring
	   * Step3: put step1 and stpe2's result together. 
	   * 
	   */
    private GraphQLSchema buildSchema(String sdl) {
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(sdl);
        RuntimeWiring runtimeWiring = buildWiring();
        SchemaGenerator schemaGenerator = new SchemaGenerator();
        return schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);
    }

    
    /**
	   * Make runtime wiring
	   * 
	   */
    private RuntimeWiring buildWiring() {
        return RuntimeWiring.newRuntimeWiring()
                .type(newTypeWiring("Query")
                        .dataFetcher("findByName", graphQLDataFetchers.getPersonFindByName()))
                .build();
    }

    @Bean
    public GraphQL graphQL() {
        return graphQL;
    }
    
}
