import React from 'react';
import { withStyles } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/steeringCommittee.png';
import Body from '../../components/About/BodyView';

const SteeringCommitteeView = ({ classes }) => (
  <>
    <Stats />
    <Header title="Steering Committee" />
    <div className={classes.container}>
      <Body data={{
        img: l9dg,
        body: (
          <div>
            {' '}
The ICDC is community driven so is being built with input and collaboration from
 many groups to foster a diversity of ideas and to ensure needs are identified
 across the broad research community. To achieve this, the ICDC Steering Committee
 was formed to advise the NCI and FNLCR on the ICDC. The Steering Committee is
 composed of 11 members from the non-NIH research community, 7 from NCI, 1 from
  NHGRI and 1 from NCATS. There is also 1 observer from the NCI and 4 ex-officio
  members who are FNLCR staff. The chairperson is from the non-NIH research community.
            <br />
            <br />
The Steering Committee has two sub-committees; Data Governance Advisory Board
 (DGAB) and the Best Practices Sub-Committee (BPSC).
            <br />
            <br />
The DGAB consists of 4 external members (all from ICDC Steering Committee), 2
 NIH members (1 of which is from CBIIT) and is supported by FNLCR staff. When
 researchers request their data to be added to the ICDC to be  shared with the
 community, the role of the DGAB is to advise the NCI on the suitability of
 request. The NCI makes the final decision on the request. The DGAB is chaired
 by a non-NIH member of ICDC Steering Committee. The DGAB meets at least
 quarterly to review and prioritize all open and complete requests.
            <br />
            <br />
The BPSC consists of 7 external members (all from ICDC Steering Committee),
3 NCI staff, 1 NHGRI staff and is supported by FNLCR staff. The overall goal
of the BPSC is to streamline and standardize data collection and management
for canine studies. The BPSC examines past and planned studies and  recommends
  prospective standards for data collection and management in four main areas;
imaging, clinical/pathology, Immunology and genomic/sequencing data.
            <br />
            <br />
          </div>),
      }}
      />
    </div>
  </>
);

const styles = () => ({

  container: {
    maxWidth: '1400px',
    minHeight: '800px',
    margin: '16px 30px',
  },
});


export default withStyles(styles, { withTheme: true })(SteeringCommitteeView);
