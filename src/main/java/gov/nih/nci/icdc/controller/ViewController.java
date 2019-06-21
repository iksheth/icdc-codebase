package gov.nih.nci.icdc.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	private static final Logger logger = LogManager.getLogger(ViewController.class);

	@RequestMapping("/")
	public String landing() {
		logger.info("Hit the landing page");
		return "index";
	}
	

}
