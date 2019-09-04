package gov.nih.nci.icdc.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {

	private static final Logger logger = LogManager.getLogger(IndexController.class);

	
	@RequestMapping(value = "/", produces = "text/html")
    public ModelAndView errorHtml(HttpServletRequest request) {
        return new ModelAndView("/index");
    }
	
	
	
	@RequestMapping(value = "/", produces = "text/html")
    public ModelAndView version (HttpServletRequest request) {
        return new ModelAndView("/index");
    }
}
