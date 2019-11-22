import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import imgDogHuman from '../../assets/landing/l1.png';
import imgAbout from '../../assets/landing/l2.png';
import imgProgram from '../../assets/landing/l3.png';
import imgStudy from '../../assets/landing/l4.png';
import imgSubmit from '../../assets/landing/l5.png';
import icon from '../../assets/landing/l8.png';
import lbg from '../../assets/landing/lbg.jpg';
import l9dg from '../../assets/landing/l9dg.jpg';
import { Button } from '../../components/Wrappers/Wrappers';
import cn from '../../utils/classNameConcat';


const LandingController = ({ classes }) => (
  <div className={classes.page}>
    <div className={classes.container}>
      <Grid container spacing={16} direction="row" className={cn(classes.paddingTop50, classes.paddingBottom50)}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <div className={classes.headerTitle}>Integrated Canine Data Commons</div>
          <div className={classes.headerContent}>
Exploring. analyzing and understanding the biological relationships
between human and canine cancer.
          </div>
          <div className={classes.headerButtonSection}>
            <Button className={classes.headerButton}>
              {' '}
              <Link to="/" className={classes.headerLink}>explore</Link>
            </Button>
          </div>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <div>
            <img className={classes.imgDogHuman} src={imgDogHuman} alt="ICDC Human and dog " />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={16} direction="row">
        <div className={classes.contentLeft}>
          <div className={classes.about}>
            <div className={classes.image}>
              <img src={imgAbout} className={classes.aboutImage} alt="ICDC about" />
            </div>
            <div className={classes.aboutContent}>
  NCI's Division of Cancer Treatment and Diagnosis (DCTD) charged
  the Frederick National laboratory for Cancer Research
(FNLCR) to build the integrated Canine Data Commons(ICDC)
which is a cloud-based repository of canine cancer data and
was established to further research on human cancers by
enabling comparative analysis with canine cancer.
The data in the ICDC is sourced form multiple different
programs snad projects; all focused on the canine subjects.
            </div>
            <div className={classes.aboutButtonSection}>
              <div className={classes.aboutButtonLeft} />
              <div className={classes.aboutButtonRight}>
                <Link to="/" className={classes.aboutButton}>FULL ARTICLE</Link>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.contentRight}>
          <div className={classes.contentRightTop}>
            <div className={classes.program}>
              <div>
                <img className={classes.image} src={imgProgram} alt="ICDC program " />
              </div>
              <div className={classes.content}>
                <div className={classes.contentHeader}> Programs</div>
                <div className={classes.contentMessage}>Discover the programs in ICDC</div>

              </div>
              <div className={classes.blueButton}>
                <div className={classes.blueButtonLeft}>
                  <img className={classes.icon} src={icon} alt="ICDC about " />
                  {' '}
                </div>
                <div className={classes.blueButtonRight}>
                  <Link to="/" className={classes.blueButton}>READ MORE</Link>
                </div>
              </div>
            </div>
            <div className={classes.studies}>
              <div>
                <img className={classes.image} src={imgStudy} alt="ICDC studies " />
              </div>
              <div className={classes.content}>
                <div className={classes.contentHeader}> Studies</div>
                <div className={classes.contentMessage}>Browse the studies within ICDC</div>

              </div>
              <div className={classes.blueButton}>
                <div className={classes.blueButtonLeft}>
                  <img className={classes.icon} src={icon} alt="ICDC about " />
                  {' '}
                </div>
                <div className={classes.blueButtonRight}>
                  <Link to="/" className={classes.blueButton}>READ MORE</Link>
                </div>
              </div>
            </div>
            <div className={classes.submit}>
              <div>
                <img className={classes.image} src={imgSubmit} alt="ICDC submit " />
              </div>
              <div className={classes.content}>

                <div className={classes.contentHeader}> Submit Data</div>
                <div className={classes.contentMessage}>
Interested in contributing data to ICDC
                </div>

              </div>
              <div className={classes.blueButton}>
                <div className={classes.blueButtonLeft}>
                  <img className={classes.icon} src={icon} alt="ICDC about " />
                  {' '}
                </div>
                <div className={classes.blueButtonRight}>
                  <Link to="/" className={classes.blueButton}>READ MORE</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.contentRightBottom}>
            <div className={classes.cases}>
              <div className={classes.greyContentHeader}> Cases</div>
              <div className={classes.greyContent}>
Search all the Cases and build cohorts
form all the programs/Studies within the ICDC.
The data filtes from these cohorts can
then be analyzed in the Cloud Resources.
              </div>
              <div className={classes.greybuttonSection}>
                <div className={classes.blueButtonLeft}>
                  <img className={classes.greyIcon} src={icon} alt="ICDC about " />
                  {' '}
                </div>
                <div className={classes.blueButtonRight}>
                  <Link to="/" className={classes.greybutton}>READ MORE</Link>
                </div>
              </div>
            </div>
          </div>
        </div>


      </Grid>
    </div>
  </div>
);


const styles = (theme) => ({
  page: {
    background: '#5E8CA5',
  },
  container: {
    backgroundImage: `url(${lbg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    paddingTop: '10px',
    fontFamily: 'Raleway, sans-serif',
    paddingRight: '32px',
    width: '1200px',
    margin: 'auto',
    paddingLeft: '130px',
    paddingBottom: '90px',
  },
  headerTitle: {
    paddingBottom: '12px',
    width: '208px',
    color: '#FFFFFF',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '40px',
    fontWeight: 'bold',
    lineHeight: '40px',

  },
  headerContent: {
    height: '98px',
    width: '194px',
    color: '#F5A313',
    fontFamily: 'Raleway',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '22px',
    marginBottom: '40px',
  },
  headerButtonSection: {

  },
  icon: {
    width: '20px',
    marginTop: '15px',
    marginLeft: '14px',
  },
  headerButton: {
    borderRadius: '10px',
    width: '178px',
    height: '37px',
    lineHeight: '18px',
    fontSize: '14px',
    fontWeight: 'bolder',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#ff8a00',
    fontFamily: theme.custom.fontFamilySans,
    textDecoration: 'none',
    boxShadow: 'none !important',
    '&:hover': {
      backgroundColor: '#ff8a00',
      color: '#ffffff',

    },

  },

  headerLink: {
    color: '#ffffff',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#ff8a00',
      textDecoration: 'none',
    },
  },
  imgDogHuman: {
    width: '350px',
  },

  aboutImage: {
    height: '423px',
    width: '300px',
  },
  contentLeft: {
    float: 'left',
    paddingRight: '15px',

  },
  about: {
    width: '300px',
  },
  image: {
    width: '197px',
  },
  aboutContent: {
    background: '#fff',
    width: '300px',
    padding: '30px 30px 30px 30px',
    color: '#010101',
    fontFamily: '"Open Sans"',
    fontSize: '14px',
    lineHeight: '22px',
  },
  content: {
    width: '197px',
    background: '#fff',
    height: '120px',
  },
  contentHeader: {
    width: '144px',
    color: '#000000',
    fontFamily: 'Raleway',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '18px',
    margin: 'auto',
    padding: '15px 0',
  },
  contentMessage: {
    height: '33px',
    width: '125px',
    color: '#010101',
    fontFamily: '"Open Sans"',
    fontSize: '14px',
    lineHeight: '20px',
    marginLeft: '27px',
  },
  aboutButtonSection: {
    background: '#fff',
    height: '70px',
  },
  imgIconAbout: {
    width: '49px',
  },
  aboutButtonLeft: {
    float: 'left',
    background: '#F5A313',
    height: '45px',
    width: '48px',
  },
  aboutButtonRight: {
    background: '#A97212',
    float: 'left',
    height: '45px',
    width: '132px',
  },
  aboutButton: {
    color: '#ffffff',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '45px',
    paddingLeft: '20px',
    boxShadow: 'none',
  },
  contentRight: {

  },
  contentRightTop: {

  },
  program: {
    float: 'left',
    padding: '0 10px 10px 0px',
  },
  button: {

  },
  studies: {
    float: 'left',
    padding: '0 10px 10px 0px',
  },
  submit: {
    float: 'left',
    padding: '0 10px 10px 0px',
  },
  contentRightBottom: {
    float: 'left',
    width: '605px',
    background: '#fff',
    backgroundImage: `url(${l9dg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cases: {
    height: '442px',
    paddingLeft: '350px',
    paddingTop: '100px',
  },
  greybuttonSection: {
    height: '46px',
    width: '176px',
    opacity: '0.51',
    backgroundColor: '#4D4D4D',
    marginTop: '20px',

  },
  blueButton: {
    height: '45px',
    background: '#39C0F0',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',

  },
  blueButtonLeft: {
    float: 'left',
  },
  blueButtonRight: {
    float: 'left',
    lineHeight: '50px',
    color: '#fff',
  },
  greyContentHeader: {
    color: '#000000',
    fontFamily: 'Raleway',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '18px',
    padding: '15px 0',
  },
  greyContent: {
    height: '143px',
    width: '166px',
    color: '#010101',
    fontFamily: '"Open Sans"',
    fontSize: '14px',
    lineHeight: '22px',
  },
  greyIcon: {
    width: '20px',
    marginTop: '15px',
    marginLeft: '15px',
  },
  greybutton: {
    padding: '15px 5px 0 0',
    height: '9px',
    width: '71px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '19.31px',
    textDecoration: 'none',
    marginLeft: '8px',
    '&:hover': {
      color: '#ffffff',
    },
  },
  paddingBottom50: {
    paddingBottom: '50px',
  },
  paddingTop50: {
    paddingTop: '70px',
  },
});
export default withStyles(styles, { withTheme: true })(LandingController);
