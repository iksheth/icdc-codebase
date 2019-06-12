package gov.nih.nci.icdc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SwaggerIndexController {
  @RequestMapping("/doc/api")
  public String greeting() {
    return "doc/api/index";
  }
  
}
  