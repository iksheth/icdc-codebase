import React from "react";
import {
  withStyles,
} from "@material-ui/core";
import icdcSchema from "../../assets/icdcSchema.svg";

const ModelPage = ({ classes, theme, ...props }) => {
  return (
    <React.Fragment>
          <div className={classes.schema}>
            <img src={icdcSchema} alt="ICDC schema"/>
          </div>
    </React.Fragment>
  );
};

const styles = (theme) => ({
  schema: {
    overflowX: 'scroll',
    maxWidth:'100%',
    overflowY: 'scroll'
  }
});

export default withStyles(styles, { withTheme: true })(ModelPage);
