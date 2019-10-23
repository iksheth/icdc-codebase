import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import Stats from '../../../components/Stats/StatsController';
import Widget from '../../../components/Widgets/WidgetView';
import { Typography } from '../../../components/Wrappers/Wrappers';

const columns = [
  { name: 'program_id', label: 'Program' },
  { name: 'clinical_study_designation', label: 'Study Code' },
  { name: 'clinical_study_name', label: 'Study Name' },
  { name: 'clinical_study_type', label: 'Study Type' },
  { name: 'numberOfCases', label: 'Cases' },
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

  return (
    <>
      <Stats />
      <div className={classes.programDetailContainer}>
        <div className={classes.programDetailHeader}>
          <Typography variant="headline" size="sm">
            {`${programDetail.program_acronym}(${programDetail.program_name})`}
          </Typography>
        </div>
        <Grid container spacing={32}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={32} direction="column">
              <Grid item xs={12}>
                <Widget
                  title={`${programDetail.program_name}(${programDetail.program_acronym})`}
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  color="warning"
                >
                  <Grid item>
                    <Typography>
                      {programDetail.program_full_description
                        ? programDetail.program_full_description : null}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      {programDetail.program_external_url
                        ? <a href={`https://${programDetail.program_external_url}`} target="icdc">{programDetail.program_external_url}</a> : null}
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
