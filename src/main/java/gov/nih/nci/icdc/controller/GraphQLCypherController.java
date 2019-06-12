package gov.nih.nci.icdc.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import gov.nih.nci.icdc.service.GraphQLToCypherService;

@RestController
@RequestMapping(value = "/v1/graphql/cypher")
public class GraphQLCypherController {

	@Autowired
	private GraphQLToCypherService neo4jService;

	public static final Gson GSON = new Gson();

	@RequestMapping(value = "/person", method = RequestMethod.POST)
	@ResponseBody
	public List<List<Map<String, Object>>> getPerson(HttpEntity<String> httpEntity, HttpServletResponse response)
			throws JsonParseException, IOException {

		// Get graphql query from request
		String reqBody = httpEntity.getBody().toString();
		Gson gson = new Gson();
		JsonObject jsonObject = gson.fromJson(reqBody, JsonObject.class);
		String sdl = new String(jsonObject.get("query").getAsString().getBytes(), "UTF-8");

		// assign graphql to neo4j service, neo4j will translate graphql into cypher
		// then return cypher result
		return neo4jService.query(sdl);
	}

}