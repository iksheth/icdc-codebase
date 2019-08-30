package gov.nih.nci.icdc.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import gov.nih.nci.icdc.model.ConfigurationDAO;
import io.jsonwebtoken.io.IOException;

import org.apache.logging.log4j.Logger;
@Service
public class FenceService {

	private static final Logger logger = LogManager.getLogger(FenceService.class);
	
	@Autowired
	private ConfigurationDAO config;


	// exchange code for token
	
	public String getToken(String code) throws UnirestException {
		HttpResponse<JsonNode> jsonResponse;
		try {
			jsonResponse= Unirest.post(config.getFenceURL()+"user/oauth2/token/")
							 	   .basicAuth(config.getFencdId(), config.getFenceCredential())
							 	   .header("Content-Type", "application/x-www-form-urlencoded")
							 	   .field("grant_type", "authorization_code")
							 	   .field("code",code)
							 	   .field("redirect_uri",config.getFencdRedirect())
							 	   .field("client_id", config.getFencdId())
							 	   .asJson();

		} catch (UnirestException e) {
			logger.error("Exception in function getToken from fence "+e.getStackTrace());
			throw new UnirestException(e);
		}
		return jsonResponse.getBody().toString();
	
	}





	
	
}
