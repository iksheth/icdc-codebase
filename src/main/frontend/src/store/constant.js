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
  {
    group: 'Program', field: 'program', api: 'caseCountByProgram', datafield: 'program',
  },
  {
    group: 'Study', field: 'study_code', api: 'caseCountByStudyCode', datafield: 'study_code',
  },
  {
    group: 'Study Type', field: 'study_type', api: 'caseCountByStudyType', datafield: 'study_type',
  },
  {
    group: 'Breeds', field: 'breed', api: 'caseCountByBreed', datafield: 'breed',
  },
  {
    group: 'Diagnosis', field: 'diagnosis', api: 'caseCountByDiagnosis', datafield: 'diagnosis',
  },
  {
    group: 'Primary Disease Site', field: 'disease_site', api: 'caseCountByDiseaseSite', datafield: 'disease_site',
  },
  {
    group: 'Tumor Stage', field: 'stage_of_disease', api: 'caseCountByStageOfDisease', datafield: 'stage_of_disease',
  },
  {
    group: 'Gender', field: 'gender', api: 'caseCountByGender', datafield: 'sex',
  },
  {
    group: 'Age', field: 'age', api: 'caseCountByAge', datafield: 'age',
  },
  {
    group: 'File Types', field: 'data_types', api: 'caseCountByDataType', datafield: 'data_types',
  },
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
