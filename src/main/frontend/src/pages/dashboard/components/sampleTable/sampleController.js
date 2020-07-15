import { useSelector } from 'react-redux';
import { filterData } from '../../../../utils/dashboardUtilFunctions';

const sampleController = () => {
// data from store
  const sampleData = useSelector((state) => (state.dashboard
&& state.dashboard.datatable
    ? state.dashboard.datatable : {}));

  const transform = (accumulator, currentValue) => {
    const caseAttrs = {};
    Object.keys(currentValue).forEach((key) => {
      if (key && !Array.isArray(currentValue[key])) {
        caseAttrs[key] = currentValue[key];
      }
    });
    if (currentValue.sample_list) {
      return accumulator.concat(currentValue.sample_list.map((f) => ({ ...f, ...caseAttrs })));
    }
    return accumulator;
  };
  const tableData = sampleData.data.reduce(transform, []);

  const sampleFilters = JSON.parse(JSON.stringify(sampleData)).filters
    .filter((f) => f.cata === 'sample')
    .map((f) => {
      const tmpF = f;
      tmpF.datafield = tmpF.datafield.includes('@') ? tmpF.datafield.split('@').pop() : tmpF.datafield;
      return tmpF;
    });

  const tableDataAfterFilter = tableData
    .filter((row) => filterData(row, sampleFilters))
    .filter((d) => {
      if (d.case_id) {
        return true;
      }
      return false;
    });

  return tableDataAfterFilter;
};

export default sampleController;
