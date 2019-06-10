package gov.nih.nci.icdc.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mashape.unirest.http.JsonNode;

import gov.nih.nci.icdc.service.Neo4JGraphQLService;

@RestController
public class GraphQLController {

	@Autowired
	private Neo4JGraphQLService neo4jService;
	
	
	public static final Gson GSON = new Gson();
	
	
	
	@RequestMapping(value = "/v1/graphql/", method = RequestMethod.POST)
	@ResponseBody
	public String  getPerson(HttpEntity<String> httpEntity,HttpServletResponse response) throws IOException {
		
		// Get graphql query from request
		String reqBody = httpEntity.getBody().toString();
		Gson gson = new Gson();
		JsonObject jsonObject = gson.fromJson(reqBody, JsonObject.class);
		String sdl = new String(jsonObject.get("query").getAsString().getBytes(),"UTF-8");

		
		//assign graphql to neo4j service, neo4j will translate graphql into cypher then  return cypher result
		return neo4jService.query(sdl).toString();
	}
}
