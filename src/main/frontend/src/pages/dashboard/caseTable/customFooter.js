import React from "react";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import Button from '@material-ui/core/Button';

import { withStyles } from "@material-ui/core/styles";

const defaultFooterStyles = {
};

class CustomFooter extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <TableFooter>
        <TableRow>
          <TableCell>
            <Button variant="contained" color="primary" className={classes.button}>
              QUEUE FOR EXPORT AND ANALYSIS
            </Button>
          </TableCell>
          <TablePagination
            className={classes.root}
            count={this.props.count}
            page={this.props.page}
            rowsPerPage={this.props.rowsPerPage}
            onChangePage={this.props.onChangePage}
            onChangeRowsPerPage={this.props.onChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    );
  }

}

export default withStyles(defaultFooterStyles, { name: "CustomFooter" })(CustomFooter);