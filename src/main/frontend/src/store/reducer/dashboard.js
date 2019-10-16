/* eslint-disable */
import { dashboardState } from "../constant";
import { TOGGLE_CHECKBOX,RECEIVE_DASHBOARD,DASHBOARD_QUERY_ERR,} from "../actionTypes";

const NOT_PROVIDED = "Not Specified";

export default function dashboardReducer(state = dashboardState, action) {
  switch (action.type) {
    // if checkbox status has been changed, dashboard data table need to be update as well.
    case TOGGLE_CHECKBOX:
      let dataTableFilters = getFilters(state.datatable.filters,action.payload);
      let tableData = state.caseOverview.data.filter(d=> (dataFilter(d,dataTableFilters)));
      return {
        ...state,
           datatable:{
              ...state.datatable,
              data:tableData,
              filters:dataTableFilters,
           },
           widgets:{
              studiesByProgram:getStudiesByProgramFromDT(tableData),
              caseCountByBreed:getWidegtDataFromDT(tableData,'breed') ,
              caseCountByDiagnosis:getWidegtDataFromDT(tableData,'diagnosis') ,
              caseCountByDiseaseSite:getWidegtDataFromDT(tableData,'case_id'),
              caseCountByGender:getWidegtDataFromDT(tableData,'sex'),
              caseCountByStageOfDisease:getWidegtDataFromDT(tableData,'stage_of_disease'),
            }
      };
    case RECEIVE_DASHBOARD:
          // get action data
          return action.payload.data ?
           {
            ...state.dashboard,
            caseOverview:{
              data:action.payload.data.caseOverview,
            },
            checkbox :{
                isFetched:true,
                data:customCheckBox(action.payload.data),
            },
            datatable:{
               isFetched:true,
               data:action.payload.data.caseOverview,
               filters:[],
            },
            widgets:{
              studiesByProgram:getStudiesByProgramFromDT(action.payload.data.caseOverview),
              caseCountByBreed:getWidegtDataFromDT(action.payload.data.caseOverview,'breed') ,
              caseCountByDiagnosis:getWidegtDataFromDT(action.payload.data.caseOverview,'diagnosis') ,
              caseCountByDiseaseSite:getWidegtDataFromDT(action.payload.data.caseOverview,'case_id'),
              caseCountByGender:getWidegtDataFromDT(action.payload.data.caseOverview,'sex'),
              caseCountByStageOfDisease:getWidegtDataFromDT(action.payload.data.caseOverview,'stage_of_disease'),
                }

      } : {...state};

    case DASHBOARD_QUERY_ERR:
        // get action data
          console.log(action.payload.graphQLErrors);
          console.log(action.payload.networkError);
           return {...state};
    default:
      return state;
  }
}
const getStudiesByProgramFromDT =(data)=>{
  return [];
}
const getWidegtDataFromDT=(data,dtField)=>{
  const output = []; 
  Object.entries(data.reduce(function(accumulator, currentValue){
     accumulator[currentValue[dtField]]? accumulator[currentValue[dtField]] +=1 : accumulator[currentValue[dtField]]=1;
     return accumulator;
  },{})).forEach(([key, value]) => {output.push({item:key,cases:value})});

return output;
}


const dataFilter= (row,filters) => {
  if(filters.length===0){
    return true;
  };
  let display = false;
  filters.forEach(function(filer){
      if(filer.groupName === "Breeds"){
         if(row.breed===filer.name){
          return display = true 
        }
      }
    })
  return display ;
}



function getFilters(orginFilter,newCheckBoxs){
       newCheckBoxs.forEach(function(checkbox){
        let isExist = false;
         orginFilter = orginFilter.filter(function(filter){
            if(checkbox.groupName === filter.groupName && checkbox.name === filter.name ){
              isExist =true;
              if(!checkbox.isChecked){
                return false;
              }else{
                return true;
              }
            }else{
              return true;
            }
         })
        if(!isExist&&checkbox.isChecked){
          orginFilter.push(checkbox);
        }
       });
       return orginFilter;

}

function customCheckBox(data){
   return ([
             {
              groupName: 'Program',
              checkboxItems: [
                {
                  name: 'COP',
                  cases: 0 ,
                  isChecked :false,
                },
                {
                  name: 'NCATS',
                   cases: 0 ,
                  isChecked :false,
                },
              ],
            },
            {
              groupName: 'Study',
              checkboxItems: [
                {
                  name: 'COTC007B',
                   cases: 0 ,
                  isChecked :false,
                },
                {
                  name: 'NCATS01',
                   cases: 0 ,
                  isChecked :false,
                },
              ],
            },
            {
              groupName: 'Study Type',
              checkboxItems: [
                {
                  name: 'Clinical Trial',
                  cases: 0 ,
                  isChecked :false,
                },
                {
                  name: 'transcriptomics',
                   cases: 0 ,
                  isChecked :false,
                },
              ],
            },
               {
              groupName: 'Breeds',
              checkboxItems: data.caseCountByBreed.map(el => ({ name :el.breed === "" ? NOT_PROVIDED :el.breed, isChecked:false,cases:el.cases }) ),
              },
               {
              groupName: 'Diagnosis',
              checkboxItems: data.caseCountByDiagnosis.map(el => ({ name :el.diagnosis === "" ? NOT_PROVIDED : el.diagnosis, isChecked:false,cases:el.cases }) ),
              },
                {
              groupName: 'Primary Disease Site',
              checkboxItems: data.caseCountByDiseaseSite.map(el => ({ name :el.disease_site === "" ? NOT_PROVIDED :el.disease_site, isChecked:false,cases:el.cases }) ),
              },
               {
              groupName: 'Tumor Stage',
              checkboxItems: data.caseCountByStageOfDisease.map(el => ({ name :el.stage_of_disease === "" ?NOT_PROVIDED : el.stage_of_disease, isChecked:false,cases:el.cases }) ),
              },
              {
              groupName: 'Gender',
              checkboxItems: data.caseCountByGender.map(el => ({ name :el.gender === "" ? NOT_PROVIDED : el.gender, isChecked:false,cases:el.cases }) ),
              },
              {
                groupName: 'Age',
                checkboxItems: [
                  {
                    name: '1',
                  },
                  {
                    name: '2',
                  },
                  {
                    name: '3',
                  },
                  {
                    name: '4',
                  },
                ],
              },
               {
                  groupName: 'Data Types',
                  checkboxItems: [
                    {
                      name: 'Pathology Report',
                    },
                    {
                      name: 'Sequence File',
                    },
                  ],
                },
          ])

}
