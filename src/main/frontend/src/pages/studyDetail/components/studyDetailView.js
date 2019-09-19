import React from "react";
import {
  Grid,
  withStyles,
} from "@material-ui/core";
import StatsTemplate from "../../../components/Stats/StatsView_tmp";
import MUIDataTable from "mui-datatables";
import { Typography } from "../../../components/Wrappers/Wrappers";

const columns = [{ name: "program_id", label: "Program" },
{ name: "clinical_study_designation", label: "Study Code" },
{ name: "clinical_study_name", label: "Study Name" },
{ name: "clinical_study_type", label: "Study Type" },
{ name: "numberOfCases", label: "Cases" },
];

const options = {
  selectableRows: false,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: false,
};

const StudyDetailView = ({ classes, theme, data }) => {
  let d = data.study[0];
  let cases ="";
  if(d && d.cases){
      cases = d.cases;
  }
  let diagnoses = [];
  let diagnoses_added = [];
  if(cases!=""){
    for (var i = cases.length - 1; i >= 0; i--) {
     if(cases[i].diagnoses){
         for (var j = cases[i].diagnoses.length - 1; j >= 0; j--) {
             if(cases[i].diagnoses[j].disease_term){
              if(!diagnoses_added.includes(cases[i].diagnoses[j].disease_term)) { // ignore duplicated disease_term
                  diagnoses_added.push(cases[i].diagnoses[j].disease_term );
                  diagnoses.push(<li key={cases[i].diagnoses[j].disease_term}>{cases[i].diagnoses[j].disease_term}</li>);
              }
             }
         }
     }
    }
  }
  

  let principal_investigators=[];
  if(d && d.principal_investigators){
      for (var k = d.principal_investigators.length - 1; k >= 0; k--) {
      principal_investigators.push(<li key={ d.principal_investigators[k].pi_first_name}>{d.principal_investigators[k].pi_first_name,d.principal_investigators[k].pi_last_name}</li>);
    }
  }

  let file_type =[]
  let file_type_added = [];
  if(data.fileOfStudy){
     for (var m = data.fileOfStudy.length - 1;m>= 0; m--) {
      if(!file_type_added.includes(data.fileOfStudy[m].file_type)){
            file_type_added.push(data.fileOfStudy[m].file_type);
            file_type.push(<li key={ data.fileOfStudy[m].file_type}>{data.fileOfStudy[m].file_type}</li>);
      }
  
    }
  }
  
  let stat ={
    numberOfStudies:1,
    numberOfCases:data.caseCountOfStudy,
    numberOfSamples:data.sampleCountOfStudy,
    numberOfFiles:data.fileCountOfStudy,
    numberOfBiospecimenAliquots:data.aliguotCountOfStudy
  }
  return (
    <React.Fragment>
      <StatsTemplate  data = {stat}/>
        <Typography variant='headline' color='warning' size='sm'>
          <p className={classes.paragraphStyle}>
           {d.clinical_study_designation} 
          </p>{" "}
        </Typography>
        {d.clinical_study_name}
       <Grid container spacing={32}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
           
          <p className={classes.paragraphStyle}>
            Summary:
          </p>
          <p>{d.clinical_study_description}</p>
          <p>Principal Investigators</p>
          <p>{principal_investigators}</p>
          <p>IACUC Approval</p>
           <p>{d.date_of_iacuc_approval}</p>
           <p>Study Date</p>
           <p>{d.dates_of_conduct}</p>
       
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={12}>
           <p className={classes.paragraphStyle}>
            DIAGNOSES:
          </p>
          <p>{diagnoses}</p>
       
        </Grid>

        <Grid item lg={3} md={3} sm={6} xs={12}>
           <p className={classes.paragraphStyle}>
            File Type:
          </p>
          <p>{file_type}</p>
       
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const styles = (theme) => ({
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column"
  },
  caseCardContainer: {
    marginTop: '32px'
  },
  paper: {
    textAlign: 'center'
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  }
});

export default withStyles(styles, { withTheme: true })(StudyDetailView);
