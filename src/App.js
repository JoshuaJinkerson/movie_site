import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Banner from './Components/Banner/Banner';
import ResultList from './Components/ResultList/resultList';
import imdb from '../src/util/imdb_search'
import Detail from './Components/Details/Detail';

class App extends React.Component{
  constructor(props){
    super(props);
    this.search = this.search.bind(this);

    this.state=
    {
      SearchResults:[]
    }
  
  }
  
  search(value){    
    imdb.search(value).then(searchResults => {
      this.setState({SearchResults: searchResults});
    })
  }

  render(){
    return (
    <Router>
      <Banner onSearch={this.search} />
        <Switch>
                   
          <Route path="/resultlist">
            <div>
              <ResultList SearchResults={this.state.SearchResults}  />
            </div>
          </Route>
          <Route path="/movie/details/:id">
            <Detail/>
          </Route>
          <Route path="/actor/details/:id">
            <Detail/>
          </Route>
          <Route path="/"/> 
        </Switch>
    </Router>
      
  )};
}

export default App;
