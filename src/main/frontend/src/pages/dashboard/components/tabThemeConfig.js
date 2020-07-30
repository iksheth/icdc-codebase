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
    overridesObj.MuiTableFooter = { root: { borderTop: tableBorder } };
    overridesObj.MUIDataTableToolbar = { root: { minHeight: '24px' } };
    style.push(overridesObj);
  }

  const computedTheme = createMuiTheme({ ...themes.light, ...overrides, ...style });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};
