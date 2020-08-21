import React from 'react';
import { Link } from '@material-ui/core';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const defaultFooterStyles = {
  link: {
    color: '#dc762f',
    fontWeight: 'bolder',
    '&:hover': {
      color: '#dc762f',
    },
  },
};

const CustomFooter = ({
  classes,
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  label,
}) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        className={classes.root}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableRow>
    <TableRow>
      <div style={{ marginTop: '20px', marginBottom: '5px' }}>
        <span>
          To access and analyze files: select and remove unwanted files,
          click the “Download Manifest” button, and upload the resulting
          Manifest file to your
          {' '}
        </span>
        <span>
          <Link target="_blank" className={classes.link} href="http://www.cancergenomicscloud.org/">
            Seven Bridges Genomics account.
          </Link>
        </span>
      </div>
      <TextField
        id="multiline-user-coments"
        label={label}
        multiline
        rows={6}
        style={{ minWidth: '500px' }}
        className={classes.textField}
        margin="dense"
        variant="filled"
      />
    </TableRow>
    <TableRow />
  </TableFooter>
);

export default withStyles(defaultFooterStyles, { withTheme: true })(CustomFooter);
