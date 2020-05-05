import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

const defaultFooterStyles = {
  button: {
    textDecoration: 'none',
  },
};

const CustomFooter = ({
  classes,
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  text,
}) => (
  <TableFooter>
    <TableRow>
      <TableCell>
        <Link to={count > 0 && 'mycasesfiles'} className={classes.button}>
          <Button disabled={count < 1} variant="contained" color="primary">
            {text}
          </Button>
        </Link>
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
