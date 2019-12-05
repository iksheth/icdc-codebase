import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import nihLogo from '../../assets/header/icdc_nih_logo.svg';
// import icdcLogo from '../../assets/header/icdc_logo_white.svg';
import cancergraphic from '../../assets/header/Canine.png';


// import classes from '*.module.sass';

/**
 * Header
 */

const Header = ({ classes }) => (
  <div className={classes.headerBar}>
    <div className={classes.nihLogoContainer}>
      <Link to="/home">
        <img
          className={classes.nihLogoImg}
          src={nihLogo}
          alt="NCI ICDC Logo - Integrated Canine Data Commons"
        />
      </Link>
      {/* <img
        src={cancergraphic}
        alt="cancer_graphic"
      /> */}
    </div>
    <div className={classes.icdcLogoContainer}>
      <div className={classes.grow} />
      <img
        src={cancergraphic}
        alt="cancer_graphic"
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
    // background: '#577C90',
  },
  nihLogoImg: {
    height: '54px',
    width: '463px',
    marginLeft: '35px',
    cursor: 'pointer',
  },
  icdcLogoImg: {
    margin: '22px 35px auto',
    height: '39px',
    cursor: 'pointer',
  },
});


Header.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Header);
