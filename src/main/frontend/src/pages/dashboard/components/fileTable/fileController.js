import { useSelector } from 'react-redux';
import { filterData } from '../../../../utils/dashboardUtilFunctions';

const fileController = () => {
  // data from store
  const fileData = useSelector((state) => (state.dashboard
        && state.dashboard.datatable
    ? state.dashboard.datatable : {}));

  // combine case properties with files.
  const transform = (accumulator, currentValue) => {
    const caseAttrs = {};
    Object.keys(currentValue).forEach((key) => {
      if (key && !Array.isArray(currentValue[key])) {
        caseAttrs[key] = currentValue[key];
      }
    });
    if (currentValue.files) {
      return accumulator.concat(currentValue.files.map((f) => ({ ...f, ...caseAttrs })));
    }
    return accumulator;
  };

  const tableData = fileData.data.reduce(transform, []);

  // reduce duplicated records
  const result = [];
  const map = new Map();
  tableData.forEach((item) => {
    if (!map.has(item.uuid)) {
      map.set(item.uuid, true); // set any value to Map
      result.push(item);
    }
  });

  const filesFilters = JSON.parse(JSON.stringify(fileData)).filters
    .filter((f) => f.cata === 'file')
    .map((f) => {
      const tmpF = f;
      tmpF.datafield = tmpF.datafield.includes('@') ? tmpF.datafield.split('@').pop() : tmpF.datafield;
      return tmpF;
    });

  const tableDataAfterFilter = result.filter((row) => filterData(row, filesFilters));

  return tableDataAfterFilter;
};

export default fileController;
