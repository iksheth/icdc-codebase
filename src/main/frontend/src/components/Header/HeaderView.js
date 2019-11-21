import React from 'react';
import { withStyles } from '@material-ui/core';
import nihLogo from '../../assets/header/icdc_nih_logo.svg';
import icdcLogo from '../../assets/header/icdc_logo_white.svg';
import cancergraphic from '../../assets/header/Canine.png';


// import classes from '*.module.sass';

/**
 * Header
 */

const Header = ({ classes }) => (
  <div className={classes.headerBar}>
    <div className={classes.nihLogoContainer}>
      <img
        className={classes.nihLogoImg}
        src={nihLogo}
        alt="nih_logo"
      />
      <img
        src={cancergraphic}
        alt="cancer_graphic"
      />
    </div>
    <div className={classes.icdcLogoContainer}>
      <div className={classes.grow} />
      <img
        className={classes.icdcLogoImg}
        src={icdcLogo}
        alt="icdc_logo"
      />
    </div>
  </div>
);

const styles = () => ({
  grow: {
    flexGrow: 3,
  },
  headerBar: {
    color: '#8A95A7',
    width: '100%',
    height: '79px',
    margin: '0 auto',
    display: 'flex',
    position: 'fixed',
    minHeight: '79px',
    justifyContent: 'space-between',
    top: '0px',
    zIndex: '1201',
    background: '#ffffff',
  },
  nihLogoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icdcLogoContainer: {
    display: 'flex',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    paddingLeft: '24px',
    background: '#577C90',
  },
  nihLogoImg: {
    height: '33px',
    width: '269px',
    margin: '25px auto auto 35px',
  },
  icdcLogoImg: {
    margin: '22px 35px auto',
    height: '39px',
  },
});


Header.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Header);
