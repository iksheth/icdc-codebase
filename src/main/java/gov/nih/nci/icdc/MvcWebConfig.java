package gov.nih.nci.icdc;

import java.util.concurrent.TimeUnit;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@Configuration
@EnableWebMvc
@ComponentScan
public class MvcWebConfig implements WebMvcConfigurer {

	@Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/");
        resolver.setSuffix(".jsp");
        resolver.setViewClass(JstlView.class);
        registry.viewResolver(resolver);
    }



	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		// Register static
		registry.addResourceHandler("/static/**").addResourceLocations("/WEB-INF/static/")
				.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());
		registry.addResourceHandler("/resources/**").addResourceLocations("/WEB-INF/resources/")
				.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());
		registry.addResourceHandler("/plugins/**").addResourceLocations("/WEB-INF/plugins/")
				.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());
		registry.addResourceHandler("/images/**").addResourceLocations("/WEB-INF/images/")
				.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());
		registry.addResourceHandler("/files/**").addResourceLocations("/WEB-INF/files/")
				.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());
		registry.addResourceHandler("/data/**").addResourceLocations("/WEB-INF/data/")
				.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());
		registry.addResourceHandler("/*.html").addResourceLocations("/WEB-INF/")
				.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());

	}
}