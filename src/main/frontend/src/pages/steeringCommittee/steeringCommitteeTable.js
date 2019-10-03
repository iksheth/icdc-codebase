import React from 'react';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function createData(number, name, institution, affiliation, subCommitee) {
  return {
    number, name, institution, affiliation, subCommitee,
  };
}

const rows = [
  createData(
    '1',
    'Matthew Breen',
    'North Carolina State University',
    'External',
    'DGAB',
  ),
  createData(
    '2',
    'M.R. Chambers',
    'University of Alabama at Birmingham',
    'External',
    'BPSC',
  ),
  createData(
    '3',
    'Dawn Duval',
    'Colorado State University',
    'External',
    'BPSC',
  ),
  createData(
    '4',
    'Allison Heath',
    'Children’s Hospital of Phildelphia',
    'External',
    'BPSC',
  ),
  createData(
    '5',
    'Will Hendricks',
    'Translational Genomics Research Institute (TGen)',
    'External',
    'DGAB',
  ),
  createData('6', 'Warren Kibbe', 'Duke University', 'External', 'DGAB'),
  createData('7', 'Deborah Knapp', 'Purdue University', 'External', 'BPSC'),
  createData('8', 'Cheryl London', 'Tufts University', 'External', 'BPSC'),
  createData('9', 'Roel Verhaak', 'The Jackson Laboratory', 'External', 'DGAB'),
  createData(
    '10',
    'Jeff Trent',
    'Translational Genomics Research Institute (TGen)',
    'External',
    'BPSC',
  ),
  createData('11', 'Shaying Zhao', 'University of Georgia', 'External', 'BPSC'),
  createData('12', 'Toby Hecht', 'DCTD', 'NCI', 'BPSC'),
  createData('13', 'Paula Jacobs', 'CIP/DCTD', 'NCI', 'BPSC'),
  createData('14', 'Tony Kerlavage', 'CBIIT', 'NCI', ''),
  createData('15', 'Erika Kim', 'CBIIT', 'NCI', 'DGAB,BPSC'),
  createData('16', 'Amy LeBlanc', 'COP/CCR', 'NCI', 'DGAB'),
  createData('17', 'Christina Mazcko', 'COP/CCR', 'NCI', ''),
  createData('18', 'Elaine Ostrander', 'CGCGB/NHGRI', 'NIH', 'BPSC'),
  createData('19', 'Connie Sommers', 'IOB/DTP/DCTD', 'NCI', 'DGAB,BPSC'),
  createData('20', 'Greg Tawa', 'TRNDP/NCATS', 'NIH', 'DGAB'),
  createData('21', 'Allen Dearry', 'CBIIT', 'NCI', ''),
  createData('22', 'Matthew Beyers', 'FNLCR', 'FNL', 'DGAB,BPSC'),
  createData('23', 'Philip Musk', 'FNLCR', 'FNL', 'DGAB'),
  createData('24', 'John Otridge', 'FNLCR', 'FNL', ''),
  createData('25', 'Ralph Parchment', 'FNLCR', 'FNL', ''),
];

const Error = ({ classes }) => (
  <Table className={classes.table}>
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell align="center">Name</TableCell>
        <TableCell align="center">Institution</TableCell>
        <TableCell align="center">Affiliation</TableCell>
        <TableCell align="center">SubCommitee(s)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.name}>
          <TableCell component="th" scope="row">
            {row.number}
          </TableCell>
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="left">{row.institution}</TableCell>
          <TableCell align="left">{row.affiliation}</TableCell>
          <TableCell align="left">{row.subCommitee}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const styles = () => ({});

export default withStyles(styles, { withTheme: true })(Error);
