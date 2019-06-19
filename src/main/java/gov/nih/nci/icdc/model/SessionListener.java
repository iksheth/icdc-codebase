package gov.nih.nci.icdc.model;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

public class SessionListener implements HttpSessionListener {

	private static final Logger logger = LogManager.getLogger(SessionListener.class);

	@Autowired
	private ConfigurationDAO config;

	@Override
	public void sessionCreated(HttpSessionEvent event) {
		logger.info("session created, inactive interval is  " + config.getSessionTimeOut());
		event.getSession().setMaxInactiveInterval(config.getSessionTimeOut());
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		logger.info("session destroyed");
		event.getSession().invalidate();
	}
}