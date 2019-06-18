package gov.nih.nci.icdc.controller;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.mashape.unirest.http.exceptions.UnirestException;

import gov.nih.nci.icdc.model.ConfigurationDAO;
import gov.nih.nci.icdc.service.Neo4JGraphQLService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "ICDC REST APIs")
@RestController
public class RESTController {

	private static final Logger logger = LogManager.getLogger(RESTController.class);

	@Autowired
	private Neo4JGraphQLService neo4jService;

	@Autowired
	private ConfigurationDAO config;
	
	@RequestMapping(value = "/ping", method = RequestMethod.GET)
	@ResponseBody
	public String ping() {
		logger.info("hit end point:/ping");
		return "pong";
	}

	
	@ApiOperation(value = "Get list of programs")
	@RequestMapping(value = "/v1/rest/programs", method = RequestMethod.GET)
	@ResponseBody
	public String getPrograms() throws UnirestException {
		logger.info("hit end point:/v1/rest/programs");
		String graphQL = "query {program {\n" + "   id\n" + "   state\n" + "   created_datetime\n"
				+ "   updated_datetime\n" + "   name\n" + "   dbgap_accession_number\n" + "   submitter_id\n" + " }}";
		return neo4jService.query(graphQL);
	}

	@ApiOperation(value = "Get list of studies by program id")
	@RequestMapping(value = "/v1/rest/program/{id}/studies", method = RequestMethod.GET)
	@ResponseBody
	public String getProgramStudies(
			@ApiParam(value = "program_id", required = true)
			@PathVariable String id) {
		logger.info("hit end point:/v1/rest/program/{id}/studie   id: " + id);
		return "to be done";
	}

	
	@ApiOperation(value = "Get list of studies")
	@RequestMapping(value = "/v1/rest/studies", method = RequestMethod.GET)
	@ResponseBody
	public String getStudies() throws UnirestException {
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

	
	@ApiOperation(value = "Get Cases by study id")
	@RequestMapping(value = "/v1/rest/study/{id}/cases", method = RequestMethod.GET)
	@ResponseBody
	public String getStudyCases( 
				@ApiParam(value = "study_id", required = true)
				@PathVariable String id) {
		logger.info("hit end point:/v1/rest/study/{id}/cases   id: " + id);
		return "to be done";
	}
	
	
	@ApiOperation(value = "Get list of cases")
	@RequestMapping(value = "/v1/rest/cases", method = RequestMethod.GET)
	@ResponseBody
	public String getCases() throws UnirestException {
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
	
	@ApiOperation(value = "Get API version")
	@RequestMapping(value = "/api/version", method = RequestMethod.GET)
	public String getAPIVersion()  {
		 
		 return config.getApiVersion();
	}
	
	@RequestMapping(value = "/authorize/accept", method = RequestMethod.GET)
	public void authorizeCallBack(HttpServletRequest request,HttpServletResponse response) {
		  System.out.print(response.getStatus());
		  Cookie[] cookies = request.getCookies();
		  String redirect_url= "http://localhost";
		  if(null!=cookies) {
			  for (int i = 0; i < cookies.length; i++) {
			
				  response.addCookie(cookies[i]);
				}
		  }else {
			  redirect_url=config.getErrorRedirectURL();
		  }
		 
		  response.setHeader("Location", redirect_url);
		  response.setStatus(302);
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public void testReqiest(HttpServletRequest request,HttpServletResponse response) throws ExpiredJwtException, UnsupportedJwtException, MalformedJwtException, SignatureException, IllegalArgumentException, UnsupportedEncodingException {
		  // get token
		  Cookie[] cookies = request.getCookies();
		  String token = "";
		  if(null!=cookies) {
			  for (int i = 0; i < cookies.length; i++) {
				  if("access_token".equals(cookies[i].getName())) {
					  token = cookies[i].getValue();
				  }
				}
		  }else {
			 throw new IllegalArgumentException();
		  }
		 
		  if("".equals(token)) {
			  throw new IllegalArgumentException();
		  }else {
			 // validate token if the token can not be trust then throw exception
			 Jwts.parser()
				.setSigningKey(config.getFencePublicKey().getBytes("UTF-8"))
				.parseClaimsJws(token);
		  }
		 
	}
	
}
