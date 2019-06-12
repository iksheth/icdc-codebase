package gov.nih.nci.icdc.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/v1/")
public class indexController {
	
	
	private static final Logger logger = LogManager.getLogger(RESTController.class);
	// for testing purpose
	@RequestMapping(value = "/ping", method = RequestMethod.GET)
	@ResponseBody
	public String ping() {
		logger.info("hit end point:/ping");
		return "pong";
	}


}
