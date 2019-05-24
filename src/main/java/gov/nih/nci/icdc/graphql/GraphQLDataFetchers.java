package gov.nih.nci.icdc.graphql;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gov.nih.nci.icdc.model.Person;
import gov.nih.nci.icdc.model.PersonRepository;
import graphql.schema.DataFetcher;

@Component
public class GraphQLDataFetchers {
	
	@Autowired
	private PersonRepository personRepository;

	public DataFetcher getPersonFindByName() {
		return dataFetchingEnvironment -> {
			String name = dataFetchingEnvironment.getArgument("name");
			 List<Person> people = personRepository.findByName(name);
			return people;
		};
	}
}