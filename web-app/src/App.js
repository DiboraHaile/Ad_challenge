import logo from './logo.svg';
import React, { Component, useEffect ,useState} from 'react'
import useFetch from "react-fetch-hook"
import SiteInfo from './components/SiteInfo' ;
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
                  data:{"ids":["hello"]},
                  selected_id: "",
                  top_sites_info: [],
                  };
    this.handleSelect = this.handleSelect.bind(this);
    // this.handleClick = this.handleClick.bind(this);
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
    <Router>
      <Switch>
          <Route path={'/'+e.target.value} children={<SiteInfo />} />
        </Switch>
      </Router>   
    console.log(e.target.value)
  }
  
  handleClick(e){
    async function fetching_data() {
      const response = await fetch("http://localhost:5000/site_info");
      const data = await response.json();
      return data;
    }
    fetching_data().then(data => {
      this.setState({
        top_sites_info: data["site"],
      })
    });
  }
      
  render(){
    const data = this.state.data
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
      </div>
      
        <button onClick={this.handleClick}> Get Information </button>

        <div>
          <ul>
          {this.state.top_sites_info.map(listitem => (<li key={listitem} className="list-group-item list-group-item-primary">{listitem}</li>))}
          </ul>
          
        </div>
      </div>
  
  );
  }
  
}
  



export default App;
