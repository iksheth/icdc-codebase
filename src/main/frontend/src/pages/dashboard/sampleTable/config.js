/* eslint-disable */
export const Configuration={
"case_id":{ "label":"Case ID", "display":true, "index":1},
"breed":{ "label":"Breed", "display":true, "index":2 },
"diagnosis":{ "label":"diagnosis", "display":true, "index":3 },
"sample_id":{ "label":"Sample ID", "display":true, "index": 4,"isKey":true,},
"sample_site":{ "label":"Sample Site", "display":true, "index":5 },
"summarized_sample_type":{ "label":"Sample Type", "display":true, "index": 6},
"specific_sample_pathology":{ "label":"Pathology/Morphology", "display":true, "index":7 },
"tumor_grade":{ "label":"Tumor Grade", "display":true, "index":8},
"sample_chronology":{ "label":"Sample Chronology", "display":true, "index":9 },
"percentage_tumor":{ "label":"Percentage Tumor", "display":true, "index":10 },
"necropsy_sample":{ "label":"Necropsy Sample", "display":true, "index":11 },
"sample_preservation":{ "label":"Sample Preservation", "display":true, "index": 12},
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