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
import com.google.gson.JsonParseException;

import gov.nih.nci.icdc.model.GraphQLProvider;
import graphql.ExecutionResult;
import graphql.GraphQL;

@RestController
@RequestMapping(value="/v1/graphql")
public class GraphQLController {

	@Autowired
	private GraphQLProvider graphQLProvider;
	public static final Gson GSON = new Gson();
	
	@RequestMapping(value = "/person", method = RequestMethod.POST)
	@ResponseBody
	public String get(HttpEntity<String> httpEntity,HttpServletResponse response) throws JsonParseException, IOException {
		
		// Get graphql query from request
		String reqBody = httpEntity.getBody().toString();
		Gson gson = new Gson();
		JsonObject jsonObject = gson.fromJson(reqBody, JsonObject.class);
		String sdl = new String(jsonObject.get("query").getAsString().getBytes(),"UTF-8");
		
		//use graphql to get data 
		GraphQL build = graphQLProvider.graphQL();
		ExecutionResult executionResult = build.execute(sdl);
		return  GSON.toJson(executionResult.toString(),String.class);
	}
}
