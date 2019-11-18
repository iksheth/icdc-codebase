import React from 'react';
import {
  Grid,
  Paper,
  withStyles,
} from '@material-ui/core';
import { Typography } from '../Wrappers/Wrappers';
import StudyIcon from '../../assets/icons/Icon-studies-stats.svg';
import CasesIcon from '../../assets/icons/Icon-cases-stats.svg';
import SamplesIcon from '../../assets/icons/Icon-samples-stats.svg';
import FilesIcon from '../../assets/icons/Icon-files-stats.svg';
import AliquotsIcon from '../../assets/icons/Icon-aliquots-stats.svg';


const StatsView = ({ classes, data }) => (
  <Grid container spacing={32} class={classes.statsContainer}>
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Grid container class={classes.statsMaxWidth}>
          <Grid item xs={1} />
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <div className={classes.statsGroup}>
              <div className={classes.statsIcon}>
                <img
                  src={StudyIcon}
                  alt="Studies Stats Bar Icon"
                />

              </div>
              <div className={classes.statsText}>
                <Typography weight="bold" size="md">
                  {' '}
                  {data.numberOfStudies ? data.numberOfStudies : 0}
                </Typography>
                <Typography color="primary" weight="bold" size="sm">
                                            Studies
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <div className={classes.statsGroup}>
              <div className={classes.statsIcon}>
                <img
                  src={CasesIcon}
                  alt="Cases Stats Bar Icon"
                />

              </div>
              <div className={classes.statsText}>
                <Typography weight="bold" size="md">
                  {data.numberOfCases ? data.numberOfCases : 0}
                </Typography>
                <Typography color="primary" weight="bold" size="sm">
                                            Cases
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <div className={classes.statsGroup}>
              <div className={classes.statsIcon}>
                <img
                  src={SamplesIcon}
                  alt="Cases Samples Bar Icon"
                />

              </div>
              <div className={classes.statsText}>
                <Typography weight="bold" size="md">
                  {data.numberOfSamples ? data.numberOfSamples : 0}
                </Typography>
                <Typography color="primary" weight="bold" size="sm">
                                            Samples
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <div className={classes.statsGroup}>
              <div className={classes.statsIcon}>
                <img
                  src={FilesIcon}
                  alt="Files Stats Bar Icon"
                />

              </div>
              <div className={classes.statsText}>
                <Typography weight="bold" size="md">
                  {data.numberOfFiles ? data.numberOfFiles : 0}
                </Typography>
                <Typography color="primary" weight="bold" size="sm">
                                            Files
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <div className={classes.statsGroup}>
              <div className={classes.statsIcon}>
                <img
                  src={AliquotsIcon}
                  alt="Aliquots Stats Bar Icon"
                />

              </div>
              <div className={classes.statsText}>
                <Typography weight="bold" size="md">
                  {data.numberOfBiospecimenAliquots ? data.numberOfBiospecimenAliquots : 0}
                </Typography>
                <Typography color="primary" weight="bold" size="sm">
                                            Biospecimen Aliquots
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Paper>
    </Grid>
  </Grid>
);

const styles = (theme) => ({
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    textAlign: 'center',
    background: theme.palette.curiousBlue.main,
    boxShadow: 'none',
  },
  statsGroup: {
    padding: '9px 16px 12px 16px',
    height: '46px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
  statsText: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '32px',
  },
  statsIcon: {
    position: 'absolute',
    float: 'left',
    width: '25px',
    height: '25px',
  },
});

export default withStyles(styles, { withTheme: true })(StatsView);
