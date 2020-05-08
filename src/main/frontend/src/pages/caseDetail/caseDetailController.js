import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseDetailView from './caseDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_CASE_DETAIL_DATA_QUERY } from '../../utils/graphqlQueries';

import { initCart } from '../selectedCases/selectedCasesState';

const CaseDetailContainer = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCart());
  }, []);

  const cart = useSelector((state) => state.cart);
  const isSelectedInCart = cart && cart.cases && cart.cases.includes(match.params.id);

  return (
    <Query query={GET_CASE_DETAIL_DATA_QUERY} variables={{ case_id: match.params.id }}>
      {({ data, loading, error }) => (
        loading ? <CircularProgress />
          : (
            error || !data || data.case[0].case_id !== match.params.id ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
              : <CaseDetailView data={data} selected={isSelectedInCart} />
          )
      )}
    </Query>
  );
};

export default CaseDetailContainer;
