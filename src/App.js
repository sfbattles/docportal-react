import React, { useState } from "react";
import "./App.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "bootstrap/dist/css/bootstrap.min.css";
import shortid from 'shortid';


const documentTypeOptions = [
  { value: "New Business", label: "📃 New Business",id: shortid.generate(),modelfield: "transaction_type"},
  { value: "Renewals", label: "📄 Renewals", id:shortid.generate(),modelfield: "transaction_type"},
  { value: "Endorsements", label: "📑 Endorsement" ,id:shortid.generate(),modelfield: "transaction_type"},
  { value: "Cancellation", label: "󠁿󠁿🚫 Cancellation" ,id:shortid.generate(),modelfield: "transaction_type"},
  { value: "Invoices", label: "󠁿󠁿📄 Invoices" ,id:shortid.generate(),modelfield: "transaction_type"}
];

function App() {
  const [docSearchTypeList, setDocumentSearchType] = useState([]);
  const [agentList, setAgentList] = useState()
  
  const searchFilter = [
    '__icontains[]=',
    '__gte',
    '__lte',
    '='
  ]
  let queryParams = "?"
  const buildSearchParam = () => {
    for (const [index, item] of docSearchTypeList.entries()) {
      if (index > 0)
        queryParams += '&' + item.modelfield + searchFilter[0] + item.value
      else
        queryParams += item.modelfield + searchFilter[0] + item.value
    }
    console.log("this is ",{queryParams})
  }

  function fetchPolicies(){
    const apiURL= 'http://django.scipsnet.com:8000/docportal'
    buildSearchParam()
    fetch(apiURL+queryParams)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
}

  function customTheme(theme) {
      return {
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "orange",
          primary: "green",
        },
      };
    } 

  const PrintState = () => {
    if (docSearchTypeList && docSearchTypeList.length) {
    const selectedDoctypes = docSearchTypeList.map((docItem) =>
      <li key={docItem.id}>{docItem.label}. {docItem.value}</li>)
      return (
        <ul>{selectedDoctypes}</ul>
      );
    }
    else {
      return (
        <p>"Please select Doc Type"</p>
      );
    }
  }


  return (
    <>
    <div className="row">
      <div className="col-md-8 mx-auto">
      <Select className="mt-4 col-md-8 col-offset-4" 
        onChange={setDocumentSearchType}
        placeholder="Select Policy Number"
        options={documentTypeOptions}
        components={makeAnimated()}
        isMulti
        isSearchable
        autoFocus
        value={docSearchTypeList}
        noOptionsMessage={() => "No Other Document Type"}
        theme={customTheme}
      />
        <Select className="mt-4 col-md-8 col-offset-4" 
          onChange={setDocumentSearchType}
          placeholder="Select Document Type"
          options={documentTypeOptions}
          components={makeAnimated()}
          isMulti
          isSearchable
          autoFocus
          value={docSearchTypeList}
          noOptionsMessage={() => "No Other Document Type"}
          theme={customTheme}
        />
        <div className="mb-4"></div>
        <PrintState/>
        <div className="col-md-8 mx-auto">
          <button className="btn btn-primay col-md-4" onClick={fetchPolicies}>Search for Policies</button>
        </div>
      </div>    
    </div>
    </>  
  );
}

export default App;
