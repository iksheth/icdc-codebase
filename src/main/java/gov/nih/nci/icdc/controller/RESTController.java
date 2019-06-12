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

	@RequestMapping(value = "/ping", method = RequestMethod.GET)
	@ResponseBody
	public String ping() {
		logger.info("hit end point:/ping");
		return "pong";
	}

	@RequestMapping(value = "/v1/rest/programs", method = RequestMethod.GET)
	@ResponseBody
	public String getPrograms() {
		logger.info("hit end point:/v1/rest/programs");
		String graphQL = "query {program {\n" + "   id\n" + "   state\n" + "   created_datetime\n"
				+ "   updated_datetime\n" + "   name\n" + "   dbgap_accession_number\n" + "   submitter_id\n" + " }}";
		return neo4jService.query(graphQL);
	}

	@RequestMapping(value = "/v1/rest/program/{id}/studies", method = RequestMethod.GET)
	@ResponseBody
	public String getProgramStudies(@PathVariable String id) {
		logger.info("hit end point:/v1/rest/program/{id}/studie   id: " + id);
		String graphQL = "";
		return "";
	}

	@RequestMapping(value = "/v1/rest/studies", method = RequestMethod.GET)
	@ResponseBody
	public String getStudies() {
		logger.info("hit end point:/v1/rest/studies ");
		String graphQL = "query {study{\n" +
				"  id\n" + 
				"  state\n" + 
				"  created_datetime\n" + 
				"  updated_datetime\n" + 
				"  project_id\n" + 
				"  clinical_study_name\n" + 
				"  clinical_study_designation\n" + 
				"  clinical_study_id\n" + 
				"  date_of_iacuc_approval\n" + 
				"  submitter_id\n" + 
//				"  projects\n" + 
//				"  study_sites\n" + 
//				"  study_arms\n" + 
//				"  principal_investigators"+
				"}}";
		return neo4jService.query(graphQL);
	}

	@RequestMapping(value = "/v1/rest/study/{id}/cases", method = RequestMethod.GET)
	@ResponseBody
	public String getStudyCases(@PathVariable String id) {
		logger.info("hit end point:/v1/rest/study/{id}/cases   id: " + id);
		String graphQL = "";
		return "";
	}

	@RequestMapping(value = "/v1/rest/cases", method = RequestMethod.GET)
	@ResponseBody
	public String getCases() {
		logger.info("hit end point:/v1/rest/cases ");
		String graphQL = "query {case {\n" +
				"id\n" + 
				"  state\n" + 
				"  created_datetime\n" + 
				"  updated_datetime\n" + 
				"  project_id\n" + 
				"  patient_id\n" + 
				"  patient_first_name\n" + 
				"  crf_id\n" + 
				"  submitter_id\n" + 
//				"  cohorts\n" + 
//				"  demographics\n" + 
//				"  samples\n" + 
//				"  cycles\n" + 
//				"  off_treatments\n" + 
//				"  follow_ups\n" + 
//				"  adverse_events\n" + 
//				"  diagnoses\n" + 
//				"  off_studies\n" + 
//				"  enrollments"+
				" }}";
		return neo4jService.query(graphQL);
	}
}
