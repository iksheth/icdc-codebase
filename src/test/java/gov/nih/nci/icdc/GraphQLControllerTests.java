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

	private void testGraphQLAPI(String parms) throws Exception {

		this.mockMvc
				.perform(RestDocumentationRequestBuilders.post("/v1/graphql/").content(parms)
						.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
				.andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("data")))
				.andDo(document("{ClassName}/{methodName}"));
	}

	@Test
	public void testAPINumberOfStudies() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{ numberOfStudies }\"}");
	}

	@Test
	public void testAPINumberOfCases() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{ numberOfCases }\"}");
	}

	@Test
	public void testAPINumberOfSamples() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{ numberOfSamples }\"}");
	}

	@Test
	public void testAPINumberOfFiles() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{ numberOfFiles }\"}");
	}

	@Test
	public void testAPINumberOfBiospecimenAliquots() throws Exception {

		//this.testGraphQLAPI("{\"query\":\"{ numberOfBiospecimenAliquots }\"}");
	}

	@Test
	public void testAPIAllStudies() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{\n" + "\n" + "\n" + "study {\n" + "\n" + "	clinical_study_id\n" + "\n"
				+ "	clinical_study_designation\n" + "\n" + "	clinical_study_name\n" + "\n"
				+ "	clinical_study_description\n" + "\n" + "	clinical_study_type\n" + "\n"
				+ "	date_of_iacuc_approval\n" + "\n" + "	dates_of_conduct\n" + "\n" + "	study_arms\n" + "\n"
				+ "	{   arm\n" + "		ctep_treatment_assignment_code \n" + "	}\n" + "\n" + "		study_sites\n"
				+ "\n" + "	{  	site_short_name  \n" + "	 	veterinary_medical_center  \n"
				+ "	  	registering_institution  \n" + "	 }\n" + "	}\n" + "} \"}");
	}
	
	@Test
	public void testAPIAllStudiesDetails() throws Exception {

		this.testGraphQLAPI("{\"query\":\" {\n" + 
				"\n" + 
				"study (clinical_study_id:\\\"844702.0\\\"){\n" + 
				"  clinical_study_id\n" + 
				"  clinical_study_designation\n" + 
				"  clinical_study_name\n" + 
				"  clinical_study_description\n" + 
				"  clinical_study_type\n" + 
				"  date_of_iacuc_approval\n" + 
				"  dates_of_conduct\n" + 
				"  study_arms{\n" + 
				"    arm\n" + 
				"    ctep_treatment_assignment_code\n" + 
				"  }\n" + 
				"  study_sites{\n" + 
				"   site_short_name\n" + 
				"  veterinary_medical_center\n" + 
				"  registering_institution\n" + 
				"  }\n" + 
				"}\n" + 
				"}\"}");
	}


	@Test
	public void testAPIAllCases() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{\n" + "   \n" + "  case{\n" + "    patient_id\n" + "    patient_first_name\n"
				+ "    crf_id\n" + "    cohort{\n" + "       cohort_description\n" + "       study_arm{\n"
				+ "         arm\n" + "         ctep_treatment_assignment_code\n" + "         study{\n"
				+ "              clinical_study_id\n" + "              clinical_study_designation\n"
				+ "              clinical_study_name\n" + "              clinical_study_description\n"
				+ "              clinical_study_type\n" + "              date_of_iacuc_approval\n"
				+ "              dates_of_conduct\n" + "         }\n" + "         agents{\n"
				+ "             medication\n" + "             document_number\n" + "         }\n" + "      }\n"
				+ "    }\n" + "    enrollment{\n" + "        date_of_registration\n"
				+ "        registering_institution\n" + "        initials\n" + "        date_of_informed_consent\n"
				+ "        site_short_name\n" + "        veterinary_medical_center\n"
				+ "        enrollment_document_number\n" + "        cohort_description\n" + "        patient_subgroup\n"
				+ "    }\n" + "    demographic{\n" + "        breed\n" + "        patient_age_at_enrollment\n"
				+ "        date_of_birth\n" + "        sex\n" + "        weight\n" + "        neutered_indicator\n"
				+ "        crf_id\n" + "    }\n" + "    diagnoses{\n" + "       disease_term\n"
				+ "        primary_disease_site\n" + "        stage_of_disease\n" + "        date_of_diagnosis\n"
				+ "        histology_cytopathology\n" + "        date_of_histology_confirmation\n"
				+ "        histological_grade\n" + "        pathology_report\n" + "        treatment_data\n"
				+ "        follow_up_data\n" + "        concurrent_disease\n" + "        concurrent_disease_type\n"
				+ "        crf_id\n" + "    }\n" + "    off_study{\n" + "       document_number\n"
				+ "        date_off_study\n" + "        reason_off_study\n" + "        date_of_disease_progression\n"
				+ "        date_off_treatment\n" + "        best_resp_vet_tx_tp_secondary_response\n"
				+ "        date_last_medication_administration\n" + "        best_resp_vet_tx_tp_best_response\n"
				+ "        date_of_best_response\n" + "    }\n" + "    off_treatment{\n" + "        document_number\n"
				+ "        date_off_treatment\n" + "        reason_off_treatment\n"
				+ "        date_of_disease_progression\n" + "        best_resp_vet_tx_tp_secondary_response\n"
				+ "        date_last_medication_administration\n" + "        best_resp_vet_tx_tp_best_response\n"
				+ "        date_of_best_response\n" + "    }\n" + "  }\n" + "}\n" + " \"}");
	}

	@Test
	public void testAPICasesDetails() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{\n" + "   \n" + "  case(patient_id: \\\"0201\\\"){\n" + "    patient_id\n"
				+ "    patient_first_name\n" + "    crf_id\n" + "    cohort{\n" + "       cohort_description\n"
				+ "       study_arm{\n" + "         arm\n" + "         ctep_treatment_assignment_code\n"
				+ "         study{\n" + "              clinical_study_id\n"
				+ "              clinical_study_designation\n" + "              clinical_study_name\n"
				+ "              clinical_study_description\n" + "              clinical_study_type\n"
				+ "              date_of_iacuc_approval\n" + "              dates_of_conduct\n" + "         }\n"
				+ "         agents{\n" + "             medication\n" + "             document_number\n" + "         }\n"
				+ "      }\n" + "    }\n" + "    enrollment{\n" + "        date_of_registration\n"
				+ "        registering_institution\n" + "        initials\n" + "        date_of_informed_consent\n"
				+ "        site_short_name\n" + "        veterinary_medical_center\n"
				+ "        enrollment_document_number\n" + "        cohort_description\n" + "        patient_subgroup\n"
				+ "    }\n" + "    demographic{\n" + "        breed\n" + "        patient_age_at_enrollment\n"
				+ "        date_of_birth\n" + "        sex\n" + "        weight\n" + "        neutered_indicator\n"
				+ "        crf_id\n" + "    }\n" + "    diagnoses{\n" + "       disease_term\n"
				+ "        primary_disease_site\n" + "        stage_of_disease\n" + "        date_of_diagnosis\n"
				+ "        histology_cytopathology\n" + "        date_of_histology_confirmation\n"
				+ "        histological_grade\n" + "        pathology_report\n" + "        treatment_data\n"
				+ "        follow_up_data\n" + "        concurrent_disease\n" + "        concurrent_disease_type\n"
				+ "        crf_id\n" + "    }\n" + "    off_study{\n" + "       document_number\n"
				+ "        date_off_study\n" + "        reason_off_study\n" + "        date_of_disease_progression\n"
				+ "        date_off_treatment\n" + "        best_resp_vet_tx_tp_secondary_response\n"
				+ "        date_last_medication_administration\n" + "        best_resp_vet_tx_tp_best_response\n"
				+ "        date_of_best_response\n" + "    }\n" + "    off_treatment{\n" + "        document_number\n"
				+ "        date_off_treatment\n" + "        reason_off_treatment\n"
				+ "        date_of_disease_progression\n" + "        best_resp_vet_tx_tp_secondary_response\n"
				+ "        date_last_medication_administration\n" + "        best_resp_vet_tx_tp_best_response\n"
				+ "        date_of_best_response\n" + "    }\n" + "  }\n" + "}\n" + " \"}");
	}

	@Test
	public void testAPIAllProgram() throws Exception {

		this.testGraphQLAPI("{\"query\":\" { \n" + "    program {\n" + "        program_name\n"
				+ "        program_acronym\n" + "        external_program_url\n" + "        program_full_description\n"
				+ "        program_short_description\n" + "        program_sort_order\n" + "  }\n" + "    \n" + "}\"}");
	}
	

	@Test
	public void testAPIAllProgramDetails() throws Exception {
		// to be updated
		this.testGraphQLAPI("{\"query\":\" { \n" + "    program {\n" + "        program_name\n"
				+ "        program_acronym\n" + "        external_program_url\n" + "        program_full_description\n"
				+ "        program_short_description\n" + "        program_sort_order\n" + "  }\n" + "    \n" + "}\"}");
	}

	@Test
	public void testAPICaseCountByBreed() throws Exception {

		this.testGraphQLAPI(
				"{\"query\":\" {\n" + "    caseCountByBreed{\n" + "    cases\n" + "    breed\n" + "  }\n" + "}\"}");
	}

	@Test
	public void testAPIcaseCountByDiagnosis() throws Exception {

		this.testGraphQLAPI("{\"query\":\"{\n" + "      caseCountByDiagnosis{\n" + "    cases\n" + "    diagnosis\n"
				+ "  }\n" + "} \"}");
	}

	@Test
	public void testAPICaseCountByStudyCode() throws Exception {

		this.testGraphQLAPI("{\"query\":\" {\n" + "      caseCountByStudyCode {\n" + "   cases\n" + "    study_code\n"
				+ "  }\n" + "}\"}");
	}

	@Test
	public void testAPICaseCountByGender() throws Exception {

		this.testGraphQLAPI("{\"query\":\" {\n" + "      caseCountByGender {\n" + "   cases\n" + "    gender\n"
				+ "  }\n" + "}\"}");
	}
	
	// Using program’s property(id)  to find related studies. 
	@Test
	public void testAPIStuidesOfProgram() throws Exception {
		// to be updated
	}
	
	//Using study’s property(id)  to find related cases.    
	@Test
	public void testAPICasesOfStudies() throws Exception {
		// to be updated
	}
	
	//Using case’s  property(id)  to find related samples.
	@Test
	public void testAPISampleOfCases() throws Exception {
		// to be updated
	}
	
	//Using sample’s property(id)  to find related files.
	@Test
	public void testAPIFilesOfSample() throws Exception {
		// to be updated
	}
	//Using file’s property(id)  to find related Aliquots.
	@Test
	public void testAPIAliguotesOfFIles() throws Exception {
		// to be updated
	}

	public void testAPI() throws Exception {

		//this.testGraphQLAPI("{\"query\":\" \"}");
	}
	@Test
	public void testGraphQLEndPointWithValidPayLoad() throws Exception {

		this.mockMvc
				.perform(RestDocumentationRequestBuilders.post("/v1/graphql/").contentType(MediaType.APPLICATION_JSON)
						.content("{\"query\":\"{study{clinical_study_id}}\"}"))
				.andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("data")))
				.andDo(document("{ClassName}/{methodName}"));

	}

	@Test
	public void testGraphQLEndPointWithInValidPayLoad() throws Exception {

		this.mockMvc
				.perform(RestDocumentationRequestBuilders.post("/v1/graphql/").contentType(MediaType.APPLICATION_JSON)
						.content("{\"query\":\"{e{id}}\"}"))
				.andDo(print()).andExpect(status().is4xxClientError()).andDo(document("{ClassName}/{methodName}"));

	}

}
