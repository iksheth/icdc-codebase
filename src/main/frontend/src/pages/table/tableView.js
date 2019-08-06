import React from "react";
import {
  Grid,
  withStyles,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

const columns = ["Program", "Study Code", "Study Name", "Study Type", "Cases"];

const data = [
  ["COP", "COTC007B", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "85"],
  ["COP", "COTC008", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "52"],
  ["COP", "COTC009", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "25"],
  ["NCATS", "NCATS01", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "60"],
  ["Loriem ipsum", "NCATS01", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "0"],
  ["COP", "COTC007B", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "85"],
  ["COP", "COTC008", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "52"],
  ["COP", "COTC009", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "25"],
  ["NCATS", "NCATS01", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "60"],
  ["Loriem ipsum", "NCATS01", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "0"],
  ["COP", "COTC007B", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "85"],
  ["COP", "COTC008", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "52"],
  ["COP", "COTC009", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "25"],
  ["NCATS", "NCATS01", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "60"],
  ["Loriem ipsum", "NCATS01", "Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs", "Clinical Trial", "0"],
];


const options = {
  selectableRows: false,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
};

const Studies = ({ classes, theme, ...props }) => {
  return (
    <React.Fragment>
      <Grid container spacing={32}>
        <Grid item xs={12}>
          <MUIDataTable
            title={"All Studies"}
            data={data}
            columns={columns}
            options={options}
          />
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
  caseCardContainer: {
    marginTop: '32px'
  },
  paper: {
    textAlign: 'center'
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  }
});

export default withStyles(styles, { withTheme: true })(Studies);
