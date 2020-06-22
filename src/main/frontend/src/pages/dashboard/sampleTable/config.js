/* eslint-disable */
export const Configuration={
"age":{ "label":"Age", "display":true, "index":-1 },
"breed":{ "label":"Breed", "display":true, "index":-1 },
"case_id":{ "label":"Case Id", "display":true, "index":2},
"date_of_sample_collection":{ "label":"date_of_sample_collection", "display":true, "index": 9},
"diagnosis":{ "label":"diagnosis", "display":true, "index":0 },
"disease_site":{ "label":"disease_site", "display":true, "index":3 },
"general_sample_pathology":{ "label":"general_sample_pathology", "display":true, "index":4},
"necropsy_sample":{ "label":"necropsy_sample", "display":true, "index":5 },
"neutered_status":{ "label":"neutered_status", "display":true, "index":6 },
"percentage_stroma":{ "label":"percentage_stroma", "display":true, "index":7 },
"program":{ "label":"program", "display":true, "index": 8},
"sample_id":{ "label":"sample_id", "display":true, "index": 1,"isKey":true,},
"sample_type":{ "label":"sample_type", "display":true, "index":10 },
"sex":{ "label":"sex", "display":true, "index":11 },
"stage_of_disease":{ "label":"stage_of_disease", "display":true, "index": 12},
"study_code":{ "label":"study_code", "display":false, "index":-1 },
"study_type":{ "label":"study_type", "display":false,  "index":-1 },
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
  ];