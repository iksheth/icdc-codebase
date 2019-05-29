package gov.nih.nci.icdc.model;


import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;


/**
 * Entity bean refers to database Person node. 
 */


@NodeEntity
public class Person {

	@Id @GeneratedValue private Long id;

	private String name;
	private int born;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getBorn() {
		return born;
	}
	public void setBorn(int born) {
		this.born = born;
	}

	
}