import React from "react";
import {
  Grid,
  Paper,
  withStyles,
} from "@material-ui/core";
import Widget from "../../components/Widgets/WidgetView";
import { Typography } from "../../components/Wrappers/Wrappers";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_DOGS = gql`{
  numberOfStudies
}
`;

const Programs = ({ classes, theme, ...props }) => {
  return (
    <Query query={GET_DOGS}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching</div>
      if (error) return <div>Error</div>
      const linksToRender = data.numberOfStudies
      return (
       <div>{linksToRender}</div>
      )
    }}
    </Query>
  )
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
