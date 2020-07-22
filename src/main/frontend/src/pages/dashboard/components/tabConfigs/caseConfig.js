/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

/*  To check if this row is selectable or not.
    I want the system to visually communicate ("flag") which of
    the samples being displayed have already had all of their files added to the cart.

    @param  data  row of data from sample tab
    @param  cartData, list of fileIDs
    @output  boolean true-> selectable
*/
export function CaseDisableRowSelection(data, cartData) {
  // if (cartData.length > 0) {
  //   if (data.files && data.files.length > 0) {
  //     // check each files of cases
  //     const isAllfileBeSelected = _.cloneDeep(data.files).map((f) => {
  //       if (cartData.includes(f.uuid)) {
  //         return true;
  //       }
  //       return false;
  //     });

  //     // if one/more file(s) is not included in the cart, this row is selectable
  //     if (isAllfileBeSelected.includes(false)) {
  //       return true;
  //     }
  //     return false;
  //   }
  //   return false;
  // }
  return true;
}
/* on row select event
    @param  data  data for initial the table  sample -> [files]
    @param  allRowsSelected : selected rows
    @output [f.uuid]
*/
export function CaseOnRowsSelect(data, allRowsSelected) {
  // use reduce to combine all the files' id into single array
  return allRowsSelected.reduce((accumulator, currentValue) => {
    const { files } = data[currentValue.dataIndex];
    // check if file
    if (files && files.length > 0) {
      return accumulator.concat(files.map((f) => f.uuid));
    }
    return accumulator;
  }, []);
}

const tableStyle = (ratio = 1) => ({
  width: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  overflow: 'hidden',
  wordBreak: 'break-word',
  maxWidth: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  minWidth: '160px',
}
);

export function CaseColumns(classes) {
  return ([
    {
      name: 'case_id',
      label: 'Case ID',
      options: {
        filter: false,
        sortDirection: 'asc',
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.8)}>
            {' '}
            <Link to={`/case/${value}`} className={classes.link}>{value}</Link>
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'study_code',
      label: 'Study Code',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.6)}>

            <Link to={`/study/${value}`} className={classes.link}>{value}</Link>

          </div>
        ),
      },
    },
    {
      name: 'study_type',
      label: 'Study Type',
      options: {
        filter: false,
        sortDirection: 'asc',
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(2.3)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'breed',
      label: 'Breed',
      options: {
        filter: false,
        sortDirection: 'asc',
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(1)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'diagnosis',
      label: 'Diagnosis',
      options: {
        filter: false,
        sortDirection: 'asc',
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(2)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'stage_of_disease',
      label: 'Stage of Disease',
      options: {
        filter: false,
        sortDirection: 'asc',
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.5)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'age',
      label: 'Age',
      options: {
        filter: false,
        sortDirection: 'asc',
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.5)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'sex',
      label: 'Sex',
      options: {
        filter: false,
        sortDirection: 'asc',
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.5)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'neutered_status',
      label: 'Neutered Status',
      options: {
        filter: false,
        sortDirection: 'asc',
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.8)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    }]);
}

export function CaseData() {
// data from store
  const tableData = useSelector((state) => (state.dashboard
&& state.dashboard.datatable
&& state.dashboard.datatable.data
    ? state.dashboard.datatable.data : {}));
  // filter out the records which case_id is null.  ->
  // this is for the study level file
  return tableData.filter((d) => {
    if (d.case_id) {
      return true;
    }
    return false;
  });
}
