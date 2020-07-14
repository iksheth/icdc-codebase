/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import FileView from './fileView';
import { filterData } from '../../../utils/dashboardUtilFunctions';

const fileController = () => {
  // data from store
  const fileData = useSelector((state) => (state.dashboard
        && state.dashboard.datatable
    ? state.dashboard.datatable : {}));

  // combine case properties with files.
  const transform = (accumulator, currentValue) => {
    const caseAttrs = {};
    const keys = Object.keys(currentValue);
    for (const key of keys) {
      if (!Array.isArray(currentValue[key])) {
        caseAttrs[key] = currentValue[key];
      }
    }
    if(currentValue.files){
        return accumulator.concat(currentValue.files.map((f) => ({ ...f, ...caseAttrs })));
      }else{
        return accumulator;
      }
  };

  const tableData = fileData.data.reduce(transform, []);

  // reduce duplicated records
  const result = [];
  const map = new Map();
  for (const item of tableData) {
    if (!map.has(item.uuid)) {
      map.set(item.uuid, true); // set any value to Map
      result.push(item);
    }
  }

  const filesFilters = JSON.parse(JSON.stringify(fileData)).filters.filter((f) => f.cata === 'file').map((f) => {
    f.datafield = f.datafield.includes('@') ? f.datafield.split('@').pop() : f.datafield;
    return f;
  });


  const tableDataAfterFilter = result.filter((row) => filterData(row, filesFilters));


  return <FileView data={tableDataAfterFilter} />;
};

export default fileController;
