import uuid from 'uuid';

export const COLORS = [
  '#523175',
  '#6e7ff5',
  '#fc4b5b',
  '#2b69a3',
  '#287d6d',
  '#af66ff',
];


const NOT_PROVIDED = 'Not Specified';

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
    group: 'Associated Files', field: 'data_type', api: 'caseCountByDataType', datafield: 'data_types',
  },
];


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
        ? d.files : []), []))].length;
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
        p.children.map((study) => {
          const s = study;
          if (s.title === d.study_code) { // study exist
            existStudy = true;
            s.size += 1;
          }
          return s;
        }); // end find study
        if (!existStudy) { // new study
          p.children.push({
            title: d.study_code,
            color: p.color,
            size: 1,
          });
        }
      }
      return p;
    }); // end find program

    if (!existProgram && !existStudy) {
      widgetData.push({
        title: d.program,
        color: COLORS[parseInt(colorIndex, 10)],
        children: [{
          title: d.study_code,
          color: COLORS[parseInt(colorIndex, 10)],
          size: 1,
        }],
      });
      colorIndex += 1;
    }
  }); // end foreach

  return ({
    key: uuid.v1(),
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

function sortCheckBox(a, b, flag) {
  if (flag === 'alphabetical') {
    if (b.name[0] > a.name[0]) { return -1; }
    if (b.name[0] === a.name[0]) { return b.name - a.name; }
    if (b.name[0] < a.name[0]) { return 1; }
  }
  return b.cases - a.cases;
}


export function updateCheckBoxData(data, field) {
  const result = [];
  let preElementIndex = 0;
  data.map((el) => ({
    name: el[field.toString()] === '' || !el[field.toString()]
      ? NOT_PROVIDED : el[field.toString()],
    isChecked: false,
    cases: el.cases,
  }))
    .sort((a, b) => sortCheckBox(a, b, 'alphabetical'))
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
          if (item.name === filter.name) {
            item.isChecked = filter.isChecked;
          }
        });
        return item;
      }).sort((a, b) => sortCheckBox(a, b, 'alphabetical'));
    }

    return checkbox;
  })
);


export function customCheckBox(data) {
  return (
    mappingCheckBoxToDataTable.map((mapping) => ({
      groupName: mapping.group,
      checkboxItems: updateCheckBoxData(data[mapping.api], mapping.field),
      datafield: mapping.datafield,
    }))
  );
}
