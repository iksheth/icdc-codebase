package gov.nih.nci.icdc;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import gov.nih.nci.icdc.model.SessionListener;

@SpringBootApplication
public class IcdcApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(IcdcApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(IcdcApplication.class);
	}

	
	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		 super.onStartup(servletContext);
		 servletContext.addListener(new SessionListener());
	}

}
