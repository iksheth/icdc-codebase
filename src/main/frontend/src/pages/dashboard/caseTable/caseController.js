import React from 'react';
import { useSelector } from 'react-redux';
import CaseView from './caseView';

const caseContainer = () => {
// data from store
  const tableData = useSelector((state) => (state.dashboard
&& state.dashboard.datatable
&& state.dashboard.datatable.data
    ? state.dashboard.datatable.data : {}));

  return (
    <CaseView data={tableData.filter((d) => {
      if (d.case_id) {
        return true;
      }
      return false;
    })}
    />
  );
};

export default caseContainer;
