package gov.nih.nci.icdc.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.mashape.unirest.http.exceptions.UnirestException;

import gov.nih.nci.icdc.model.ConfigurationDAO;
import gov.nih.nci.icdc.service.Neo4JGraphQLService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "ICDC REST APIs")
@Component
@RestController
public class RESTController {

	private static final Logger logger = LogManager.getLogger(RESTController.class);

	@Autowired
	private Neo4JGraphQLService neo4jService;

	@Autowired
	private ConfigurationDAO config;

	@RequestMapping(value = "/ping", method = RequestMethod.GET)
	@ResponseBody
	public String ping(HttpServletRequest request, HttpServletResponse response) {
		logger.info("hit end point:/ping");
		return "pong";
	}

	@ApiOperation(value = "Get list of programs")
	@RequestMapping(value = "/v1/rest/programs", method = RequestMethod.GET)
	@ResponseBody
	public String getPrograms(HttpServletRequest request, HttpServletResponse response) throws UnirestException {
		logger.info("hit end point:/v1/rest/programs");
		String graphQL = "query {program {\n" + "   id\n" + "   state\n" + "   created_datetime\n"
				+ "   updated_datetime\n" + "   name\n" + "   dbgap_accession_number\n" + "   submitter_id\n" + " }}";
		return neo4jService.query(graphQL);
	}

	@ApiOperation(value = "Get list of studies by program id")
	@RequestMapping(value = "/v1/rest/program/{id}/studies", method = RequestMethod.GET)
	@ResponseBody
	public String getProgramStudies(@ApiParam(value = "program_id", required = true) @PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		logger.info("hit end point:/v1/rest/program/{id}/studie   id: " + id);
		return "to be done";
	}

	@ApiOperation(value = "Get list of studies")
	@RequestMapping(value = "/v1/rest/studies", method = RequestMethod.GET)
	@ResponseBody
	public String getStudies(HttpServletRequest request, HttpServletResponse response) throws UnirestException {
		logger.info("hit end point:/v1/rest/studies ");
		String graphQL = "query {study{\n" + "  id\n" + "  state\n" + "  created_datetime\n" + "  updated_datetime\n"
				+ "  project_id\n" + "  clinical_study_name\n" + "  clinical_study_designation\n"
				+ "  clinical_study_id\n" + "  date_of_iacuc_approval\n" + "  submitter_id\n" +
				"}}";
		return neo4jService.query(graphQL);
	}

	@ApiOperation(value = "Get Cases by study id")
	@RequestMapping(value = "/v1/rest/study/{id}/cases", method = RequestMethod.GET)
	@ResponseBody
	public String getStudyCases(@ApiParam(value = "study_id", required = true) @PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		logger.info("hit end point:/v1/rest/study/{id}/cases   id: " + id);
		return "to be done";
	}

	@ApiOperation(value = "Get list of cases")
	@RequestMapping(value = "/v1/rest/cases", method = RequestMethod.GET)
	@ResponseBody
	public String getCases(HttpServletRequest request, HttpServletResponse response) throws UnirestException {
		logger.info("hit end point:/v1/rest/cases ");
		String graphQL = "query {case {\n" + "id\n" + "  state\n" + "  created_datetime\n" + "  updated_datetime\n"
				+ "  project_id\n" + "  patient_id\n" + "  patient_first_name\n" + "  crf_id\n" + "  submitter_id\n" +
				" }}";
		return neo4jService.query(graphQL);
	}

	@ApiOperation(value = "Get API version")
	@RequestMapping(value = "/api/version", method = RequestMethod.GET)
	public String getAPIVersion(HttpServletRequest request, HttpServletResponse response) {
		logger.info("hit end point:/api/version ");
		return config.getApiVersion();
	}
	
	
	@ApiOperation(value = "Get data model version")
	@RequestMapping(value = "/data_model/version", method = RequestMethod.GET)
	public String getDataModelVersion(HttpServletRequest request, HttpServletResponse response) {
		logger.info("hit end point:/data_model/version ");
		return config.getDataModelVersion();
	}
	
	

	@RequestMapping(value = "/authorize/accept", method = RequestMethod.GET)
	public void authorizeCallBack(HttpServletRequest request, HttpServletResponse response) {
		Cookie[] cookies = request.getCookies();
		String redirect_url = "http://localhost";
		if (null != cookies) {
			for (int i = 0; i < cookies.length; i++) {
				if ("access_token".equals(cookies[i].getName())) {
					System.out.println(cookies[i].getValue());
					HttpSession session = request.getSession();
					session.setAttribute("token", cookies[i].getValue());
				}
			
				response.addCookie(cookies[i]);
			}
		} else {
			redirect_url = config.getErrorRedirectURL();
		}

		response.setHeader("Location", redirect_url);
		response.setStatus(302);
	}

	
	
	@RequestMapping(value = "/test_token", method = RequestMethod.GET)
	public String testToken(HttpServletRequest request, HttpServletResponse response) {
		
		return "Pass Token Test";
	}

}
