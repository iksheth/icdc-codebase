/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import View from './sampleView';
import { filterData } from '../../../utils/dashboardUtilFunctions';


const fileContainer = () => {
// data from store
  const sampleData = useSelector((state) => (state.dashboard
&& state.dashboard.datatable
    ? state.dashboard.datatable : {}));

  const transform = (accumulator, currentValue) => {
    const caseAttrs = {};
    const keys = Object.keys(currentValue);
    for (const key of keys) {
      if (!Array.isArray(currentValue[key])) {
        caseAttrs[key] = currentValue[key];
      }
    }
    return accumulator.concat(currentValue.sample_list.map((f) => ({ ...f, ...caseAttrs })));
  };
  const tableData = sampleData.data.reduce(transform, []);

  const sampleFilters = JSON.parse(JSON.stringify(sampleData)).filters.filter((f) => f.cata === 'sample').map((f) => {
    f.datafield = f.datafield.includes('@') ? f.datafield.split('@').pop() : f.datafield;
    return f;
  });

  const tableDataAfterFilter = tableData.filter((row) => filterData(row, sampleFilters));

  return <View data={tableDataAfterFilter} />;
};

export default fileContainer;
