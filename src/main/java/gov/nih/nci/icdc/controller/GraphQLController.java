package gov.nih.nci.icdc.controller;

import java.io.IOException;

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

import gov.nih.nci.icdc.graphql.GraphQLProvider;
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
		
		// STEP 1 : GET GRAPHQL QUERY FROM RESTFUL API.

		String reqBody = httpEntity.getBody().toString();
		Gson gson = new Gson();
		JsonObject jsonObject = gson.fromJson(reqBody, JsonObject.class);
		String sdl = new String(jsonObject.get("query").getAsString().getBytes(),"UTF-8");
		
		// STEP 2 : USE GRAPHQL QUERY TO GET DATA AND RETRUN TO THE CLIENT
		GraphQL build = graphQLProvider.graphQL();
		System.out.print(sdl);
		ExecutionResult executionResult = build.execute(sdl);
	    System.out.print(executionResult.toString());
		return  GSON.toJson(executionResult.toString(),String.class);
	}
}
