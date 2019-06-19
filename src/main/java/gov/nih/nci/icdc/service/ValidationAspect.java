package gov.nih.nci.icdc.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;

import gov.nih.nci.icdc.model.ConfigurationDAO;
import io.jsonwebtoken.ExpiredJwtException;

@Component
@Aspect
public class ValidationAspect {

	private static final Logger logger = LogManager.getLogger(ValidationAspect.class);

	@Autowired
	private ConfigurationDAO config;

	
	
	@Pointcut("execution (* gov.nih.nci.icdc.controller.RESTController.getPrograms(..))"
			+ "||execution (* gov.nih.nci.icdc.controller.RESTController.getProgramStudies(..))"
			+ "||execution (* gov.nih.nci.icdc.controller.RESTController.getStudies(..))"
			+ "||execution (* gov.nih.nci.icdc.controller.RESTController.getStudyCases(..))"
			+ "||execution (* gov.nih.nci.icdc.controller.RESTController.getCases(..))"
			+ "||execution (* gov.nih.nci.icdc.controller.RESTController.authorizeCallBack(..))"
			)
	public void allPublicMethods() {

	}

	@Before("allPublicMethods()")
	public void validateBefore(JoinPoint joinPoint)
			throws Exception {
		logger.info("Get in AOP");
		MethodSignature signature = (MethodSignature) joinPoint.getSignature();
	     Object[] args = joinPoint.getArgs();
	     HttpServletRequest request = null;
	     logger.info("Get in AOP");
	     for(Object arg : args) {
	    	 if(arg instanceof HttpServletRequest) {
	    		request = (HttpServletRequest)arg;
	    	 }
	     }
	     if(null!=request) {
//	 		if(isSessionExpired(request)) {
//				logger.info("user session expired");
//				throw new Exception("user session expired");
//			}
			String token =isCookiesHasToken(request);
			if(token.equals(null)) {
				logger.info("user token is null");
				throw new Exception("Bad Request");
			}else {
				isGoodCookies(token);
			}
	     }else {
	    	 throw new Exception("Bad Request");
	     }


	}

	public boolean isSessionExpired(HttpServletRequest request) {

		if (request.getRequestedSessionId() != null&&request.isRequestedSessionIdValid()) {
			return false;
		}else {
			return true;
		}

	}
	
	public String isCookiesHasToken(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		String token = "";
		if (null != cookies) {
			for (int i = 0; i < cookies.length; i++) {
				if ("access_token".equals(cookies[i].getName())) {
					token = cookies[i].getValue();
					return token;
				}
			}
		} 
		return null;
	}
	
	public void isGoodCookies(String token) throws ExpiredJwtException,JWTDecodeException, ParseException {
		DecodedJWT jwt = JWT.decode(token);
		SimpleDateFormat sdf =  new SimpleDateFormat("MMM-dd-yyyy hh:mm:ss a"); 
		Date today=  sdf.parse((String)new SimpleDateFormat("MMM-dd-yyyy hh:mm:ss a").format(new Date()));
		Date expire =jwt.getExpiresAt();
		if(expire.compareTo(today)<=0) {
			logger.info("user token is expired");
			logger.info("Current time is:" + today +"  expired date is " +expire );
			logger.info("token is "+ token);
			throw new ExpiredJwtException(null, null, "The token is expired", null);
		}
	}
	
	

}
