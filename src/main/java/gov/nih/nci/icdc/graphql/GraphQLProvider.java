package gov.nih.nci.icdc.graphql;


import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;

import java.io.IOException;
import java.net.URL;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

import gov.nih.nci.icdc.model.ConfigurationDAO;
import graphql.GraphQL;
import graphql.schema.DataFetcher;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

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

    private GraphQLSchema buildSchema(String sdl) {
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(sdl);
        RuntimeWiring runtimeWiring = buildWiring();
        SchemaGenerator schemaGenerator = new SchemaGenerator();
        return schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);
    }

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
