package gov.nih.nci.icdc.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import gov.nih.nci.icdc.service.Neo4JGraphQLService;

@RestController
public class RESTController {

	private static final Logger logger = LogManager.getLogger(RESTController.class);
	@Autowired
	private Neo4JGraphQLService neo4jService;

	@RequestMapping(value = "/v1/ping", method = RequestMethod.GET)
	@ResponseBody
	public String ping() {
		logger.info("hit end point:/ping");
		return "pong";
	}
	
	@RequestMapping(value = "/v1/rest/programs", method = RequestMethod.GET)
	@ResponseBody
	public String getPrograms() {
		logger.info("hit end point:/programs");
		String graphQL = "query {program {\n" + "   id\n" + "   state\n" + "   created_datetime\n"
				+ "   updated_datetime\n" + "   name\n" + "   dbgap_accession_number\n" + "   submitter_id\n" + " }}";
		return neo4jService.query(graphQL);
	}

	@RequestMapping(value = "/v1/rest/program/{id}/studies", method = RequestMethod.GET)
	@ResponseBody
	public String getProgramStudies(@PathVariable String id) {
		String graphQL = "";
		return neo4jService.query(graphQL);
	}

	@RequestMapping(value = "/v1/rest/studies", method = RequestMethod.GET)
	@ResponseBody
	public String getStudies() {
		String graphQL = "";
		return neo4jService.query(graphQL);
	}

	@RequestMapping(value = "/v1/rest/study/{id}/cases", method = RequestMethod.GET)
	@ResponseBody
	public String getStudyCases(@PathVariable String id) {
		String graphQL = "";
		return neo4jService.query(graphQL);
	}

	@RequestMapping(value = "/v1/rest/cases", method = RequestMethod.GET)
	@ResponseBody
	public String getCases() {
		String graphQL = "";
		return neo4jService.query(graphQL);
	}
}
