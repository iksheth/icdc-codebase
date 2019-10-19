import {
  dashboardState, mappingCheckBoxToDataTable, COLORS, NOT_PROVIDED,
} from '../constant';
import {
  TOGGLE_CHECKBOX,
  RECEIVE_DASHBOARD,
  DASHBOARD_QUERY_ERR,
  READY_DASHBOARD,
  REQUEST_DASHBOARD,
} from '../actionTypes';


const getStateFromDT = (data, cate) => {
  switch (cate) {
    case 'case':
      return data.length;
    case 'study':
      return [...new Set(data.map((d) => d.study_code))].length;
    case 'aliquot':
      return 0;
    case 'sample':
      return [...new Set(data.reduce((output, d) => output.concat(d.samples
        ? d.samples : []), []))].length;
    case 'file':
      return [...new Set(data.reduce((output, d) => output.concat(d.files
        ? d.files : []), []))].length;
    default:
      return 0;
  }
};


const getStudiesProgramWidgetFromDT = (data) => {
  // construct data tree
  const widgetData = [];
  let colorIndex = 0;
  data.forEach((d) => {
    let existProgram = false;
    let existStudy = false;
    widgetData.map((p) => {
      if (p.title === d.program) { // program exist
        existProgram = true;
        p.children.map((study) => {
          const s = study;
          if (s.title === d.study_code) { // study exist
            existStudy = true;
            s.size += 1;
          }
          return s;
        }); // end find study
        if (!existStudy) { // new study
          p.children.push({
            title: d.study_code,
            color: p.color,
            size: 1,
          });
        }
      }
      return p;
    }); // end find program

    if (!existProgram && !existStudy) {
      widgetData.push({
        title: d.program,
        color: COLORS[parseint(colorIndex)],
        children: [{
          title: d.study_code,
          color: COLORS[parseint(colorIndex)],
          size: 1,
        }],
      });
      colorIndex += 1;
    }
  }); // end foreach

  return ({
    title: 'root',
    color: COLORS[parseint(colorIndex)],
    children: widgetData,
  });
};


const getWidegtDataFromDT = (data, dtField) => {
  const output = [];
  data.reduce((accumulator, currentValue) => {
    if (accumulator.has(currentValue[dtField.toString()])) {
      accumulator.set(currentValue[dtField.toString()], accumulator.get(currentValue[dtField.toString()]) + 1);
    } else {
      accumulator.set(currentValue[dtField.toString()], 1);
    }
    return accumulator;
  }, new Map()).forEach((value, key) => { output.push({ item: key, cases: value }); });
  return output;
};


/* filterData function evaluates a row of data with filters,
    to check if this row will be showed in the data table.

   The rule for display is :
   If no filter, then display this row.
   If has filters and for each group of filters, at least has one filter option
   is related to the data.
   Otherwise:  Hide this row.
*/
const filterData = (row, filters) => {
  // No filter
  if (filters.length === 0) {
    return true;
  }
  // has filters
  const groups = {};

  filters.forEach((filter) => {
    if (groups[filter.groupName] && groups[filter.groupName] === true) {
      // do nothing
    } else if (row[filter.datafield]) { // check if data has this attribute
      // array includes
      if (Array.isArray(row[filter.datafield])) {
        if (row[filter.datafield].includes(filter.name)) {
          groups[filter.groupName] = true;
        } else {
          groups[filter.groupName] = false;
        }
      } else {
        // string eql
        const fName = (filter.name === NOT_PROVIDED ? '' : filter.name);
        if (row[filter.datafield].toString() === fName) {
          groups[filter.groupName] = true;
        } else {
          groups[filter.groupName] = false;
        }
      }
    } else if (filter.name === NOT_PROVIDED) {
      groups[filter.groupName] = true;
    } else {
      groups[filter.groupName] = false;
    }
  });
  if (Object.values(groups).includes(false)) {
    return false;
  }
  return true;
};


function getFilters(orginFilter, newCheckBoxs) {
  let ogFilter = orginFilter;
  newCheckBoxs.forEach((checkbox) => {
    let isExist = false;
    ogFilter = ogFilter.filter((filter) => {
      if (checkbox.groupName === filter.groupName && checkbox.name === filter.name) {
        isExist = true;
        return checkbox.isChecked;
      }
      return true;
    });
    if (!isExist && checkbox.isChecked) {
      ogFilter.push(checkbox);
    }
  });
  return ogFilter;
}


function updateCheckBoxData(data, field) {
  return data.map((el) => ({ name: el[field.toString()] === '' || !el[field.toString()] ? NOT_PROVIDED : el[field.toString()], isChecked: false, cases: el.cases }));
}

const getCheckBoxFromDT = (data, checkboxs, oldCheckBox) => (
// deep copy array
  JSON.parse(JSON.stringify(checkboxs)).map((ck) => {
    const checkbox = ck;
    if (checkbox.groupName === oldCheckBox.groupName) {
      // overwrite with old checkbox
      checkbox.checkboxItems = JSON.parse(JSON.stringify(oldCheckBox.checkboxItems));
    } else {
      checkbox.checkboxItems = checkbox.checkboxItems.map((el) => {
        const item = el;
        item.cases = 0;
        data.forEach((d) => {
          if (d[checkbox.datafield] === item.name) {
            item.cases += 1;
          }
        });
        return item;
      }).sort((a, b) => b.cases - a.cases);
    }

    return checkbox;
  })
);


function customCheckBox(data) {
  return (
    mappingCheckBoxToDataTable.map((mapping) => ({
      groupName: mapping.group,
      checkboxItems: updateCheckBoxData(data[mapping.api], mapping.field)
        .sort((a, b) => b.cases - a.cases),
      datafield: mapping.datafield,
    }))
  );
}


export default function dashboardReducer(state = dashboardState, action) {
  switch (action.type) {
    // if checkbox status has been changed, dashboard data table need to be update as well.
    case TOGGLE_CHECKBOX: {
      const dataTableFilters = getFilters(state.datatable.filters, action.payload);
      const tableData = state.caseOverview.data.filter((d) => (filterData(d, dataTableFilters)));
      const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
        ? getCheckBoxFromDT(tableData, state.checkboxForAll.data,
          state.checkbox.data.filter((d) => action.payload[0].groupName === d.groupName)[0])
        : state.checkboxForAll.data;
      return {
        ...state,
        state: {
          numberOfStudies: getStateFromDT(tableData, 'study'),
          numberOfCases: getStateFromDT(tableData, 'case'),
          numberOfSamples: getStateFromDT(tableData, 'sample'),
          numberOfFiles: getStateFromDT(tableData, 'file'),
          numberOfAliquots: getStateFromDT(tableData, 'aliquot'),
        },
        checkbox: {
          data: updatedCheckboxData,
        },
        datatable: {
          ...state.datatable,
          data: tableData,
          filters: dataTableFilters,
        },
        widgets: {
          studiesByProgram: getStudiesProgramWidgetFromDT(tableData),
          caseCountByBreed: getWidegtDataFromDT(tableData, 'breed'),
          caseCountByDiagnosis: getWidegtDataFromDT(tableData, 'diagnosis'),
          caseCountByDiseaseSite: getWidegtDataFromDT(tableData, 'disease_site'),
          caseCountByGender: getWidegtDataFromDT(tableData, 'sex'),
          caseCountByStageOfDisease: getWidegtDataFromDT(tableData, 'stage_of_disease'),
        },
      };
    }
    case RECEIVE_DASHBOARD: {
      // get action data
      const checkboxData = customCheckBox(action.payload.data);
      return action.payload.data
        ? {
          ...state.dashboard,
          isFetched: true,
          isLoading: false,
          hasError: false,
          error: '',
          state: {
            numberOfStudies: action.payload.data.numberOfStudies,
            numberOfCases: action.payload.data.numberOfCases,
            numberOfSamples: action.payload.data.numberOfSamples,
            numberOfFiles: action.payload.data.numberOfFiles,
            numberOfAliquots: action.payload.data.numberOfAliquots,
          },
          caseOverview: {
            data: action.payload.data.caseOverview,
          },
          checkboxForAll: {
            data: checkboxData,
          },
          checkbox: {
            data: checkboxData,
          },
          datatable: {
            data: action.payload.data.caseOverview,
            filters: [],
          },
          widgets: {
            studiesByProgram: getStudiesProgramWidgetFromDT(action.payload.data.caseOverview),
            caseCountByBreed: getWidegtDataFromDT(action.payload.data.caseOverview, 'breed'),
            caseCountByDiagnosis: getWidegtDataFromDT(action.payload.data.caseOverview, 'diagnosis'),
            caseCountByDiseaseSite: getWidegtDataFromDT(action.payload.data.caseOverview, 'disease_site'),
            caseCountByGender: getWidegtDataFromDT(action.payload.data.caseOverview, 'sex'),
            caseCountByStageOfDisease: getWidegtDataFromDT(action.payload.data.caseOverview, 'stage_of_disease'),
          },

        } : { ...state };
    }
    case DASHBOARD_QUERY_ERR:
      // get action data
      return {
        ...state,
        hasError: true,
        error: action.error,
        isLoading: false,
        isFetched: false,
      };
    case READY_DASHBOARD:
      return {
        ...state,
        isLoading: false,
        isFetched: true,
      };
    case REQUEST_DASHBOARD:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
