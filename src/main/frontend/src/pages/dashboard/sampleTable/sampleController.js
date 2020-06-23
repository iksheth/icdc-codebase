/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import View from './sampleView';


const fileContainer = () => {
  // data from store
  const sampleData = useSelector((state) => (state.dashboard
        && state.dashboard.datatable
    ? state.dashboard.datatable : {}));

  const transform =(accumulator, currentValue, currentIndex, array) =>{
  	// use configuration file ... TBD
  	var caseAttrs  =  {};
  	for (const key of Object.keys(currentValue) ){
  		if(!Array.isArray(currentValue[key])){
  			caseAttrs[key] = currentValue[key];
  		};
  	}
  	return accumulator.concat(currentValue.sample_list.map(f=>Object.assign({}, f, caseAttrs)));
	}
  const tableData = sampleData.data.reduce(transform,[]);


  
  let tableDataAfterFilter = tableData.filter((row)=>{
    let flag = true;
    sampleData.filters.forEach(f=>{
      if(f.datafield.includes("sample_list")){
          let field = f.datafield.split("@")[1];
          let value = f.name;
          if(row[field] != value){
            flag= false;
          }
       }
    })
    return flag;
    
  })
  return <View data={tableDataAfterFilter} />;
};

export default fileContainer;
