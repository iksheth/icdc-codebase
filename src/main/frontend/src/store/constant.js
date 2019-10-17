export const dashboardState = {
  dashboard: {
    isFetched: false,
    isLoading: false,
    error: '',
    hasError: false,
    state: {},
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


export const mappingCheckBoxToDataTable = [
  { group: 'Program', field: 'program', api: 'caseCountByProgram' },
  { group: 'Study', field: 'study_code', api: 'caseCountByStudyCode' },
  { group: 'Study Type', field: 'study_type', api: 'caseCountByStudyType' },
  { group: 'Breeds', field: 'breed', api: 'caseCountByBreed' },
  { group: 'Diagnosis', field: 'diagnosis', api: 'caseCountByDiagnosis' },
  { group: 'Primary Disease Site', field: 'disease_site', api: 'caseCountByDiseaseSite' },
  { group: 'Tumor Stage', field: 'stage_of_disease', api: 'caseCountByStageOfDisease' },
  { group: 'Gender', field: 'sex', api: 'caseCountByGender' },
  { group: 'Age', field: 'age', api: 'caseCountByAge' },
  { group: 'File Types', field: 'data_types', api: 'caseCountByDataType' },
];


export const COLORS = [
  '#523175',
  '#6e7ff5',
  '#fc4b5b',
  '#2b69a3',
  '#287d6d',
  '#af66ff',
];


export const NOT_PROVIDED = 'Not Specified';
