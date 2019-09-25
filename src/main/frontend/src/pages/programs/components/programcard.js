import React from 'react';
import { withStyles } from '@material-ui/core/';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import cotcImg from '../../../assets/cotc.png';
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

const ProgramCard = ({
  classes, data,
}) => (
  <Card className={classes.card}>
    <div className={classes.cardHeaderContainer}>
      <Typography weight="bold" size="l" color="warning">
        {data.title}
      </Typography>
      <Typography color="primary">{data.subheader}</Typography>
    </div>
    <CardMedia className={classes.media} image={cotcImg} title="cotc" />
    <CardContent>
      <Typography component="p">{data.shortDesc}</Typography>
      <Typography>
        <a href="/" target="icdc">Read More >></a>
      </Typography>
      <Typography>
        <a href={data.link} target="icdc">{data.link}</a>
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <Button color="secondary">Associated Studies</Button>
    </CardActions>
  </Card>
);

export default withStyles(styles, { withTheme: true })(ProgramCard);
