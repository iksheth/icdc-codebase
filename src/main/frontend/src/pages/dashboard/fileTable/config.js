/* eslint-disable */
export const Configuration={
"age":{ "label":"Age", "display":false ,"index":-1 },
"breed":{ "label":"Breed", "display":false,"index":-1 },
"case_id":{ "label":"Case ID","display":false,"customBodyRender":"","index":-1 },
"diagnosis":{ "label":"Diagnosis", "display":false,"index":-1 },
"disease_site":{ "label":"", "display":false,"index":-1 },
"file_description":{ "label":"Description", "display":true,"index": 5},
"file_format":{ "label":"Format", "display":true,"index": 4},
"file_locations":{ "label":"Locations", "display":true,"index":3 },
"file_name":{ "label": "File Name", "display":true,"index": 1},
"file_size":{ "label": "Size", "display":true,"index": 6},
"file_status":{ "label":"File Status", "display":true,"index": 7},
"file_type":{ "label": "File Type", "display":true,"index": 2},
"md5sum":{ "label": "MD5", "display":false,"index":-1 },
"neutered_status":{ "label":"Neutered Status", "display":false,"index":-1 },
"program":{ "label": "Program", "display":false,"index":-1 },
"sex":{ "label": "Sex", "display":false,"index":-1 },
"stage_of_disease":{ "label": "Stage of Disease", "display":false,"index":-1 },
"study_code":{ "label":"Study Code", "display":false,"index":-1 },
"study_type":{ "label":"Study Type", "display":false,"index":-1 },
"uuid":{ "label":"File UUID", "display":true, "isKey":true, "index": 8 },
};

export const DefaultColumns = [
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
    },
  ];