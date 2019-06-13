package gov.nih.nci.icdc;

import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.JUnitRestDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GraphQLControllerTests {

	private MockMvc mockMvc;

	@Rule
	public JUnitRestDocumentation jUnitRestDocumentation = new JUnitRestDocumentation();

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context)
				.apply(documentationConfiguration(this.jUnitRestDocumentation)).build();
	}

	@Autowired
	private WebApplicationContext context;

	
	private void testGraphQLAPI(String parms)  throws Exception {
		
		this.mockMvc.perform(RestDocumentationRequestBuilders
				.post("/v1/graphql/")
				.content(parms)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("data")))
				.andDo(document("{ClassName}/{methodName}"));
	}
	@Test
	public void testAPIDashboard() throws Exception {
		
		this.testGraphQLAPI("{\"query\":\"{ dashboard(){}}\"}");

	}
	
	@Test
	public void testAPIPrograms() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{ programs(){}}\"}");


	}
	
	@Test
	public void testAPIStudies() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{ studies(){}}\"}");


	}
	

	@Test
	public void testAPIStudyDetail() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{ study_detail(){}}\"}");


	}
	

	@Test
	public void testAPICases() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{ cases(){}}\"}");


	}
	
	@Test
	public void testAPICaseDetail() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{ case_detail(){}}\"}");


	}
	
	@Test
	public void testAPILanding() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{ landing(){}}\"}");


	}
	

}
