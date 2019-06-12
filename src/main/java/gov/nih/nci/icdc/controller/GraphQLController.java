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

import gov.nih.nci.icdc.error.ResourceNotFoundException;
import gov.nih.nci.icdc.model.Mocker;
import gov.nih.nci.icdc.service.Neo4JGraphQLService;

@RestController
@RequestMapping(value="/v1/graphql")
public class GraphQLController {

	@Autowired
	private Neo4JGraphQLService neo4jService;
	
	
	public static final Gson GSON = new Gson();
	
	
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	@ResponseBody
	public String  getPerson(HttpEntity<String> httpEntity,HttpServletResponse response) throws IOException {
		
		// Get graphql query from request
		String reqBody = httpEntity.getBody().toString();
		Gson gson = new Gson();
		JsonObject jsonObject = gson.fromJson(reqBody, JsonObject.class);
		String sdl = new String(jsonObject.get("query").getAsString().getBytes(),"UTF-8");

		//mock data
		Mocker mocker = new Mocker();
		String responseText = "";
			
		if(sdl.contains("dashboard(")){
			responseText=mocker.getDashboard();
		}
		else if(sdl.contains("programs(")){
			responseText=mocker.getPrograms();
		}
		else if(sdl.contains("program_study(")){
			responseText=mocker.getProgram_study();
		}
		else if(sdl.contains("studies(")){
			responseText=mocker.getStudies();
		}
		else if(sdl.contains("study_detail(")){
			responseText=mocker.getStudy_detail();
		}
		else if(sdl.contains("cases(")){
			responseText=mocker.getCases();
		}
		else if(sdl.contains("case_detail(")){
			responseText=mocker.getCase_detail();
		}
		else {
			JsonNode neo4jData = neo4jService.query(sdl);
			// if neo4j response an error will throw that error to the front end
			if(neo4jData.getObject().has("errors")) {
				throw new ResourceNotFoundException(neo4jData.getObject().get("errors").toString());
			}else {
				responseText = neo4jData.toString();
			}
		}

		return responseText;
		
	}
}


