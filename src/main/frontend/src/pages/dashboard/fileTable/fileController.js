/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import FileView from './fileView';


const fileContainer = () => {
  // data from store
  const fileData = useSelector((state) => (state.dashboard
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
  	return accumulator.concat(currentValue.files.map(f=>Object.assign({}, f, caseAttrs)));
	}
  let tableData = fileData.data.reduce(transform,[]);
  console.log(tableData);



  return <FileView data={tableData} />;
};

export default fileContainer;
