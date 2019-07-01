package gov.nih.nci.icdc.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mashape.unirest.http.exceptions.UnirestException;

import gov.nih.nci.icdc.model.ConfigurationDAO;
import gov.nih.nci.icdc.model.Mocker;
import gov.nih.nci.icdc.service.GraphQLProvider;
import gov.nih.nci.icdc.service.Neo4JGraphQLService;
import graphql.language.Document;
import graphql.parser.Parser;

@RestController
public class GraphQLController {

	private static final Logger logger = LogManager.getLogger(GraphQLController.class);

	@Autowired
	private ConfigurationDAO config;
	@Autowired
	private Neo4JGraphQLService neo4jService;

	@Autowired
	private GraphQLProvider graphQLService;

	public static final Gson GSON = new Gson();

	@RequestMapping(value = "/v1/graphql/", method = RequestMethod.GET)
	@ResponseBody
	public void getGraphQLResponseByGET(HttpEntity<String> httpEntity, HttpServletResponse response)
			throws IOException, UnirestException {

		throw new UnirestException("Could not find the GET method for URL /ICDC/v1/graphql/");
	}

	@RequestMapping(value = "/v1/graphql/", method = RequestMethod.POST)
	@ResponseBody
	public String getGraphQLResponse(HttpEntity<String> httpEntity, HttpServletResponse response)
			throws IOException, UnirestException, HttpRequestMethodNotSupportedException {

		logger.info("hit end point:/v1/graphql/");

		// Get graphql query from request
		String reqBody = httpEntity.getBody().toString();
		Gson gson = new Gson();
		JsonObject jsonObject = gson.fromJson(reqBody, JsonObject.class);
		String sdl = "";
		if (jsonObject.has("query") && config.isAllowGraphQLQuery()) {
			sdl = new String(jsonObject.get("query").getAsString().getBytes(), "UTF-8");
		}

		if (jsonObject.has("mutation") && config.isAllowGraphQLMutation()) {
			sdl = new String(jsonObject.get("mutation").getAsString().getBytes(), "UTF-8");
		}

		// mock data
		Mocker mocker = new Mocker();
		String responseText = "";
		if (("").equals(sdl)) {
			throw new HttpRequestMethodNotSupportedException("Invalid Graphql query");
		} else {
			if (sdl.contains("dashboard(")) {
				responseText = mocker.getDashboard();
			} else if (sdl.contains("programs(")) {
				responseText = mocker.getPrograms();
			} else if (sdl.contains("program_study(")) {
				responseText = mocker.getProgramStudy();
			} else if (sdl.contains("studies(")) {
				responseText = mocker.getStudies();
			} else if (sdl.contains("study_detail(")) {
				responseText = mocker.getStudyDetail();
			} else if (sdl.contains("cases(")) {
				responseText = mocker.getCases();
			} else if (sdl.contains("case_detail(")) {
				responseText = mocker.getCaseDetail();
			} else if (sdl.contains("landing(")) {
				responseText = mocker.getLanding();
			} else {
				if (isvalidQraphQL(sdl)) {
					responseText = neo4jService.query(sdl);
				} else {
					throw new UnirestException	("Invalid Graphql query");
				}

			}
		}
		return responseText;

	}

	private boolean isvalidQraphQL(String requestQuery) {
		Parser parser = new Parser();
		Document document = parser.parseDocument(requestQuery);
		return graphQLService.isVaild(document);
	}

}
