import React from 'react'

import './Results.css'

import { Link } from 'react-router-dom'
import details from '../../util/get_details'

const Results = (props) => {    
    // const [searchResults, setSearchResults] = useState(props)
    
    const getDetails = (e) => {   
        console.log(e) 
        const value = e.split('/')[2]
        console.log(value)
        details.search(value).then(searchResults => {
            this.setState({SearchResults: searchResults});
          })
      };
        
    return (
            <Link to={`/details${props.id}`} onClick={() => {getDetails(props.id)}}>
                <section>
                        <img src={props.poster} alt="" className="thumbnail"></img>
                        <h2>{props.heading}</h2>
                </section>
            </Link>
            )
}

export default Results
