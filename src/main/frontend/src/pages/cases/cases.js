import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import Stats from '../../components/Stats/StatsView';
import Widget from '../../components/Widgets/WidgetView';
import { Typography } from '../../components/Wrappers/Wrappers';

const Cases = ({ classes }) => (
  <>
    <Stats />
    {/* Start of case view conatiner */}
    <div className={classes.caseCardContainer}>
      <Widget
        title="Case Detail #COTC007B1234: Molly (MM)"
        upperTitle
        bodyClass={classes.fullHeightBody}
        className={classes.card}
      >
        <Grid container spacing={32}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            {/* Start of case view left grid */}
            <Grid container spacing={32} direction="column">
              {/* Start of Demographics data Grid item */}
              <Grid item xs={12}>
                <Widget
                  title="DEMOGRAPHICS"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                >
                  {/* Start of Demographics data Grid */}
                  <Grid container spacing={8}>
                    {/* Start of Row  */}
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Breed</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>Labrador Retriever </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Row  */}
                    {/* Start of Row  */}
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Sex</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>Spayed Female </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Row  */}
                    {/* Start of Row  */}
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Age of Enrollment</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>4.6 years</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Row  */}
                  </Grid>
                  {/* End of Demographics data Grid */}
                </Widget>
              </Grid>
              {/* End of Demographics data Grid item */}
              {/* Start of Diagnosis data Grid item */}
              <Grid item xs={12}>
                <Widget
                  title="DIAGNOSIS"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                >
                  {/* Start of Demographics data Grid */}
                  <Grid container spacing={8}>
                    {/* Start of Row  */}
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Disease</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>Malignant Lymphoma </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Row  */}
                    {/* Start of Row  */}
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Stage of Disease</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>IVB</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Row  */}
                    {/* Start of Row  */}
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Date of Diagnosis</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>10/07/2011</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Row  */}
                    {/* Start of Row  */}
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Primary Site</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>LYMPH NODE</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Row  */}
                    {/* Start of Row  */}
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Histology/Cytology</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>Cytology = large cell lymphomia</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Row  */}
                    {/* Start of Row  */}
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Histological Grade</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>Null</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Row  */}
                  </Grid>
                  {/* End of Demographics data Grid */}
                </Widget>
              </Grid>
              {/* End of Demographics data Grid item */}
            </Grid>
          </Grid>
          {/* End of case view left grid */}
          {/* start of case view right grid */}
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Widget
              title="STUDY"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              {/* Start of Study data Grid */}
              <Grid container spacing={8}>
                {/* Start of Row  */}
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Assigned to Study</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>COTC007B</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Row  */}
                {/* Start of Row  */}
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Assigned to Arm</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>NSC 706744</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Row  */}
                {/* Start of Row  */}
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Assigned to Cohort</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
NSC 70674450mg/m
                        <sup>2</sup>
/day
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Row  */}
                {/* Start of Row  */}
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Patient Subgroup</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>Dose Escalation</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Row  */}
                {/* Start of Row  */}
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Date of Informed Consent</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>10/24/2012</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Row  */}
                {/* Start of Row  */}
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Date of Enrollment</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>10/20/2011</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Row  */}
                {/* Start of Row  */}
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Study Site</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>UPENN</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Row  */}
                {/* Start of Row  */}
                <Grid item xs={12}> </Grid>
                {/* End of Row  */}
                {/* Start of Row  */}
                <Grid item xs={12}>
                  <Typography variant="headline" color="secondary">
              AVAILABLE DATA
                  </Typography>
                </Grid>
                {/* End of Row  */}
                {/* Start of Row  */}
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">TBD</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography />
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Row  */}
                {/* Start of Row  */}
                {/* <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={4}>
                  <Typography weight="bold">Disease Term</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>Malignant Lymphoma</Typography>
                </Grid>
              </Grid>
            </Grid> */}
                {/* End of Row  */}
                {/* Start of Row  */}
                {/* <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={4}>
                  <Typography weight="bold">Date of Confirmation History</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>07/10/11</Typography>
                </Grid>
              </Grid>
            </Grid> */}
                {/* End of Row  */}
                {/* Start of Row  */}
                {/* <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={4}>
                  <Typography weight="bold">Date of Informed Consent</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>10/24/19</Typography>
                </Grid>
              </Grid>
            </Grid> */}
                {/* End of Row  */}
                {/* Start of Row  */}
                {/* <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={4}>
                  <Typography weight="bold">Cohort</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>28</Typography>
                </Grid>
              </Grid>
            </Grid> */}
                {/* End of Row  */}
              </Grid>
              {/* End of Study data Grid */}
            </Widget>
          </Grid>
          {/* End of case view right grid */}
        </Grid>
      </Widget>
    </div>
    {/* End of case view conatiner */}
  </>
);

const styles = (theme) => ({
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  caseCardContainer: {
    marginTop: '32px',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
});

export default withStyles(styles, { withTheme: true })(Cases);
