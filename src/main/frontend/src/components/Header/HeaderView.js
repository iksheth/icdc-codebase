import React from 'react';
import { withStyles } from '@material-ui/core';
import icdcLogo from '../../assets/logo.png';
import dctdLogo from '../../assets/icdc_logo.png';

// import classes from '*.module.sass';

/**
 * Header
 */

const Header = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.headerBar}>
      <nav className={classes.headerBarNavLeft}>
        <div role="button" tabIndex="0" className={classes.headerBarHomeButton}><img src={dctdLogo} alt="dctd_logo" /></div>
        <div className={classes.grow} />
        <div className={classes.headerBarNavLogo}>
          <img
            className={classes.headerBarNavLogoImg}
            src={icdcLogo}
            alt="icdc_logo"
          />
        </div>
      </nav>
    </div>
  </div>
);

const styles = (theme) => ({
  headerBar: {
    position: 'fixed',
    width: '100vw',
    backgroundColor: 'white',
    top: '0px',
  },

  headerBarNavLeft: {
    float: 'left',
    display: 'inline-flex',
    width: '100vw',
  },
  headerBarNavLogo: {
    padding: '8px 0',
    display: 'inline-block',
    paddingRight: theme.spacing.unit * 2,
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
    flexGrow: 3,
  },


});


Header.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Header);
