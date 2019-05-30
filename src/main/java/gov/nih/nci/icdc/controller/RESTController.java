package gov.nih.nci.icdc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import gov.nih.nci.icdc.model.Person;
import gov.nih.nci.icdc.service.RESTService;


@RestController
@RequestMapping(value="/v1/rest")
public class RESTController {
	
	@Autowired
	RESTService restService;
	
	// for testing purpose
	@RequestMapping( value = "/ping", method = RequestMethod.GET )
	public String ping() {
		return "pong";
	}
	
	@RequestMapping("/person")
	public List<Person> getPersonByName(@RequestParam(value="name") String name) {
		// get data from data repository
		return restService.findByName(name);
	}
	
	
}
