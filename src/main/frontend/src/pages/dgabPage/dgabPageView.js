import React from 'react';
import { withStyles } from '@material-ui/core';
import { Typography } from '../../components/Wrappers/Wrappers';
import dataGovenanceImage from '../../assets/dataSubmission/governance.png';
import guidelinesDoc from '../../assets/dataSubmission/guidelines.docx';

const dgab = ({ classes }) => (
  <div className={classes.pageContainer}>
    <div className={classes.titleContainer}>
      <div className={classes.pageTitle}>Data Governance Advisory Board</div>
    </div>
    <div className={classes.paragraphContainer}>
      <Typography>
        <p>
            The Data Governance Advisory Board has provided
          {' '}
          <a download href={guidelinesDoc}>
              this
            {' '}
          </a>
            document outlining the ICDC data prioritization process during the
            prototype phase of the ICDC. As there is an ongoing refinement to
            the process, please continue to refer to the latest version for
            changes. Any questions may be addressed to:
          <a href="mailto:ICDCHelpDesk@mail.nih.gov" target="_top">
              ICDCHelpDesk@mail.nih.gov
          </a>
            .
        </p>
      </Typography>
      <Typography variant="h5" weight="bold">
          Data Governance Advisory Board:
      </Typography>
      <Typography>
        <p>
            Composed of 4 external members (from ICDC Steering Committee), 2 NIH
            members (1 of which is from CBIIT) and supported by FNL staff. The
            DGAB will be chaired by a non-NIH member of ICDC Steering Committee.
            The DGAB will meet at least quarterly to review and adjudicate on
            all open and complete requests. They will use documented evaluation
            criteria to determine if a request is approved or declined. The DGAB
            will also determine the evaluation criteria (which will include
            considering scientific value of data for the ICDC) and may adjust
            those criteria. The DGAB is also responsible for providing input on
            the development and maintenance of data life cycle considerations.
            The DGAB Chair will be responsible for ensuring each meeting has an
            agenda, defining if a quorum is present, confirming evaluation
            criteria are current, and ensuring discussions are unbiased. The
            DGAB Chair will also report to the ICDC Steering Committee the
            summary status of all data requests. Since the ICDC is a node in the
            Cancer Research Data Commons (CRDC) data requests may involve
            considering other CRDC components (for example, the CRDC-H data
            model or the Cancer Data Aggregator). The CBIIT representative will
            be responsible for representing CRDC considerations in discussing
            requests and in development and maintenance of any relevant
            evaluation criteria. DGAB meetings will not require in-person
            attendance. The DGAB may decide, from time-to-time, that
            reprioritization of studies is necessary and will suggest such
            changes to the SAC.
        </p>
        <p>Composition:</p>
        <ul>
          <li>a. Warren Kibbe - Chair</li>
          <li>b. Matthew Breen</li>
          <li>c. William Hendricks</li>
          <li>d. Roel Verhaak</li>
          <li>e. Greg Tawa (NIH)</li>
          <li>f. Erika Kim (CBIIT)</li>
        </ul>
      </Typography>
      <Typography variant="h5" weight="bold">
          NCI Senior Advisory Committee (SAC):
      </Typography>
      <Typography>
        <p>
            The NCI Senior Advisory Committee will serve as the final point of
            approval and prioritization for studies. They will also serve as the
            final deciding point of any re-prioritization that becomes
            necessary.
        </p>
        <p>Composition:</p>
        <ul>
          <li>a. Amy LeBlanc</li>
          <li>b. Connie Sommers</li>
          <li>c. Javed Kahn</li>
        </ul>
      </Typography>
      <Typography variant="h5" weight="bold">
          FNL Staff:
      </Typography>
      <Typography>
        <p>
            FNL will manage the request process, ensure the evaluation criteria
            are made public and are current, ensure there is a tracking system,
            and monitor status for all requests. They will provide the DGAB
            reports on complete and open requests on a quarterly basis. They
            will document the data priority decisions made by the DGAB and
            provide those to the NCI. FNL staff will communicate NCI's inclusion
            decisions to the relevant stakeholders. FNL staff will also
            contribute to the generation of the evaluation criteria, contribute
            to development of data lifecycle policy, track any data lifecycle
            parameters assigned to a set of data, and provide summary data on
            requests and data life cycle status. The FNL staff will provide
            logistics support for the DGAB review sessions, including setting up
            meetings and ensuring all data priority decisions are documented.
          {' '}
        </p>
        <p>Contact:</p>
        <ul>
          <li>a. Matthew Beyers</li>
        </ul>
      </Typography>
      <p />
      <img
        src={dataGovenanceImage}
        alt="dataGovenanceAdvisoryBoardProcessImage"
      />
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

export default withStyles(styles, { withTheme: true })(dgab);
