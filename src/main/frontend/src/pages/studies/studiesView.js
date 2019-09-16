import React from "react";
import {
  Grid,
  withStyles,
} from "@material-ui/core";
import Stats from "../../components/Stats/StatsView";
import MUIDataTable from "mui-datatables";

const columns = [{ name: "program_id", label: "Program" },
{ name: "clinical_study_designation", label: "Study Code" },
{ name: "clinical_study_name", label: "Study Name" },
{ name: "clinical_study_type", label: "Study Type" },
{ name: "numberOfCases", label: "Cases" },
];

const options = {
  selectableRows: false,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: false,
};

const Studies = ({ classes, theme, data }) => {
  return (
    <React.Fragment>
      <Stats />
      <Grid container spacing={32}>
        <Grid item xs={12}>
          <MUIDataTable
            title={"All Studies"}
            data={data.studiesByProgram}
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