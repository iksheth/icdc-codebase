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

 let tableDataAfterFilter = tableData.filter((row)=>{
    let flag = false;
    let filter1 = false;
    let filter1_flag = false;
    let filter2 = false;
    let filter2_flag =false;
    let filter3 = true;
    let filter3_flag =true;
    fileData.filters.forEach(f=>{
      if(f.groupName.includes("Associated File Type")){
          filter1 = true;
          let field = f.field;
          let value = f.name;
          if(row["file_type"] == value){
            filter1_flag = true;
          }
       }
       if(f.groupName.includes("Associated File Format")){
          filter2 = true;
          let field = f.field;
          let value = f.name;
          if(row["file_format"] == value){
            filter2_flag = true;
          }
       }
       // if(f.groupName.includes("Association")){
       //    filter3 = true;
       //    let field = f.datafield;
       //    let value = f.name;
       //    if(row["parent"] == value){
       //      filter3_flag = true;
       //    }
       // }
       
    })
    if(filter3){
          filter3 = filter3_flag;
       }else{
          filter3 = true;
       }
      
      if(filter2){
          filter2 = filter2_flag;
       }else{
          filter2 = true;
       }
      
      if(filter1){
          filter1 = filter1_flag;
       }else{
          filter1 = true;
       }
      
      if(filter3&filter2&filter1){
        flag=true;
      }
    if(fileData.filters.length==0){
      flag=true;
    }
    return flag;
    
  })

  return <FileView data={tableDataAfterFilter} />;
};

export default fileContainer;
