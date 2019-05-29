package gov.nih.nci.icdc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gov.nih.nci.icdc.model.Person;
import graphql.schema.DataFetcher;


/**
 * GraphQL Data Fetcher 
 * Retrieve data from database 
 */


@Component
public class GraphQLDataFetchers {
	
	@Autowired
	private RESTService restService;

	/**
	 * Get List of person by name 
	 * 
	 */
	public DataFetcher getPersonFindByName() {
		return dataFetchingEnvironment -> {
			String name = dataFetchingEnvironment.getArgument("name");
			 List<Person> people = restService.findByName(name);
			return people;
		};
	}
}