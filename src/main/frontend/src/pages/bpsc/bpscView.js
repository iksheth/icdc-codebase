import React from 'react';
import { withStyles } from '@material-ui/core';
import { Typography } from '../../components/Wrappers/Wrappers';

const bpsc = ({ classes }) => (
  <div className={classes.pageContainer}>
    <div className={classes.titleContainer}>
      <div className={classes.pageTitle}>Best Practices SubCommittee</div>
    </div>
    <div className={classes.paragraphContainer}>
      <Typography>
        <p>
This Subcommittee identifies and recommends best practices for the ICDC.
These best practices streamline and harmonize data collection, standardize
data formats and platforms, and manage and annotate data (especially
clinical data). The ICDC prototype encompasses clinical, pathologic,
 genomic,biomarker and imaging data.
        </p>
      </Typography>
      <Typography>
        <p>
        The overall goal of the Best Practices SubCommittee (BPSC)
        is to streamline and standardize data collection and management
        for canine studies.  The BPSC examines past and planned
        studies and  recommends prospective standards for data
        collection and management including clinical,
        pathologic, and sequencing data.
        </p>
      </Typography>

      <Typography>

        <p>
           The BPSC is composed of the following members of the
           Integrated Canine Data Commons Steering Committee:
        </p>
        <ul>
          <li>Jeff Trent (Chair)</li>
          <li>Renee Chambers</li>
          <li>Dawn Duval</li>
          <li>Allison Heath</li>
          <li>Paula Jacobs</li>
          <li>Amy LeBlanc</li>
          <li>Elaine Ostrander</li>
          <li>Connie Sommers</li>
          <li>Shaying Zhou</li>
          <li>Debbie Knapp (Chair of ICDC SC, ex-officio to the BPSC)</li>
        </ul>
      </Typography>

      <Typography>
        <p>
        The following working groups were identified:
        </p>
        <ul>
          <li>Imaging WG: Paula Jacobs, Amy LeBlanc (bridge to clin/path WG)</li>
          <li>
            Clinical/pathologic standards WG: Renee Chambers
            (primary co-chair), Amy LeBlanc (bridge to imag. WG),
             Cheryl London (secondary co-chair),
             Deborah Knapp
          </li>
          <li>
Genomics WG: Dawn Duval, Allison Heath (co-chair), Elaine Ostrander, Shaying Zhou (co-chair)
          </li>
          <li>
Immunology: Toby Hecht, Cheryl London (primary co-chair), Deborah Knapp (secondary co-chair),
Connie Sommers, Shaying Zhao
          </li>
        </ul>
      </Typography>

      <Typography>
        <p>
The BPSC is supported by FNL staff as needed.  FNL contact is:&nbsp;
          <a href="mailto:ICDCHelpDesk@mail.nih.gov" target="_top">
              ICDCHelpDesk@mail.nih.gov
          </a>
.
        </p>
      </Typography>
      <p />
    </div>
  </div>
);

const styles = () => ({
  pageContainer: {
    margin: '0 auto',
    padding: '0px 16px',
    maxWidth: '1440px',
    minHeight: '160px',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  titleContainer: {
    marginBottom: '16px',
    textAlign: 'center',
    width: '100%',
  },
  pageTitle: {
    color: '#142A4E',
    fontSize: '2.8125rem',
    fontWeight: '400',
  },
  paragraphContainer: {
    margin: '16px auto',
    maxWidth: '900px',
  },
});

export default withStyles(styles, { withTheme: true })(bpsc);
