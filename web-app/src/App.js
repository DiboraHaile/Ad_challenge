import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect ,useState} from 'react'
import { Switch, Route } from 'react-router-dom'
import Select from 'react-select'
import useFetch from "react-fetch-hook"







class App extends Component {
  constructor(props){
    super(props);
    this.state = {
                  data:{"ids":["hello"]},
                  selected_id: "",
                  top_sites_info: {},
                  };
    this.handleSelect = this.handleSelect.bind(this);
    this.selected_id = null
  }
  
  componentDidMount = async() => {  
      
      async function fetching_data() {
        const response = await fetch("http://localhost:5000");
        const data = await response.json();
        return data;
      }
      fetching_data().then(data => {
        this.setState({
          data: data,
        })
      });
    }

  handleSelect(e){
  fetch(`http://localhost:5000/campaign_id`,{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
    },
    body:JSON.stringify(e.target.value)
  })
  .then(response => response.json())
  .catch(error => console.log(error))
 
    async function fetching_data() {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      return data;
    }
    fetching_data().then(data => {
      this.setState({
        top_sites_info: data["top_sites"]
      })
    });
  }
  
    

  
  render(){
    const data = this.state.data
    const top_sites = this.state.top_sites_info
    const prepare_options =  function (){
    const options = []
      for (let i = 1; i <= data['ids'].length; i++) {
        options.push(<option key={data['ids'][i]} value={data['ids'][i]}>{data['ids'][i]}</option>);      
      }
      return options; 
    }

    
    
    
  
  return (
    
    <div className="App">
      <h2> Select Campaign from the following:</h2>
      <div>
      <select name ="SelectCaptionId" id ="SelectCaptionId" onChange={this.handleSelect}>
        {prepare_options()}
      </select>
      <div>
        {this.state.top_sites}
        </div>
      </div>
      
    
    </div>
  );
  }
  
}
  



export default App;
