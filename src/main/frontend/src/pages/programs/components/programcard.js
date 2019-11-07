import React from 'react';
import { withStyles } from '@material-ui/core/';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';
import COP from '../../../assets/programCards/COP.png';
import NCATS from '../../../assets/programCards/NCATS.png';
import NIH from '../../../assets/programCards/NIH.png';
import { Typography, Button } from '../../../components/Wrappers/Wrappers';

const styles = (theme) => ({
  card: {
    maxWidth: 345,
    '& a': {
      color: theme.palette.text.link,
      textDecoration: 'none',
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardHeaderContainer: {
    padding: '16px',
    alignItems: 'center',
  },
});

const programCardFile = (programAcronym) => {
  switch (programAcronym) {
    case 'COP':
      return COP;
    case 'NCATS':
      return NCATS;
    default:
      return NIH;
  }
};

const ProgramCard = ({
  classes, data,
}) => (
  <Card className={classes.card}>
    <div className={classes.cardHeaderContainer}>
      <Typography weight="bold" size="l" color="warning">
        {data.program_acronym}
      </Typography>
      <Typography color="primary">{data.program_name}</Typography>
    </div>
    <CardMedia
      className={classes.media}
      image={programCardFile(data.program_acronym)}
      title={data.program_acronym}
    />
    <CardContent>
      <Typography component="p">{data.program_short_description}</Typography>
      <Typography>
        <a href={`https://${data.program_external_url}`} target="icdc">{data.program_external_url}</a>
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <Badge color="primary" badgeContent={data.studies.length}>
        <Button color="secondary"><Link to={`/program/${data.program_acronym}`}>Associated Studies>></Link></Button>
      </Badge>
    </CardActions>
  </Card>
);

export default withStyles(styles, { withTheme: true })(ProgramCard);
