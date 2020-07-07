/* eslint-disable */
import { v1 as uuid } from 'uuid';

export const COLORS = [
  '#194563',
  '#39C0F0',
  '#fc4b5b',
  '#2b69a3',
  '#287d6d',
  '#af66ff',
];


const NOT_PROVIDED = 'Not Specified';

export const mappingCheckBoxToDataTable = [
  {
    group: 'Program', field: 'program', api: 'caseCountByProgram', datafield: 'program', show: false,
  },
  {
    group: 'Study', field: 'study_code', api: 'caseCountByStudyCode', datafield: 'study_code', show: true,
  },
  {
    group: 'Study Type', field: 'study_type', api: 'caseCountByStudyType', datafield: 'study_type', show: true,
  },
  {
    group: 'Breed', field: 'breed', api: 'caseCountByBreed', datafield: 'breed', show: true,
  },
  {
    group: 'Diagnosis', field: 'diagnosis', api: 'caseCountByDiagnosis', datafield: 'diagnosis', show: true,
  },
  {
    group: 'Primary Disease Site', field: 'disease_site', api: 'caseCountByDiseaseSite', datafield: 'disease_site', show: true,
  },
  {
    group: 'Stage of Disease', field: 'stage_of_disease', api: 'caseCountByStageOfDisease', datafield: 'stage_of_disease', show: true,
  },
  {
    group: 'Response to Treatment', field: 'files@file_type', api: 'caseOverview', datafield: 'data_types', show: true,type: 2, key: 'uuid',
  },
  {
    group: 'Sex', field: 'gender', api: 'caseCountByGender', datafield: 'sex', show: true,
  },
  {
    group: 'Neutered Status', field:'neutered_status', api: 'caseOverview', datafield: 'file_formats', show: true, type: 2, key: 'case_id',
  },
  {
    group: 'Associated File Type', field: 'files@file_type', api: 'caseOverview', datafield: 'data_types', show: true,type: 2, key: 'uuid',
  },
  {
    group: 'Associated File Format', field: 'files@file_format', api: 'caseOverview', datafield: 'file_formats', show: true,type: 2, key: 'uuid',
  },
  {
    group: 'Associated Sample Type', field: 'sample_list@summarized_sample_type', api: 'caseOverview', datafield: 'file_formats', show: true, type: 2, key: 'sample_id',
  },

];

export const unselectFilters = (filtersObj) => filtersObj.map((filterElement) => ({
  groupName: filterElement.groupName,
  name: filterElement.name,
  datafield: filterElement.datafield,
  isChecked: false,
}));


export function getStatDataFromDashboardData(data, statName) {
  switch (statName) {
    case 'case':
      return data.length;
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
      colorIndex += 1;
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
    if (accumulator.has(currentValue[widgetName.toString()])) {
      accumulator.set(
        currentValue[widgetName.toString()],
        accumulator.get(currentValue[widgetName.toString()]) + 1,
      );
    } else {
      accumulator.set(currentValue[widgetName.toString()], 1);
    }
    return accumulator;
  }, new Map()).forEach((value, key) => { output.push({ item: key, cases: value }); });
  return output;
}


/* filterData function evaluates a row of data with filters,
      to check if this row will be showed in the data table.

     If no filter, then display this row.
     If has filters and for each group of filters, at least has one filter option
     is related to the data.
     Otherwise:  Hide this row.
  */
export const filterData = (row, filters) => {
  // No filter
  if (filters.length === 0) {
    return true;
  }
  // has filters
  const groups = {};

  filters.forEach((filter) => {
    if (groups[filter.groupName] && groups[filter.groupName] === true) {
      // do nothing
    } else if (row[filter.datafield]) { // check if data has this attribute
      // array includes
      const fName = (filter.name === NOT_PROVIDED ? '' : filter.name);
      if (Array.isArray(row[filter.datafield])) {
        if (row[filter.datafield].includes(fName)) {
          groups[filter.groupName] = true;
        } else {
          groups[filter.groupName] = false;
        }
      } else if (row[filter.datafield].toString() === fName) {
        groups[filter.groupName] = true;
      } else {
        groups[filter.groupName] = false;
      }
    } else if (filter.name === NOT_PROVIDED) {
      groups[filter.groupName] = true;
    } else {
      groups[filter.groupName] = false;
    }
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

// DFS search to get all the data for Checkbox
function DFSOfCheckBoxDataType2Input(data, fields) {
  const targetField = fields.shift();

  // leaf
  if (fields.length === 0) {
    return data;
  }
  // branches
  if (Array.isArray(data[targetField])) {
    // it is an array of object
    return data[targetField].reduce(
      (accumulator, currentValue) => {
        return accumulator.concat(DFSOfCheckBoxDataType2Input(currentValue, [...fields]))
      },
      [],
    );
  }
  // if it is an Object
  return DFSOfCheckBoxDataType2Input(data[targetField], [...fields]);
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
    (accumulator, currentValue) => {
      return accumulator.concat(DFSOfCheckBoxDataType2Input(currentValue, [...hierarchy]))
    },
    [],
  );
  const tmpKeys = []; // Use for filter out duplicated records
  const dicResult = {};
  // count number;
  const targetField = hierarchy.pop();
  rawTargetObjs.forEach((currentValue) => {
    // return result in a single array
    if (!tmpKeys.includes(currentValue[key])) {
      tmpKeys.push(currentValue[key]);
      // count the number
      if (currentValue[targetField] in dicResult) {
        dicResult[currentValue[targetField]] += 1;
      } else {
        dicResult[currentValue[targetField]] = 1;
      }
    }
  });

  return Object.keys(dicResult).map((key) => ({
    name: key === '' || !key
      ? NOT_PROVIDED : key,
    isChecked: false,
    cases: dicResult[key],
  }));
}



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




export const getCheckBoxData = (data, allCheckBoxs, activeCheckBoxs, filters) => (
  // deep copy array
  JSON.parse(JSON.stringify(allCheckBoxs)).map((ck) => {
    const checkbox = ck;
    if (checkbox.groupName === activeCheckBoxs.groupName) {
      // overwrite with old checkbox
      checkbox.checkboxItems = JSON.parse(JSON.stringify(activeCheckBoxs.checkboxItems));
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
      checkbox.checkboxItems = checkbox.checkboxItems.map((el) => {
        const item = el;
        item.cases = 0;
        const filterWithOutCurrentCate = filters.filter(
          (f) => (f.groupName !== checkbox.groupName),
        );
        const subData = data.filter((d) => (filterData(d, filterWithOutCurrentCate)));
        subData.forEach((d) => {
          const fName = (item.name === NOT_PROVIDED ? '' : item.name);
          if (d[checkbox.datafield]) {
            if (Array.isArray(d[checkbox.datafield])) { // value in the array
              if (d[checkbox.datafield].includes(fName)) {
                item.cases += 1;
              }
            }
            if (d[checkbox.datafield] === fName) { // Str compare
              item.cases += 1;
            }
          } else if (item.name === NOT_PROVIDED) { // No such attribute
            item.cases += 1;
          }
        });
        item.isChecked = false;
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
    }))
  );
}
