package gov.nih.nci.icdc.service;



import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import gov.nih.nci.icdc.model.ConfigurationDAO;


@Service
public class Neo4JGraphQLService {
	
    
    @Autowired
	private ConfigurationDAO config;
    
    
    public JsonNode query(String graphQLQuery) {
    	JSONObject jo = new JSONObject(); 
		jo.put("query", graphQLQuery);
		jo.toString();
		
    	HttpResponse<JsonNode> jsonResponse ;
    	try {
    		
			jsonResponse = Unirest.post(config.getNeo4jGraphQLEndPoint())
					  .header("Content-Type", "application/json")
					  .header("accept", "application/json")
					  .body(jo.toString())
					  .asJson();
			
		} catch (UnirestException e) {
			throw new RuntimeException(e);
		}
    	
    	return jsonResponse.getBody();
    	
    }
}
