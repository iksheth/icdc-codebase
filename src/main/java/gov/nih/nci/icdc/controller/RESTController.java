package gov.nih.nci.icdc.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import gov.nih.nci.icdc.service.Neo4JGraphQLService;

@RestController
@RequestMapping(value = "/v1/rest/")
public class RESTController {

	private static final Logger logger = LogManager.getLogger(RESTController.class);
	@Autowired
	private Neo4JGraphQLService neo4jService;

	// for testing purpose
	@RequestMapping(value = "/ping", method = RequestMethod.GET)
	public String ping() {
		logger.info("hit end point:/ping");
		return "pong";
	}

	@RequestMapping("/programs")
	public String getPrograms() {
		String graphQL = "{\"query\":{\n" + "    program {\n" + "   id\n" + "   state\n" + "   created_datetime\n"
				+ "   updated_datetime\n" + "   name\n" + "   dbgap_accession_number\n" + "   submitter_id\n" + " }\n"
				+ "}";
		return neo4jService.query(graphQL);
	}

	@RequestMapping("/program/{id}/studies")
	public String getProgramStudies(@PathVariable String id) {
		String graphQL = "";
		return neo4jService.query(graphQL);
	}

	@RequestMapping("/studies")
	public String getStudies() {
		String graphQL = "";
		return neo4jService.query(graphQL);
	}

	@RequestMapping("/study/{id}/cases")
	public String getStudyCases(@PathVariable String id) {
		String graphQL = "";
		return neo4jService.query(graphQL);
	}

	@RequestMapping("/cases")
	public String getCases() {
		String graphQL = "";
		return neo4jService.query(graphQL);
	}
}
