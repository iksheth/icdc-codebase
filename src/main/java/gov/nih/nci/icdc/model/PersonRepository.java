package gov.nih.nci.icdc.model;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Spring data repositories terface-based DAO implementations. 
 * By default it comes with restful API path. 
 * It has been disabled at this point due to we would like customize the API end point. 
 * 
 */

@RepositoryRestResource(collectionResourceRel = "people")
public interface PersonRepository extends Neo4jRepository<Person, Long> {
	
	/**
	   * Get List of Person by name
	   * 
	   *
	   * @return A new builder.
	   */
    List<Person> findByName(@Param("name") String name);

}