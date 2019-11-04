import tinycolor from 'tinycolor2';

const primary = '#000';
const secondary = '#FF5C93';
const warning = '#FFC260';
const success = '#3CD4A0';
const info = '#9013FE';
const tableHeader = '#EEEEEE';
const lightenRate = 7.5;
const darkenRate = 15;
const tableHeaderBorder = '#004c73 3px solid';
const tableHeaderFontColor = '#194563';
const tableFontFamily = 'Raleway, sans-serif';


export default {
  custom: {
    maxContentWidth: '1440px',
    maxContent: 'black',
    bodyBackGround: 'white',
    cardBackGround: '#D9F3F2',
    footorBackground: '#2e2a24',
  },
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(primary)
        .darken(darkenRate)
        .toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
    },
    textWhite: {
      main: 'white',
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    text: {
      withbackground: 'white',
      primary: '#4A4A4A',
      secondary: '#6E6E6E',
      hint: '#B9B9B9',
      footerText: 'white',
    },
    background: {
      default: '#fafafa',
      light: '#F3F5FF',
    },
  },
  customShadows: {
    widget:
      '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetDark:
      '0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetWide:
      '0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
  },
  overrides: {
    MUIDataTableSelectCell: {
      fixedHeader: {
        position: 'relative',
      },
      headerCell: {
        borderTop: tableHeaderBorder,
        borderBottom: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,

      },
      checkboxRoot: {
        color: 'inherit',
      },

    },
    MuiBackdrop: {
      root: {
        backgroundColor: '#4A4A4A1A',
      },
    },
    MuiMenu: {
      paper: {
        boxShadow:
          '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
      },
    },
    MuiSelect: {
      icon: {
        color: '#B9B9B9',
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: 'white',
      },
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        borderTop: tableHeaderBorder,
        borderBottom: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,
        textDecoration: 'underline',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '11pt',
        fontWeight: 'bold',
      },
      sortActive: {
        color: tableHeaderFontColor,
      },
      toolButton: {
        cursor: 'pointer',
        display: 'inline-flex',
        outline: 'none',

      },
    },
    MuiTableSortLabel: {
      active: {
        color: 'white',
      },
    },
    MUIDataTableBodyRow: {
      root: {
        '&:nth-child(even)': {
          backgroundColor: '#f5f5f5',
          color: '#5e8ca5',
        },
        '&:nth-child(odd)': {
          color: '#1c2023',
        },
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '0px',
      },
      body: {
        color: 'inherit',
        fontFamily: '"Open Sans", sans-serif',
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '10pt',
        fontWeight: 'bold',
      },
      head: {
        fontSize: '0.95rem',
      },
    },
    MUIDataTableToolbarSelect: {
      root: {
        backgroundColor: tableHeader,
      },
      titleText: {
        color: tableHeaderFontColor,
        fontSize: '25.2pt',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal',
      },
    },
  },
};
