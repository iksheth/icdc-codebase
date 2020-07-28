import { v1 as uuid } from 'uuid';

const COLORS = [
  '#39C0F0',
  '#004CF3',
  '#FF7F15',
  '#4C3112',
  '#8DE260',
  '#437200',
];

export const NOT_PROVIDED = 'Not Specified';

export const mappingCheckBoxToDataTable = [
  {
    group: 'Program',
    field: 'program',
    api: 'caseOverview',
    datafield: 'program',
    show: false,
    section: 'case',

  },
  {
    group: 'Study',
    field: 'study_code',
    api: 'caseOverview',
    datafield: 'study_code',
    show: true,
    type: 2,
    key: 'case_id',
    section: 'case',

  },
  {
    group: 'Study Type',
    field: 'study_type',
    api: 'caseOverview',
    datafield: 'study_type',
    show: true,
    type: 2,
    key: 'case_id',
    section: 'case',

  },
  {
    group: 'Breed',
    field: 'breed',
    api: 'caseOverview',
    datafield: 'breed',
    show: true,
    type: 2,
    key: 'case_id',
    section: 'case',

  },
  {
    group: 'Diagnosis',
    field: 'diagnosis',
    api: 'caseOverview',
    datafield: 'diagnosis',
    show: true,
    type: 2,
    key: 'case_id',
    section: 'case',

  },
  {
    group: 'Primary Disease Site',
    field: 'disease_site',
    api: 'caseOverview',
    datafield: 'disease_site',
    show: true,
    type: 2,
    key: 'case_id',
    section: 'case',

  },
  {
    group: 'Stage of Disease',
    field: 'stage_of_disease',
    api: 'caseOverview',
    datafield: 'stage_of_disease',
    show: true,
    type: 2,
    key: 'case_id',
    section: 'case',

  },
  {
    group: 'Response to Treatment',
    field: 'best_response',
    api: 'caseOverview',
    datafield: 'best_response',
    show: true,
    type: 2,
    key: 'case_id',
    section: 'case',

  },
  {
    group: 'Sex',
    field: 'sex',
    api: 'caseOverview',
    datafield: 'sex',
    show: true,
    type: 2,
    key: 'case_id',
    section: 'case',

  },
  {
    group: 'Neutered Status',
    field: 'neutered_status',
    api: 'caseOverview',
    datafield: 'neutered_status',
    show: true,
    type: 2,
    key: 'case_id',
    section: 'case',

  },
  {
    group: 'Sample Type',
    field: 'sample_list@summarized_sample_type',
    api: 'caseOverview',
    datafield: 'sample_list@summarized_sample_type',
    show: true,
    type: 2,
    key: 'sample_id',
    section: 'sample',

  },
  {
    group: 'Sample Pathology',
    field: 'sample_list@specific_sample_pathology',
    api: 'caseOverview',
    datafield: 'sample_list@specific_sample_pathology',
    show: true,
    type: 2,
    key: 'sample_id',
    section: 'sample',

  },
  {
    group: 'File Association',
    field: 'files@parent',
    api: 'caseOverview',
    datafield: 'files@parent',
    show: true,
    type: 2,
    key: 'uuid',
    section: 'file',

  },
  {
    group: 'File Type',
    field: 'files@file_type',
    api: 'caseOverview',
    datafield: 'files@file_type',
    show: true,
    type: 2,
    key: 'uuid',
    section: 'file',

  },
  {
    group: 'File Format',
    field: 'files@file_format',
    api: 'caseOverview',
    datafield: 'files@file_format',
    show: true,
    type: 2,
    key: 'uuid',
    section: 'file',

  },

];

export const unselectFilters = (filtersObj) => filtersObj.map((filterElement) => ({
  groupName: filterElement.groupName,
  name: filterElement.name,
  datafield: filterElement.datafield,
  section: filterElement.section,
  isChecked: false,
}));

export function getStatDataFromDashboardData(data, statName) {
  switch (statName) {
    case 'case':
      return [...new Set(data.filter((d) => d.case_id).map((d) => d.case_id))].length;
    case 'study':
      return [...new Set(data.map((d) => d.study_code))].length;
    case 'aliquot':
      return 0;
    case 'sample':
      return [...new Set(data.reduce((output, d) => output.concat(d.samples
        ? d.samples : []), []))].length;
    case 'file':
      return [...new Set(data.reduce((output, d) => output.concat(d.files
        ? d.files : []), []).map((f) => f.uuid))].length;
    default:
      return 0;
  }
}

// getStudiesProgramWidgetFromDT

export function getSunburstDataFromDashboardData(data) {
  // construct data tree
  const widgetData = [];
  let colorIndex = 0;
  data.forEach((d) => {
    let existProgram = false;
    let existStudy = false;
    if (d.program && d.study_code) {
      widgetData.map((p) => {
        if (p.title === d.program) { // program exist
          existProgram = true;
          // eslint-disable-next-line no-param-reassign
          p.caseSize += 1;
          p.children.map((study) => {
            const s = study;
            if (s.title === `${d.program} : ${d.study_code}`) { // study exist
              existStudy = true;
              s.size += 1;
              s.caseSize += 1;
            }
            return s;
          }); // end find study
          if (!existStudy) { // new study
            colorIndex += 1;
            p.children.push({
              title: `${d.program} : ${d.study_code}`,
              color: p.color,
              size: 1,
              caseSize: 1,
            });
          }
        }
        return p;
      }); // end find program

      if (!existProgram && !existStudy) {
        widgetData.push({
          title: d.program,
          color: COLORS[parseInt(colorIndex, 10)],
          caseSize: 1,
          children: [{
            title: `${d.program} : ${d.study_code}`,
            color: COLORS[parseInt(colorIndex, 10)],
            size: 1,
            caseSize: 1,
          }],
        });
        colorIndex += 1;
      }
    }
  }); // end foreach

  return ({
    key: uuid(),
    title: 'root',
    color: COLORS[parseInt(colorIndex, 10)],
    children: widgetData,
  });
}

// getWidegtDataFromDT
export function getDonutDataFromDashboardData(data, widgetName) {
  const output = [];
  data.reduce((accumulator, currentValue) => {
    if (currentValue[widgetName.toString()]) {
      if (accumulator.has(currentValue[widgetName.toString()])) {
        accumulator.set(
          currentValue[widgetName.toString()],
          accumulator.get(currentValue[widgetName.toString()]) + 1,
        );
      } else {
        accumulator.set(currentValue[widgetName.toString()], 1);
      }
    }
    return accumulator;
  }, new Map()).forEach((value, key) => { output.push({ item: key, cases: value }); });
  return output;
}

// DFS search to get all the data for Checkbox
function DFSOfCheckBoxDataType2Input(data, fields) {
  const targetField = fields.shift();

  // leaf
  if (fields.length === 0) {
    return data;
  }
  // branches
  if (data[targetField]) {
    if (Array.isArray(data[targetField])) {
      // it is an array of object
      return data[targetField].reduce(
        (accumulator, currentValue) => accumulator.concat(
          DFSOfCheckBoxDataType2Input(currentValue, [...fields]),
        ),
        [],
      );
    }
    // if it is an Object
    return DFSOfCheckBoxDataType2Input(data[targetField], [...fields]);
  }
  return [];
}

/* filterData function evaluates a row of data with filters,
      to check if this row will be showed in the data table.

     If no filter, then display this row.
     If has filters and for each group of filters, at least has one filter option
     is related to the data.
     Otherwise:  Hide this row.

     @param row : a row of caseOverview, it contains all the data retrieved from backend
     @param filters : array of filter
              {
                datafield: "diagnosis"
                groupName: "Diagnosis"
                isChecked: true
                section:"section"
                name: "B Cell Lymphoma"
              }

              datafield may contains hierarchy info. eg. files@file_type

     @output : true -> display this row
               false-> hide
  */
export const filterData = (row, filters) => {
  // No filter
  if (filters.length === 0) {
    return true;
  }
  //  filters groups
  const groups = {};

  filters.forEach((filter) => {
    // skip if filter group has already satisfied.
    if (groups[filter.groupName] && groups[filter.groupName] === true) return;

    // convert name
    const fName = (filter.name === NOT_PROVIDED ? '' : filter.name);
    // DFS get a single array
    const filterOpts = filter.datafield.includes('@') ? filter.datafield.split('@') : [].concat(filter.datafield);

    const rawTargetObjs = [].concat(DFSOfCheckBoxDataType2Input(row, [...filterOpts]));

    const targetField = filterOpts.pop();

    groups[filter.groupName] = false;

    rawTargetObjs.forEach((r) => {
      if (r[targetField] === fName) {
        groups[filter.groupName] = true;
      }
    });
  });

  if (Object.values(groups).includes(false)) {
    return false;
  }
  return true;
};

export function getFilters(orginFilter, newCheckBoxs) {
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

export function customSorting(a, b, flag, i = 0) {
  if (flag === 'alphabetical') {
    if (b[i] && !a[i]) {
      return -1;
    }
    if (!b[i] && a[i]) {
      return 1;
    }
    if (b[i] > a[i]) { return -1; }
    if (b[i] < a[i]) { return 1; }
    if (b[i] === a[i]) {
      if (b[i] && a[i]) {
        return customSorting(a, b, flag, i + 1);
      }
      return 0;
    }
  }
  return -1;
}

/* Init check box stats data with Type2 input.
   This is not based on the cases but the data instead.

    @param  data  from API caseOverView, which is source of the data table in cases page
    @param  field : field for source2 will contain hierarchy info, such as samples@sample_type.
                  sample_type is under sample
    @output
          [{
                name: field,
                isChecked: false,
                cases: 123,
          }]
*/

function initCheckBoxDataWithType2Input(data, field, key) {
  const hierarchy = field.split('@');
  // DFS get a single array
  const rawTargetObjs = data.reduce(
    (accumulator, currentValue) => accumulator.concat(
      DFSOfCheckBoxDataType2Input(currentValue, [...hierarchy]),
    ),
    [],
  );
  const tmpKeys = []; // Use for filter out duplicated records
  const dicResult = {};
  // count number;
  const targetField = hierarchy.pop();
  rawTargetObjs.forEach((currentValue) => {
    const fieldData = currentValue[targetField] === '' || !currentValue[targetField]
      ? NOT_PROVIDED : currentValue[targetField];
    if (key) {
      if (currentValue[key] && !tmpKeys.includes(currentValue[key])) {
        tmpKeys.push(currentValue[key]);

        // count the number
        if (fieldData in dicResult) {
          dicResult[fieldData] += 1;
        } else {
          dicResult[fieldData] = 1;
        }
      }
    } else if (fieldData in dicResult) {
      dicResult[fieldData] += 1;
    } else if (fieldData) {
      dicResult[fieldData] = 1;
    }
  });

  return Object.keys(dicResult).map((dicResultKey) => ({
    name: dicResultKey,
    isChecked: false,
    cases: dicResult[dicResultKey],
  }));
}

/* Init check box stats data.

    @param  data : from API numberOfThings, data structures like:
                     {
                        cases:1
                        [field]:
                     }
    @param  field : this is paramter to find target data
    @output
          [{
                name: field,
                isChecked: false,
                cases: 123,
          }]

*/

function initCheckBoxDataWithType1Input(data, field) {
  const result = [];
  let preElementIndex = 0;
  data.map((el) => ({
    name: el[field.toString()] === '' || !el[field.toString()]
      ? NOT_PROVIDED : el[field.toString()],
    isChecked: false,
    cases: el.cases,
  }))
    .sort((a, b) => customSorting(a.name, b.name, 'alphabetical'))
    .forEach((el) => {
      // reduce the duplication
      if (result[parseInt(preElementIndex, 10)] && result[parseInt(preElementIndex, 10)].name) {
        if (result[parseInt(preElementIndex, 10)].name === el.name) {
          result[parseInt(preElementIndex, 10)].cases += el.cases;
        } else {
          preElementIndex += 1;
          result.push(el);
        }
      } else {
        result.push(el);
      }
    });

  return result;
}

/* Init check box stats data.

    @param  data : two data sources with differen data structures
            source1 from API numberOfThings, data structures like:
                     {
                        cases:1
                        [field]:
                     }
            source2 from API caseOverView, which is source of the data table in cases page.
            Requirement : index_key should place at 1st order. (sample id comes first)
    @param  field : this is paramter to find target data
                  field for source2 will contain hierarchy info, such as samples@sample_type.
                  sample_type is under sample
    @param  type: to distinguish the input.
                  default[undefined]: source1
                  1-> source1
                  2-> source2
    @output
          [{
                name: field,
                isChecked: false,
                cases: 123,
          }]

*/
export function initCheckBoxData(data, field, type, key) {
  if (type && type === 2) {
    return initCheckBoxDataWithType2Input(data, field, key);
  }
  return initCheckBoxDataWithType1Input(data, field);
}

// after the filtering, updateCheckBox stats
// @param data :  filtered caseOverview
// @param allCheckBoxes : All stated checkbox
// @param activeCheckBoxes:  filter Groups that has at least one filtering option is checked.
// @param filters : checked filtering options

export const updateCheckBoxData = (data, allCheckBoxes, activeCheckBoxes, filters) => (
  // deep copy array
  JSON.parse(JSON.stringify(allCheckBoxes)).map((ck) => {
    const checkbox = ck;
    if (checkbox.groupName === activeCheckBoxes.groupName) {
      // if current group is active group,
      // we update the filter options' status
      // overwrite with old checkbox
      checkbox.checkboxItems = JSON.parse(
        JSON.stringify(activeCheckBoxes.checkboxItems),
      );
      // update the checkbox items' status
      checkbox.checkboxItems = checkbox.checkboxItems.map((el) => {
        const item = el;
        item.isChecked = false;
        filters.forEach((filter) => {
          if (item.name === filter.name) {
            item.isChecked = filter.isChecked;
          }
        });
        return item;
      });
    } else {
      // get active filters without ones in the current filter group
      const filterWithOutCurrentCate = filters.filter(
        (f) => (f.groupName !== checkbox.groupName),
      );

      // filter data
      const subData = data.filter((d) => (filterData(d, filterWithOutCurrentCate)));

      // for the other groups
      checkbox.checkboxItems = checkbox.checkboxItems.map((el) => {
        const item = el;
        item.cases = 0;

        subData.forEach((d) => {
          const fName = (item.name === NOT_PROVIDED ? '' : item.name);

          // DFS get a single array
          const filterOpts = checkbox.datafield.includes('@') ? checkbox.datafield.split('@') : [].concat(checkbox.datafield);

          const rawTargetObjs = [].concat(DFSOfCheckBoxDataType2Input(d, [...filterOpts]));

          const targetField = filterOpts.pop();

          const tmpKeys = [];

          const { key } = targetField;

          rawTargetObjs.forEach((r) => {
            if (key) {
              if (!tmpKeys.includes(r[key])) {
                tmpKeys.push(r[key]);
                // count
                if (r[targetField]) {
                  if (checkbox.key in r && r[targetField] === fName) { // Str compare
                    item.cases += 1;
                  }
                } else if (checkbox.key in r && item.name === NOT_PROVIDED) { // No such attribute
                  item.cases += 1;
                }
              }
            } else if (checkbox.key in r && r[targetField]) {
              if (r[targetField] === fName) { // Str compare
                item.cases += 1;
              }
            } else if (checkbox.key in r && item.name === NOT_PROVIDED) { // No such attribute
              item.cases += 1;
            }
          });
        });
        item.isChecked = false;
        // update the check status
        filters.forEach((filter) => {
          if (checkbox.groupName === filter.groupName && item.name === filter.name) {
            item.isChecked = filter.isChecked;
          }
        });
        return item;
      }).sort((a, b) => customSorting(a.name, b.name, 'alphabetical'));
    }

    return checkbox;
  })
);

export function customCheckBox(data) {
  return (
    mappingCheckBoxToDataTable.map((mapping) => ({
      groupName: mapping.group,
      checkboxItems: initCheckBoxData(data[mapping.api], mapping.field, mapping.type, mapping.key),
      datafield: mapping.datafield,
      show: mapping.show,
      section: mapping.section,
      key: mapping.key,
    }))
  );
}

export function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / (1024 ** i)).toFixed(dm))} ${sizes[i]}`;
}
