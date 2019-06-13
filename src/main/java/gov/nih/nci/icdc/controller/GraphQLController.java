package gov.nih.nci.icdc.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import gov.nih.nci.icdc.model.Mocker;
import gov.nih.nci.icdc.service.Neo4JGraphQLService;

@RestController
public class GraphQLController {

	private static final Logger logger = LogManager.getLogger(GraphQLController.class);

	@Autowired
	private Neo4JGraphQLService neo4jService;

	public static final Gson GSON = new Gson();

	@RequestMapping(value = "/v1/graphql/", method = RequestMethod.POST)
	@ResponseBody
	public String getPerson(HttpEntity<String> httpEntity, HttpServletResponse response) throws IOException {
		
		logger.info("hit end point:/v1/graphql/");

		// Get graphql query from request
		String reqBody = httpEntity.getBody().toString();
		Gson gson = new Gson();
		JsonObject jsonObject = gson.fromJson(reqBody, JsonObject.class);
		String sdl = new String(jsonObject.get("query").getAsString().getBytes(), "UTF-8");

		// mock data
		Mocker mocker = new Mocker();
		String responseText = "";

		if (sdl.contains("dashboard(")) {
			responseText = mocker.getDashboard();
		}
		else if (sdl.contains("programs(")) {
			responseText = mocker.getPrograms();
		} 
		else if (sdl.contains("program_study(")) {
			responseText = mocker.getProgram_study();
		} 
		else if (sdl.contains("studies(")) {
			responseText = mocker.getStudies();
		} 
		else if (sdl.contains("study_detail(")) {
			responseText = mocker.getStudy_detail();
		} 
		else if (sdl.contains("cases(")) {
			responseText = mocker.getCases();
		} 
		else if (sdl.contains("case_detail(")) {
			responseText = mocker.getCase_detail();
		}
		else if (sdl.contains("landing(")) {
			responseText = mocker.getLanding();
		} 
		else {
			responseText = neo4jService.query(sdl);
		}
		
		return responseText;

	}
}
