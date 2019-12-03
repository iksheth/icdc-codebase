import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const defaultFooterStyles = {

};

const CustomFooter = ({
  classes,
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  text,
  onClick,
  selected,
  label,
}) => (
  <TableFooter>
    <TableRow>
      <TextField
        id="multiline-user-coments"
        label={label}
        multiline
        className={classes.textField}
        margin="normal"
        variant="filled"
      />
    </TableRow>
    <TableRow>
      <TableCell>
        <Button onClick={onClick} variant="contained" color="primary" disabled={!selected} className={classes.button}>
          {text}
        </Button>
      </TableCell>
      <TablePagination
        className={classes.root}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableRow>
  </TableFooter>
);

export default withStyles(defaultFooterStyles, { withTheme: true })(CustomFooter);
