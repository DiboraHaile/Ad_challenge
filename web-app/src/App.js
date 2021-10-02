import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect } from 'react'
import Select from 'react-select'
import useFetch from "react-fetch-hook"







class App extends Component {
  constructor(props){
    super(props);
    this.state = {
                  data:{"ids":["hello"]},
                  };

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
  
  render(){

    const {data} = this.state
    const prepare_options =  function (){
    const options = []
      for (let i = 1; i <= data['ids'].length; i++) {
        var option = {}
        option['value'] = data['ids'][i];
        option['label'] = data['ids'][i];
        options.push(option)
        
      }

      return options; 
    }
 
    
  
  return (
    
    <div className="App">
      <h2> Select Campaign from the following:</h2>
      <div>
       
      { <Select options={prepare_options()} /> }

      </div>
      
    
    </div>
  );
  }
  
}
  



export default App;
