/* eslint-disable */
import { dashboardState ,mappingCheckBoxToDataTable,COLORS,NOT_PROVIDED} from '../constant';
import {
  TOGGLE_CHECKBOX,
  RECEIVE_DASHBOARD,
  DASHBOARD_QUERY_ERR,
  READY_DASHBOARD,
  REQUEST_DASHBOARD,
} from '../actionTypes';


const getStateFromDT = (data, cate) => {
  switch(cate) {
     case 'case':
      return data.length;
    case 'study':
      return [...new Set(data.map((d) => d.study_code))].length;
     case 'aliquot':
      return 0;
     case 'sample':
      return [...new Set(data.reduce((output, d) => output.concat(d.samples ? d.samples : []), []))].length;
     case 'file':
      return [...new Set(data.reduce((output, d) => output.concat(d.files ? d.files : []), []))].length;
    default:
      return 0;
  }
};


const getStudiesProgramWidgetFromDT = (data) => {
  //construct data tree
  let widgetData = [];
  let color_index = 0;
  data.forEach(function(d){
    let existProgram = false;
    let existStudy = false;
    widgetData.map(p=>{
          if(p.title === d.program){ // program exist 
             existProgram =true;
             p.children.map(s=>{
                if(s.title === d.study_code){ // study exist
                  existStudy=true;
                  s.size = s.size+1;
                }
             }) // end find study
            if(!existStudy){ // new study
              p.children.push({
                title:d.study_code,
                color:p.color,
                size:1,
              })
            }
          }
        })// end find program 

    if(!existProgram&&!existStudy){
      widgetData.push({
        title:d.program,
        color:COLORS[color_index],
        children:[{
          title:d.study_code,
          color:COLORS[color_index],
          size:1,
        }],
      })
      color_index+=1;
    }
  });// end foreach

  return ({
    title:"root",
    color:COLORS[color_index],
    children:widgetData,
  });
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



const filterData = (row, filters) => {
  if (filters.length === 0) {
    return true;
  }
  let display = false;

  filters.forEach((filter) => {
    mappingCheckBoxToDataTable.forEach((mapping) => {
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


function updateCheckBoxData(data,field){
  return data.map((el) => ({ name: el[field] === ''|| ! el[field] ? NOT_PROVIDED : el[field], isChecked: false, cases: el.cases }));
}

const getCheckBoxFromDT =(data,newcheckboxs)=>{
  // deep copy array
  return JSON.parse(JSON.stringify(newcheckboxs)).map(checkbox=>
    {
        checkbox["checkboxItems"].map(item =>{
            data.forEach(function(d){
              if(d[checkbox["datafield"]] === item["name"]){
                  item["cases"]-=1;
              };
            });
            return item;
       })
        return checkbox;
  })
}

function customCheckBox(data) {
  return (
    mappingCheckBoxToDataTable.map(mapping=>(
    {
       groupName: mapping.group,
       checkboxItems: updateCheckBoxData(data[mapping.api].sort(),mapping.field),
       datafield:mapping.field,
    }))
  );
}


export default function dashboardReducer(state = dashboardState, action) {
  switch (action.type) {
    // if checkbox status has been changed, dashboard data table need to be update as well.
    case TOGGLE_CHECKBOX: {
      const dataTableFilters = getFilters(state.datatable.filters, action.payload);
      const tableData = state.caseOverview.data.filter((d) => (filterData(d, dataTableFilters)));
      const updatedCheckboxData = dataTableFilters&&dataTableFilters.length!==0 ? getCheckBoxFromDT(tableData,state.checkboxForAll.data): state.checkboxForAll.data;
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
      const checkboxData =customCheckBox(action.payload.data);
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
          checkboxForAll:{
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
