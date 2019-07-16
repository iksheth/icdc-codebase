import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Typography } from "../Wrappers/Wrappers";
import cn from '../../utils/classNameConcat';
import nciLogo from '../../assets/nci_logo.svg';


const Footer = ({ classes }) => (
    <footer className={classes.footerComponent}>
        <div className={classes.footerRow}>
            <div className={classes.footerRowSection}>
                <ul>
                    <li><Typography variant="h6" weight="medium" className={cn(classes.footerText, classes.listHeader)}>About ICDC</Typography></li>
                    <li><Typography className={classes.footerText}>ICDC Team</Typography></li>
                    <li><Typography className={classes.footerText}>ICDC Collaborators</Typography></li>
                    <li><Typography className={classes.footerText}>ICDC Policies</Typography></li>
                    <li><Typography className={classes.footerText}>ICDC FAQs</Typography></li>
                </ul>
            </div>
            <div className={classes.footerRowSection}>
                <ul>
                    <li><Typography variant="h6" weight="medium" className={cn(classes.footerText, classes.listHeader)}>About the Data</Typography></li>
                    <li><Typography className={classes.footerText}>Data Access Policies</Typography></li>
                    <li><Typography className={classes.footerText}>Documentation for Data Transfer</Typography></li>
                    <li><Typography className={classes.footerText}>Authentication and Saved Data Policy</Typography></li>
                </ul>
            </div>
            <div className={classes.footerRowSection}>
                <ul>
                    <li><Typography variant="h6" weight="medium" className={cn(classes.footerText, classes.listHeader)}>Data Submission</Typography></li>
                    <li><Typography className={classes.footerText}>Process and Tools</Typography></li>
                    <li><Typography className={classes.footerText}>Contacts</Typography></li>
                    <li><Typography className={classes.footerText}>Submission Guide</Typography></li>
                </ul>
            </div>
            <div className={classes.footerRowSection}>
                <ul>
                    <li><Typography variant="h6" weight="medium" className={cn(classes.footerText, classes.listHeader)}>APIs and Contacts</Typography></li>
                    <li><Typography className={classes.footerText}>API Usage for Developers</Typography></li>
                    <li><Typography className={classes.footerText}>Contact Us</Typography></li>
                    <li><Typography className={classes.footerText}>External Links</Typography></li>
                </ul>
            </div>
            <div className={cn(classes.footerRowSection, classes.footerNciColumn)}>
                <a href="https://www.cancer.gov/" target="icdc-nci" rel="nofollow">
                    <img className="nciBadge" src={nciLogo} alt="National Cancer Insistitute" />
                </a>
            </div>
        </div>
        <div className={cn(classes.contentJustifyCenter, classes.footerRow)}>
            <div className={cn(classes.nciLinks, classes.contentJustifyCenter)}>
                <Typography><a title="link to NCI Policies" href="http://www.cancer.gov/global/web/policies" target="icdc-nci">Policies<span className={classes.ext}>&nbsp;|&nbsp;</span></a></Typography>
                <Typography><a title="link to NCI Accessibility Policies" href="http://www.cancer.gov/global/web/policies/accessibility" target="icdc-nci">Accessibility<span className={classes.ext}>&nbsp;|&nbsp;</span></a></Typography>
                <Typography><a title="link to NCI Tools for Viewing Files" href="http://www.cancer.gov/global/viewing-files" target="icdc-nci">Viewing Files<span className={classes.ext}>&nbsp;|&nbsp;</span></a></Typography>
                <Typography><a title="link to FOIA" href="http://www.cancer.gov/global/web/policies/foia"  target="icdc-nci">FOIA</a></Typography>
            </div>
        </div>
        <div className={cn(classes.footerRow, classes.contentJustifyCenter)}>
        <div className={cn(classes.nciLinks, classes.contentJustifyCenter)}>
                <Typography><a href="https://www.hhs.gov" >U.S. Department of Health and Human Services<span className={classes.ext}>&nbsp;|&nbsp;</span></a></Typography>
                <Typography><a href="https://www.nih.gov" >National Institutes of Health<span className={classes.ext}>&nbsp;|&nbsp;</span></a></Typography>
                <Typography><a href="https://www.cancer.gov">National Cancer Institute<span className={classes.ext}>&nbsp;|&nbsp;</span></a></Typography>
                <Typography><a href="https://www.usa.gov" >USA.gov<span className={classes.ext} aria-label="(link is external)"></span></a></Typography>

            </div>
        </div>
        <div className={cn(classes.footerRow, classes.contentJustifyCenter)}>
        <div className={cn(classes.extraPadding, classes.nciLinks, classes.contentJustifyCenter)}>
                <Typography><span className={classes.turningNIH}>NIH … Turning Discovery Into Health<sup>®</sup></span></Typography>
            </div>
        </div>
      

    </footer>
);

const styles = (theme) => ({
    ext:{
        '@media (max-width: 600px)': {
            display: 'none'
        },
    },
    extraPadding:{
        marginTop: '20px',
        '@media (max-width: 600px)': {
            marginTop: '0px',
        },
    },
    footerText: {
        color: "white",
        marginLeft: theme.spacing.unit * 2.5,
        marginRight: theme.spacing.unit * 2.5,
        fontWeight: 500,
        lineHeight: '1.71',
        whiteSpace: "nowrap",
        [theme.breakpoints.down("xs")]: {
            fontSize: 12,
        }
    },
    nciLinks: {
        display: 'flex',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
            marginLeft: '20px'
        },
    },
    listHeader: {
        paddingBottom: '8px'
    },
    footerComponent: {
        lineHeight: '1.42857143',
        margin: '0',
        '-webkit-font-smoothing': 'antialiased',
        background: "#2e2a24",
        color: '#FFFFFF',
        marginTop: '24px',
        padding: '24px 16px 64px 24px',
        '& ul': {
            listStyle: 'none',
            margin: '0',
            padding: '0'
        },

        '& li': {
            lineHeight: '2.17'
        },

        /* Style a button like a link for accessibility */
        '& button': {
            background: 'none!important',
            color: 'inherit',
            border: 'none',
            padding: '0!important',
            font: 'inherit',
            cursor: 'pointer'
        },

        '& a, & button': {
            color: '#FFFFFF',
            textDecoration: 'none',

            '&:hover': {
                cursor: 'pointer',
                textDecoration: 'underline'
            }
        },
    },
    footerRow: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',

        '@media (min-width: 600px)': {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
    },
    footerRowSection: {
        marginTop: '16px'
    },
    turningNIH:{
        fontSize:'16px',
        color: '#FFFFFF',
        textDecoration: 'none',
    },
    footerNciColumn: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        '@media (max-width: 600px)': {
            marginLeft: '20px'
        },

        '@media (min-width: 600px)': {
            width: '200px'
        },

        '@media (min-width: 960px)': {
            width: '300px'
        },

        '& .nciBadge': {
            border: '0',
            height: '40px'
        },
    },

    footerBar: {
        color: '#FFFFFF',
        backgroundColor: '#4F536B',
        width: '100%',
        textAlign: 'center',
        '-webkit-font-smoothing': 'antialiased',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '14px',
        marginTop: '48px'
    },
    contentJustifyCenter:{
        justifyContent: 'center',
    },
});

Footer.propTypes = {
    hidden: PropTypes.bool,
};

Footer.defaultProps = {
    hidden: false
};

export default withStyles(styles)(Footer);
