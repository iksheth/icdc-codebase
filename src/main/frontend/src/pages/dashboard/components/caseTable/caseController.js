import { useSelector } from 'react-redux';

const caseController = () => {
// data from store
  const tableData = useSelector((state) => (state.dashboard
&& state.dashboard.datatable
&& state.dashboard.datatable.data
    ? state.dashboard.datatable.data : {}));

  return tableData.filter((d) => {
    if (d.case_id) {
      return true;
    }
    return false;
  });
};

export default caseController;
