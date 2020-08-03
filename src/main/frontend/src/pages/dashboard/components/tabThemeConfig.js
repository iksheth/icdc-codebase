import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../../themes';

export default ({ children, extraStyles, tableBorder }) => {
  const style = [];

  const overridesObj = themes.light.overrides;

  if (extraStyles) style.push(extraStyles);

  if (tableBorder) {
    overridesObj.MUIDataTableSelectCell.headerCell.borderTop = tableBorder;
    overridesObj.MUIDataTableSelectCell.headerCell.borderBottom = tableBorder;
    overridesObj.MUIDataTableHeadCell.fixedHeaderCommon.borderTop = tableBorder;
    overridesObj.MUIDataTableHeadCell.fixedHeaderCommon.borderBottom = tableBorder;
    overridesObj.MuiPrivateTabIndicator.colorPrimary = { backgroundColor: tableBorder.split(' ')[0] };
    overridesObj.MuiTableFooter = { root: { borderTop: tableBorder } };
    overridesObj.MUIDataTableToolbar = { root: { minHeight: '24px' } };
  }

  const MuiTabs = {
    root: {
      marginTop: '20px',
    },
    flexContainer: {
      borderBottom: '1px solid #6B6B6B',
      overflow: 'visible !important',
    },
  };

  const MuiTab = {
    root: {
      width: '250px',
      height: '52px',
      marginRight: '10px',
      background: '#EAEAEA',
      '&$selected': {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderLeftColor: '#6B6B6B',
        borderRightColor: '#6B6B6B',
        borderBottomWidth: '0px',
        background: '#FFFFFF',
      },
    },
    labelContainer: {
      fontSize: '18px',
      fontFamily: 'Raleway',
      fontWeight: 'bold',
      lineHeight: '18px',
      paddingLeft: '5px',
      letterSpacing: '0.25px',
    },
  };

  overridesObj.MuiTabs = MuiTabs;
  overridesObj.MuiTab = MuiTab;

  style.push(overridesObj);
  const computedTheme = createMuiTheme({ ...themes.light, ...overrides, ...style });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};
