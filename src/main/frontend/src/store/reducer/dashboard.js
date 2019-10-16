/* eslint-disable */
import { dashboardState } from '../constant';
import {
  TOGGLE_CHECKBOX,
  RECEIVE_DASHBOARD,
  DASHBOARD_QUERY_ERR,
  READY_DASHBOARD,
  REQUEST_DASHBOARD,
} from '../actionTypes';


const COLORS = [
  '#523175',
  '#6e7ff5',
  '#fc4b5b',
  '#2b69a3',
  '#287d6d',
  '#af66ff',
];


const NOT_PROVIDED = 'Not Specified';

const getStateFromDT = (data, cate) => {
  if (cate === 'case') {
    return data.length;
  }
  if (cate === 'study') {
    return [...new Set(data.map((d) => d.study_code))].length;
  }
  if (cate === 'aliquot') {
    return 0;
  }
  if (cate === 'sample') {
    return 0;
  }
  if (cate === 'file') {
    return 0;
  }
  return 0;
};
const getStudiesByProgramFromDT = (data) => {
  // construct data tree
  // let mapData = new Map();
  // let color_index = 0;
  // data.forEach(function(d){
  //    if(mapData.has(d.program)){ // has program 
  //       if(mapData.get(d.program).has(d.study_code)){ // has study
  //           mapData.get(d.program).set(d.study_code,
  //               mapData.get(d.program).get(d.study_code).children.push({
  //                 title:d.case_id,
  //                 color:mapData.get(d.program).get(d.study_code).color,
  //                 size:1,
  //               }))
  //       }else{ // new study
  //          mapData.get(d.program).set(d.study_code,{
  //           title:d.study_code,
  //           color:mapData.get(d.program).color,
  //           children:[
  //             {
  //               title:d.case_id,
  //               color:mapData.get(d.program).color,
  //               size:1,
  //             }
  //           ]
  //          }

  //       }
  //    }else{// new program
  //     mapData.set(d.program,new Map())

  //    }
  // });
  //convert map to object. 
   //return  Array.from(mapData.entries()).reduce((main, [key, value]) => ({...main, [key]: value}), {});
   return "";
};


const getWidegtDataFromDT = (data, dtField) => {
  const output = [];
  data.reduce((accumulator, currentValue) => {
    if (accumulator.has(currentValue[dtField])) {
      accumulator.set(currentValue[dtField], accumulator.get(currentValue[dtField]) + 1);
    } else {
      accumulator.set(currentValue[dtField], 1);
    }
    return accumulator;
  }, new Map()).forEach((value, key) => { output.push({ item: key, cases: value }); });
  return output;
};


const dataFilter = (row, filters) => {
  if (filters.length === 0) {
    return true;
  }
  let display = false;
  const mappings = [
    { group: 'Program', field: 'program' },
    { group: 'Study', field: 'study_code' },
    { group: 'Study Type', field: 'study_type' },
    { group: 'Breeds', field: 'breed' },
    { group: 'Diagnosis', field: 'diagnosis' },
    { group: 'Primary Disease Site', field: 'disease_site' },
    { group: 'Tumor Stage', field: 'stage_of_disease' },
    { group: 'Gender', field: 'sex' },
    { group: 'Age', field: 'age' },
    { group: 'Data Types', field: 'data_types' },

  ];
  filters.forEach((filter) => {
    mappings.forEach((mapping) => {
      if (filter.groupName === mapping.group) {
        if (row[mapping.field]){
            // array includes
          if(Array.isArray(row[mapping.field])){
              if(row[mapping.field].includes(filter.name)){
                 display = true;
              }
          }else{
            // string eql 
            if(row[mapping.field].toString() === (filter.name === NOT_PROVIDED ? '' : filter.name)) {
            display = true;
          }
         }
        }
      }
    });
  });
  return display;
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

function customCheckBox(data) {
  return ([
    {
      groupName: 'Program',
      checkboxItems: data.caseCountByProgram.map((el) => ({ name: el.program === ''|| !el.program ? NOT_PROVIDED : el.program, isChecked: false, cases: el.cases })),

    },
    {
      groupName: 'Study',
      checkboxItems: data.caseCountByStudyCode.map((el) => ({ name: el.study_code === ''|| !el.study_code? NOT_PROVIDED : el.study_code, isChecked: false, cases: el.cases })),
    },
    {
      groupName: 'Study Type',
      checkboxItems: data.caseCountByStudyType.map((el) => ({ name: el.study_type === ''||!el.study_type ? NOT_PROVIDED : el.study_type, isChecked: false, cases: el.cases })),
    },
    {
      groupName: 'Breeds',
      checkboxItems: data.caseCountByBreed.map((el) => ({ name: el.breed === '' || !el.breed? NOT_PROVIDED : el.breed, isChecked: false, cases: el.cases })),
    },
    {
      groupName: 'Diagnosis',
      checkboxItems: data.caseCountByDiagnosis.map((el) => ({ name: el.diagnosis === '' || !el.diagnosis? NOT_PROVIDED : el.diagnosis, isChecked: false, cases: el.cases })),
    },
    {
      groupName: 'Primary Disease Site',
      checkboxItems: data.caseCountByDiseaseSite.map((el) => ({ name: el.disease_site === ''||!el.disease_site ? NOT_PROVIDED : el.disease_site, isChecked: false, cases: el.cases })),
    },
    {
      groupName: 'Tumor Stage',
      checkboxItems: data.caseCountByStageOfDisease.map((el) => ({ name: el.stage_of_disease === ''||!el.stage_of_disease ? NOT_PROVIDED : el.stage_of_disease, isChecked: false, cases: el.cases })),
    },
    {
      groupName: 'Gender',
      checkboxItems: data.caseCountByGender.map((el) => ({ name: el.gender === ''||!el.gender ? NOT_PROVIDED : el.gender, isChecked: false, cases: el.cases })),
    },
    {
      groupName: 'Age',
      checkboxItems: data.caseCountByAge.map((el) => ({ name: el.age === '' || !el.age ? NOT_PROVIDED : el.age, isChecked: false, cases: el.cases })),
    },
    {
      groupName: 'Data Types',
      checkboxItems: data.caseCountByDataType.map((el) => ({ name: el.data_type === ''||!el.data_type ? NOT_PROVIDED : el.data_type, isChecked: false, cases: el.cases })),
    },
  ]);
}


export default function dashboardReducer(state = dashboardState, action) {
  switch (action.type) {
    // if checkbox status has been changed, dashboard data table need to be update as well.
    case TOGGLE_CHECKBOX: {
      const dataTableFilters = getFilters(state.datatable.filters, action.payload);
      const tableData = state.caseOverview.data.filter((d) => (dataFilter(d, dataTableFilters)));
      return {
        ...state,
        state: {
          numberOfStudies: getStateFromDT(tableData, 'study'),
          numberOfCases: getStateFromDT(tableData, 'case'),
          numberOfSamples: getStateFromDT(tableData, 'sample'),
          numberOfFiles: getStateFromDT(tableData, 'file'),
          numberOfAliquots: getStateFromDT(tableData, 'aliquot'),
        },
        datatable: {
          ...state.datatable,
          data: tableData,
          filters: dataTableFilters,
        },
        widgets: {
          studiesByProgram: getStudiesByProgramFromDT([]),
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
          checkbox: {
            data: customCheckBox(action.payload.data),
          },
          datatable: {
            data: action.payload.data.caseOverview,
            filters: [],
          },
          widgets: {
            studiesByProgram: getStudiesByProgramFromDT(action.payload.data.caseOverview),
            caseCountByBreed: getWidegtDataFromDT(action.payload.data.caseOverview, 'breed'),
            caseCountByDiagnosis: getWidegtDataFromDT(action.payload.data.caseOverview, 'diagnosis'),
            caseCountByDiseaseSite: getWidegtDataFromDT(action.payload.data.caseOverview, 'disease_site'),
            caseCountByGender: getWidegtDataFromDT(action.payload.data.caseOverview, 'sex'),
            caseCountByStageOfDisease: getWidegtDataFromDT(action.payload.data.caseOverview, 'stage_of_disease'),
          },

        } : { ...state };
    }
    case DASHBOARD_QUERY_ERR: {
      // get action data
      return {
        ...state,
        hasError: true,
        error: action.error,
        isLoading: false,
        isFetched: false,
      };
    }
    case READY_DASHBOARD: {
      return {
        ...state,
        isLoading: false,
        isFetched: true,
      };
    }
    case REQUEST_DASHBOARD: {
      return { ...state, isLoading: true };
    }
    default: {
      return state;
    }
  }
}
