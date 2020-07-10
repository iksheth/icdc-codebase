export const Configuration = {
  case_id: {
    label: 'Case ID',
    display: true,
    index: 1,
  },

  breed: {
    label: 'Breed',
    display: true,
    index: 2,
  },

  diagnosis: {
    label: 'Diagnosis',
    display: true,
    index: 3,
  },

  file_name: {
    label: 'File Name',
    display: true,
    index: 4,
  },

  file_type: {
    label: 'File Type',
    display: true,
    index: 5,
  },

  parent: {
    label: 'Association',
    display: true,
    index: 6,
  },

  file_description: {
    label: 'Description',
    display: true,
    index: 7,
  },

  file_format: {
    label: 'Format',
    display: true,
    index: 8,
  },

  file_size: {
    label: 'Size',
    display: true,
    index: 9,
  },

  uuid: {
    label: 'File UUID',
    display: true,
    isKey: true,
    index: 0,

  },

};

export const DefaultColumns = [
  {
    name: 'case_id',
    label: 'Case ID',
  },
];
