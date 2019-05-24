package gov.nih.nci.icdc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gov.nih.nci.icdc.model.Person;
import gov.nih.nci.icdc.model.PersonRepository;


@RestController
@RequestMapping(value="/v1/rest")
public class RESTController {
	

	@Autowired
	private PersonRepository personRepository;
	
	@RequestMapping( value = "/ping", method = RequestMethod.GET )
	public String ping() {
		return "pong";
	}
	
	@RequestMapping( value = "/person", method = RequestMethod.GET )
	public List<Person> getPersonByName(@RequestParam(value="name", defaultValue="John") String name) {
		return personRepository.findByName(name);
	}
	
	
}
