package gov.nih.nci.icdc.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mashape.unirest.http.exceptions.UnirestException;

import gov.nih.nci.icdc.model.ConfigurationDAO;

@Service
public class FenceService {
	
	
	private static final Logger logger = LogManager.getLogger(FenceService.class);
	
	@Autowired
	private ConfigurationDAO config;

	public String authorize(String client_id,String response_tyoe,String  redirect_url) throws UnirestException {
		
//		logger.info("Query neo4j:  "+graphQLQuery);
//		JSONObject jo = new JSONObject();
//		jo.put("query", graphQLQuery);
//		jo.toString();
//
//		HttpResponse<JsonNode> jsonResponse;
//		try {
//
//			jsonResponse = Unirest.post(config.getNeo4jGraphQLEndPoint()).header("Content-Type", "application/json")
//					.header("Authorization", config.getNeo4jHttpHeaderAuthorization()).header("accept", "application/json")
//					.body(jo.toString()).asJson();
//
//		} catch (UnirestException e) {
//			logger.error("Exception in function query() "+e.getStackTrace());
//			throw new UnirestException(e);
//		}
//
//		JsonNode neo4jResponse = jsonResponse.getBody();
//		// if neo4j response an error will throw that error to the front end
//		if (neo4jResponse.getObject().has("errors")) {
//			logger.error("Exception in function query() "+neo4jResponse.getObject().get("errors").toString());
//			throw new ResourceNotFoundException(neo4jResponse.getObject().get("errors").toString());
//		}
		return "";

	}
	
}
