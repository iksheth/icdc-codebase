import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import icdcLogo from '../../assets/logo.png';
import dctdLogo from '../../assets/icdc_logo.png';

// import classes from '*.module.sass';

/**
 * Header
 */

 const Header =({classes}) => (
    <div className={classes.root}>
    <div className={classes.headerBar}>
      <nav className={classes.headerBarNavLeft}>
        <div role="button" tabIndex="0" className={classes.headerBarHomeButton}><img src={dctdLogo} alt="dctd_logo"/></div>
        <div className={classes.grow} />
        <div className={classes.headerBarNavLogo}>
            <img
              className={classes.headerBarNavLogoImg}
              src={icdcLogo}
              alt='icdc_logo'
            />
        </div>
      </nav>
    </div>
  </div>
 );

 const styles = ( theme ) => ({
    headerBar: {
        width: '100vw',
        backgroundColor: 'white',
        borderBottom: '1px solid #d1d1d1',
      },
      
      headerBarNavLeft: {
        float: 'left',
        display: 'inline-flex',
        width: '100vw'
      },
      headerBarNavLogo: {
        padding: '8px 0',
        display: 'inline-block',
        paddingRight: theme.spacing.unit * 2
      },
      headerBarNavLogoImg: {
        height: '64px',
        display: 'block',
        paddingRight: '8px',
      },
      headerBarHomeButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '22px',
        height: '64px',
        margin: 'auto',
        borderLeft: '1px solid #d1d1d1',
      },
      grow: {
        flexGrow: 3
      },
      
      
 });

 Header.propTypes = {
  navTitle: PropTypes.string,
  activeTab: PropTypes.string,
  onActiveTab: PropTypes.func,
  onInitActive: PropTypes.func,
  isFullWidth: PropTypes.bool,
};

Header.defaultProps = {
  activeTab: '',
  onActiveTab: () => {},
  onInitActive: () => {},
  navTitle: null,
  isFullWidth: false,
};

export default withStyles(styles)(Header);
