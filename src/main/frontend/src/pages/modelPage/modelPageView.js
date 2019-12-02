import React from 'react';
import {
  Button,
  withStyles,
  Link,
} from '@material-ui/core';

import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import icdcSchema from '../../assets/icdcSchema.svg';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/steeringCommittee.png';
import Body from '../../components/About/BodyView';


const limitToBounds = false;
const panningEnabled = true;
const transformEnabled = true;
const pinchEnabled = true;
const limitToWrapperBounds = false;
const disabled = false;
const dbClickEnabled = true;
const lockAxisX = false;
const lockAxisY = false;
const velocityEqualToMove = false;
const enableWheel = true;
const enableTouchPadPinch = true;
const enableVelocity = true;
const disableLimitsOnWheel = true;

const ModelPage = ({ classes }) => (
  <>
    <Stats />
    <Header title="Model Page" />
    <Body data={{
      img: l9dg,
      body: (
        <div className={classes.schema}>
          <p className={classes.title}>  ICDC Model</p>
The SVG graphic below represents the current ICDC data model consisting of data
nodes, node properties, and relationships (edges).   It provides a comprehensive
mapping of the system data, part of which may be viewed in the application interface
 and UI.   In other words, additional nodes and properties are available for
 inspection and querying beyond those presented on the front-end.
          <br />
          <br />
Additionally, the ICDC Data Model serves as a template for similar initiatives and
data structures, including graph-based database schemas.  The model will continue to
 evolve as data needs are further discerned.
          <br />
          <br />
The most current data model is available on Github at:
          <br />
          <Link href="https://cbiit.github.io/icdc-model-tool/" color="inherit" className={classes.link}>
            {' '}
https://cbiit.github.io/icdc-model-tool/
            {' '}
          </Link>
          <br />
          <br />
The tool used to generate this visual may be sourced on Github at:
          <br />
          <Link href="https://cbiit.github.io/icdc-model-tool/" color="inherit" className={classes.link}>
            {' '}
 https://github.com/CBIIT/icdc-model-tool
            {' '}
          </Link>
          <br />
          <br />
          <br />
          <TransformWrapper
            defaultScale={1}
            options={{ limitToBounds, transformEnabled, disabled }}
            pan={{
              disabled: !panningEnabled,
              limitToWrapperBounds,
              lockAxisX,
              lockAxisY,
              velocityEqualToMove,
              velocity: enableVelocity,
            }}
            pinch={{ disabled: !pinchEnabled }}
            doubleClick={{ disabled: !dbClickEnabled }}
            wheel={{
              wheelEnabled: enableWheel,
              touchPadEnabled: enableTouchPadPinch,
              disableLimitsOnWheel,
            }}
          >
            {({
              zoomIn,
              zoomOut,
              resetTransform,
            }) => (
              <div className={classes.container}>
                <div className={classes.tools}>
                  <Button variant="outlined" color="primary" className={classes.button} onClick={zoomIn}>
                    <ZoomInIcon />
                  </Button>
                  <Button variant="outlined" color="primary" className={classes.button} onClick={zoomOut}>
                    <ZoomOutIcon />
                  </Button>
                  <Button variant="outlined" color="primary" className={classes.button} onClick={resetTransform}>
                    <ZoomOutMapIcon />
                  </Button>
                </div>
                <div className={classes.imgSection}>
                  <TransformComponent>
                    <img src={icdcSchema} alt="ICDC schema" className={classes.img} />
                  </TransformComponent>
                </div>
              </div>
            )}
          </TransformWrapper>
        </div>),
    }}
    />
  </>
);

const styles = () => ({
  link: {
    color: '#0296C9',
    fontWeight: 'bolder',
    '&:hover': {
      color: '#0296C9',
      fontWeight: 'bolder',
      textDecoration: 'none',
    },
  },
  title: {
    color: '#0B3556',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  button: {
    margin: '10px 2px',
    background: '#0B3556',
    color: 'white',
    '&:hover': {
      background: '#0B3556',
      opacity: '0.8',
      color: 'white',
    },
  },
  container: {
    margin: 'auto 2px',

  },
  tool: {
    margin: '20px auto',
  },
  schema: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    width: '100%',
    margin: 'auto',

  },
  imgSection: {
    width: '100%',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    marginBottom: '20px',
  },
  img: {
    width: '100%',
    padding: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(ModelPage);
