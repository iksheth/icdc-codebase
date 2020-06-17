/* eslint-disable */
import React, { useEffect } from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import View from './cartView';
import { initCart } from './cartState';
import { Typography } from '../../components/Wrappers/Wrappers';
import { FILE_QUERY } from '../../utils/graphqlQueries';

const cartController = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCart());
  }, []);

  const cart = useSelector((state) => state.cart);

  return (
    <Query query={FILE_QUERY} variables={{ uuids: cart.fileIDs }}>
      {({ data, loading, error }) => (
        loading ? <CircularProgress />
          : (
            error || !data
              ? <Typography variant="headline" color="error" size="sm">{error && `An error has occurred in loading CART : ${error}`}</Typography>
              : <View data={data.filesOfCases === null || data.filesOfCases === '' ? [] : data.filesOfCases} />
          )
      )}
    </Query>
  );
};


export default cartController;
