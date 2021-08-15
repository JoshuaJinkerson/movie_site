import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Banner from './Components/Banner/Banner';
import ResultList from './Components/ResultList/resultList';
import imdb from '../src/util/imdb_search'
import Detail from './Components/Details/Detail';
import ActorDetails from './Components/ActorDetails/ActorDetail';

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
          <div className="mainArea">
            <Switch>     
            <Route path="/resultlist">
                <ResultList SearchResults={this.state.SearchResults}  />
            </Route>
            <Route path="/movie/:id">
              <Detail/>
            </Route>
            <Route path="/actor/:id">
              <ActorDetails/>
            </Route>
            <Route path="/"/> 
          </Switch>
        </div>
      </Router>
      
  )};
}

export default App;
