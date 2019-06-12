package gov.nih.nci.icdc.model;

import java.io.IOException;
import java.net.URL;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

public class Mocker {

	private String dashboard;
	private String programs;
	private String program_study;
	private String studies;
	private String study_detail;
	private String cases;
	private String case_detail;
	private String landing;

	public Mocker() {
		this.dashboard = this.getResource("mock_data/dashboard.json");
		this.programs = this.getResource("mock_data/programs.json");
		this.program_study = this.getResource("mock_data/program_study.json");
		this.studies = this.getResource("mock_data/studies.json");
		this.study_detail = this.getResource("mock_data/study_detail.json");
		this.cases = this.getResource("mock_data/cases.json");
		this.case_detail = this.getResource("mock_data/case_detail.json");
		this.landing = this.getResource("mock_data/landing.json");
	}

	public String getDashboard() {
		return dashboard;
	}

	public void setDashboard(String dashboard) {
		this.dashboard = dashboard;
	}

	public String getPrograms() {
		return programs;
	}

	public void setPrograms(String programs) {
		this.programs = programs;
	}

	public String getProgram_study() {
		return program_study;
	}

	public void setProgram_study(String program_study) {
		this.program_study = program_study;
	}

	public String getStudies() {
		return studies;
	}

	public void setStudies(String studies) {
		this.studies = studies;
	}

	public String getStudy_detail() {
		return study_detail;
	}

	public void setStudy_detail(String study_detail) {
		this.study_detail = study_detail;
	}

	public String getCases() {
		return cases;
	}

	public void setCases(String cases) {
		this.cases = cases;
	}

	public String getCase_detail() {
		return case_detail;
	}

	public void setCase_detail(String case_detail) {
		this.case_detail = case_detail;
	}

	public String getLanding() {
		return landing;
	}

	public void setLanding(String landing) {
		this.landing = landing;
	}

	private String getResource(String filePath) {

		StringBuilder sb = new StringBuilder();
		URL url = Resources.getResource(filePath);
		String sdl = "";
		try {
			sdl = Resources.toString(url, Charsets.UTF_8);
			sb.append(sdl);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return sb.toString();

	}

}
