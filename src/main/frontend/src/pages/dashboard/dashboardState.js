import client from '../../utils/graphqlClient';
import { DASHBOARD_QUERY } from '../../utils/graphqlQueries';
import {
  getStatDataFromDashboardData,
  getSunburstDataFromDashboardData,
  getDonutDataFromDashboardData,
  filterData,
  getFilters,
  updateCheckBoxData,
  customCheckBox,
  formatFileSize,
} from '../../utils/dashboardUtilFunctions';

export const initialState = {
  dashboard: {
    isFetched: false,
    isLoading: false,
    error: '',
    hasError: false,
    stats: {},
    checkboxForAll: {
      data: [],
    },
    caseOverview: {
      data: [],
    },
    checkbox: {
      data: [],
    },
    datatable: {
      filters: [],
      data: [],
    },
    widgets: {},
  },
};

export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
export const RECEIVE_DASHBOARD = 'RECEIVE_DASHBOARD';
export const DASHBOARD_QUERY_ERR = 'DASHBOARD_QUERY_ERR';
export const READY_DASHBOARD = 'READY_DASHBOARD';
export const REQUEST_DASHBOARD = 'REQUEST_DASHBOARD';
export const SINGLE_CHECKBOX = 'SINGLE_CHECKBOX';
// Actions

export const toggleCheckBox = (payload) => ({
  type: TOGGLE_CHECKBOX,
  payload,
});

export const singleCheckBox = (payload) => ({
  type: SINGLE_CHECKBOX,
  payload,
});

function shouldFetchDataForDashboardDataTable(state) {
  return !(state.dashboard.isFetched);
}

function postRequestFetchDataDashboard() {
  return {
    type: REQUEST_DASHBOARD,
  };
}

function receiveDashboard(json) {
  return {
    type: RECEIVE_DASHBOARD,
    payload:
    {
      data: json.data,
    },
  };
}

function errorhandler(error, type) {
  return {
    type,
    error,
  };
}

function readyDashboard() {
  return {
    type: READY_DASHBOARD,
  };
}

// This need to go to dashboard controller

function fetchDashboard() {
  return (dispatch) => {
    dispatch(postRequestFetchDataDashboard());
    return client
      .query({
        query: DASHBOARD_QUERY,
      })
      .then((result) => dispatch(receiveDashboard(result)))
      .catch((error) => dispatch(errorhandler(error, DASHBOARD_QUERY_ERR)));
  };
}

export function fetchDataForDashboardDataTable() {
  return (dispatch, getState) => {
    if (shouldFetchDataForDashboardDataTable(getState())) {
      return dispatch(fetchDashboard());
    }
    return dispatch(readyDashboard());
  };
}

// End of actions
export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case SINGLE_CHECKBOX: {
      const dataTableFilters = action.payload;
      const tableData = state.caseOverview.data.filter((d) => (filterData(d, dataTableFilters)));
      const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
        ? updateCheckBoxData(
          state.caseOverview.data,
          state.checkboxForAll.data,
          state.checkbox.data.filter((d) => action.payload[0].groupName === d.groupName)[0],
          dataTableFilters,
        )
        : state.checkboxForAll.data;
      return {
        ...state,
        stats: {
          numberOfStudies: getStatDataFromDashboardData(tableData, 'study', dataTableFilters),
          numberOfCases: getStatDataFromDashboardData(tableData, 'case', dataTableFilters),
          numberOfSamples: getStatDataFromDashboardData(tableData, 'sample', dataTableFilters),
          numberOfFiles: getStatDataFromDashboardData(tableData, 'file', dataTableFilters),
          numberOfAliquots: getStatDataFromDashboardData(tableData, 'aliquot', dataTableFilters),
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
          studiesByProgram: getSunburstDataFromDashboardData(tableData),
          caseCountByBreed: getDonutDataFromDashboardData(tableData, 'breed'),
          caseCountByDiagnosis: getDonutDataFromDashboardData(tableData, 'diagnosis'),
          caseCountByDiseaseSite: getDonutDataFromDashboardData(tableData, 'disease_site'),
          caseCountByGender: getDonutDataFromDashboardData(tableData, 'sex'),
          caseCountByStageOfDisease: getDonutDataFromDashboardData(tableData, 'stage_of_disease'),
        },
      };
    }
    // if checkbox status has been changed, dashboard data table need to be update as well.
    case TOGGLE_CHECKBOX: {
      const dataTableFilters = getFilters(state.datatable.filters, action.payload);
      const tableData = state.caseOverview.data.filter((d) => (filterData(d, dataTableFilters)));
      const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
        ? updateCheckBoxData(
          state.caseOverview.data,
          state.checkboxForAll.data,
          state.checkbox.data.filter((d) => action.payload[0].groupName === d.groupName)[0],
          dataTableFilters,
        )
        : state.checkboxForAll.data;
      return {
        ...state,
        stats: {
          numberOfStudies: getStatDataFromDashboardData(tableData, 'study', dataTableFilters),
          numberOfCases: getStatDataFromDashboardData(tableData, 'case', dataTableFilters),
          numberOfSamples: getStatDataFromDashboardData(tableData, 'sample', dataTableFilters),
          numberOfFiles: getStatDataFromDashboardData(tableData, 'file', dataTableFilters),
          numberOfAliquots: getStatDataFromDashboardData(tableData, 'aliquot', dataTableFilters),
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
          studiesByProgram: getSunburstDataFromDashboardData(tableData),
          caseCountByBreed: getDonutDataFromDashboardData(tableData, 'breed'),
          caseCountByDiagnosis: getDonutDataFromDashboardData(tableData, 'diagnosis'),
          caseCountByDiseaseSite: getDonutDataFromDashboardData(tableData, 'disease_site'),
          caseCountByGender: getDonutDataFromDashboardData(tableData, 'sex'),
          caseCountByStageOfDisease: getDonutDataFromDashboardData(tableData, 'stage_of_disease'),
        },
      };
    }
    case RECEIVE_DASHBOARD: {
      // get action data
      const rawData = action.payload.data.caseOverview;

      // transform data
      // eslint-disable-next-line no-param-reassign
      action.payload.data.caseOverview = rawData.map((rowData) => {
        // deep copy obj
        const d = JSON.parse(JSON.stringify(rowData));
        // 1. transform file size's format
        if (d.files) {
          d.files.map((f) => {
            const customFile = f;
            customFile.file_size = formatFileSize(customFile.file_size);
            return customFile;
          });
        }
        // 2. add cases id into diagnosis_obj
        if (d.diagnosis_obj) {
          if (d.diagnosis_obj.best_response) {
            d.best_response = d.diagnosis_obj.best_response;
          } else {
            d.best_response = '';
          }
        }
        return d;
      });

      action.payload.data.study.forEach((d) => {
        if (d.files.length > 0) {
          action.payload.data.caseOverview.push({
            program: d.program.program_acronym,
            study_type: d.clinical_study_type,
            study_code: d.clinical_study_designation,
            files: d.files.map((f) => {
              const tmpF = f;
              tmpF.parent = 'study';
              tmpF.file_size = formatFileSize(tmpF.file_size);
              return tmpF;
            }),
          });
        }
      });

      const checkboxData = customCheckBox(action.payload.data);

      return action.payload.data
        ? {
          ...state.dashboard,
          isFetched: true,
          isLoading: false,
          hasError: false,
          error: '',
          stats: {
            numberOfStudies: getStatDataFromDashboardData(action.payload.data.caseOverview, 'study', []),
            numberOfCases: getStatDataFromDashboardData(action.payload.data.caseOverview, 'case', []),
            numberOfSamples: getStatDataFromDashboardData(action.payload.data.caseOverview, 'sample', []),
            numberOfFiles: getStatDataFromDashboardData(action.payload.data.caseOverview, 'file', []),
            numberOfAliquots: getStatDataFromDashboardData(action.payload.data.caseOverview, 'aliquot', []),
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
            studiesByProgram: getSunburstDataFromDashboardData(action.payload.data.caseOverview),
            caseCountByBreed: getDonutDataFromDashboardData(action.payload.data.caseOverview, 'breed'),
            caseCountByDiagnosis: getDonutDataFromDashboardData(action.payload.data.caseOverview, 'diagnosis'),
            caseCountByDiseaseSite: getDonutDataFromDashboardData(action.payload.data.caseOverview, 'disease_site'),
            caseCountByGender: getDonutDataFromDashboardData(action.payload.data.caseOverview, 'sex'),
            caseCountByStageOfDisease: getDonutDataFromDashboardData(action.payload.data.caseOverview, 'stage_of_disease'),
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
