import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {
  withStyles
} from "@material-ui/core";
import { Typography } from "../Wrappers/Wrappers";


 function PositionedSnackbar({ classes }) {
  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "right"
  });

  const { vertical, horizontal, open } = state;


  function handleClose() {
    setState({ ...state, open: false });
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        
      >
        <SnackbarContent
      className ={classes.warning}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<Typography color="textWhite"><b>Please note:</b>&nbsp;Data is purely representational and does not reflect actual values </Typography>}
    />
      </Snackbar>
    </div>
  );
}

const styles = {
  warning: {
      backgroundColor: 'red',
  }
};

export default withStyles(styles)(PositionedSnackbar);
