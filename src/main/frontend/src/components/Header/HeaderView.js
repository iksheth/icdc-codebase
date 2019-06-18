import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import icdc_logo from '../../assets/logo.png';
import dctd_logo from '../../assets/nci_dctd.png';

// import classes from '*.module.sass';

/**
 * Header
 */

 const Header =({classes}) => (
    <div className={classes.root}>
    <div className={classes.headerBar}>
      <nav className={classes.headerBarNavLeft}>
        <div className={classes.headerBarNavLogo}>
            <img
              className={classes.headerBarNavLogoImg}
              src={icdc_logo}
              alt='icdc_logo'
            />
        </div>
        <div role="button" tabindex="0" className={classes.headerBarHomeButton}><img src={dctd_logo} alt="dctd_logo"/></div>
      </nav>
    </div>
  </div>
 );

 const styles = theme => ({
    headerBar: {
        width: '100vw',
        backgroundColor: 'white',
        borderBottom: '1px solid #d1d1d1',
      },
      
      headerBarNavLeft: {
        float: 'left',
        display: 'inline-flex',
      },
      headerBarNavLogo: {
        padding: '8px 0',
        display: 'inline-block',
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
      }
      
      
 });

 Header.propTypes = {
  navItems: PropTypes.array.isRequired,
  dictIcons: PropTypes.object.isRequired,
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
