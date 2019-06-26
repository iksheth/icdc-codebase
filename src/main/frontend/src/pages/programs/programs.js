import React from "react";
import {
  Grid,
  Paper,
  withStyles,
} from "@material-ui/core";
import Widget from "../../components/Widgets/WidgetView";
import { Typography } from "../../components/Wrappers/Wrappers";

const Programs = ({ classes, theme, ...props }) => {
  return (
    <React.Fragment>
      <Grid container spacing={32}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
           <Typography variant="headline" color="secondary" size="xxl">
             This is a programs page
            </Typography>
            <Typography variant="headline" color="primary">
             This is a programs page
            </Typography>
          </Paper>
        </Grid>
        </Grid>
      <Grid container spacing={32}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            title="Studies"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
          </Widget>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            title="Breed"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
                       <div className={classes.fakeToolbar} />

          </Widget>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            title="Diagnosis"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
              <div className={classes.fakeToolbar} />
          </Widget>
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
  paper: {
    textAlign: 'center'
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  }
});

export default withStyles(styles, { withTheme: true })(Programs);
