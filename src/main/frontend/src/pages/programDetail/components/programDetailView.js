import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import StatsView from '../../../components/Stats/StatsView';
import Widget from '../../../components/Widgets/WidgetView';
import { Typography } from '../../../components/Wrappers/Wrappers';


const columns = [
  { name: 'program_id', label: 'Program' },
  {
    name: 'clinical_study_designation',
    label: 'Study Code',
    options: {
      customBodyRender: (value) => (
        <div className="mui_td">
          {' '}
          <Link to={`/study/${value}`}>{value}</Link>
          {' '}
        </div>
      ),
    },
  },
  { name: 'clinical_study_name', label: 'Study Name' },
  { name: 'clinical_study_type', label: 'Study Type' },
  {
    name: 'numberOfCases',
    label: 'Cases',
    options: {
      customBodyRender: (value, tableMeta) => (
        <div className="mui_td">
          {' '}
          <Link to={`/study_cases/${tableMeta.rowData[1]}`}>{value}</Link>
          {' '}
        </div>
      ),
    },
  },
];

const options = {
  selectableRows: false,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: true,

};

const ProgramDetailView = ({ classes, data }) => {
  const programDetail = data.program[0];
  const stat = {
    numberOfStudies: data.studyCountOfProgram,
    numberOfCases: data.caseCountOfProgram,
    numberOfSamples: data.sampleCountOfProgram,
    numberOfFiles: data.fileCountOfProgram,
    numberOfBiospecimenAliquots: data.aliguotCountOfProgram,
  };
  // let newText = text.split ('\n').map ((item, i) => <p key={i}>{item}</p>);
  return (
    <>
      <StatsView data={stat} />
      <div className={classes.programDetailContainer}>
        <div className={classes.programDetailHeader}>
          <Typography variant="headline" size="sm">
            {`${programDetail.program_name} (${programDetail.program_acronym})`}
          </Typography>
        </div>
        <Grid container spacing={32}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={32} direction="column">
              <Grid item xs={12}>
                <Widget
                  title="Program Summary"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  color="warning"
                >
                  <Grid item>
                    <Typography>
                      {programDetail.program_full_description
                        ? programDetail.program_full_description.split('**').map((item, i) => <p key={i}>{item}</p>) : null}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      {programDetail.program_external_url
                        ? <a href={`${programDetail.program_external_url}`} target="icdc">{programDetail.program_external_url}</a> : null}
                    </Typography>
                  </Grid>
                </Widget>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={32} direction="column">
              <Grid item xs={12}>
                <MUIDataTable
                  title="STUDIES IN THIS PROGRAM"
                  data={data.studiesByProgramId}
                  columns={columns}
                  options={options}
                />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </div>
    </>
  );
};

const styles = (theme) => ({
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  programDetailHeader: {
    display: 'inline-flex',
    paddingTop: 'inherit',
    paddingBottom: '10px',
  },
  studyDetailButton: {
    float: 'right',
  },
  programDetailContainer: {
    padding: `${theme.spacing.unit * 2}px`,
    background: theme.custom.cardBackGround,
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
});

export default withStyles(styles, { withTheme: true })(ProgramDetailView);
