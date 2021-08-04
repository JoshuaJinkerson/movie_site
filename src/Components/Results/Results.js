import React from 'react'

import './Results.css'

import { Link } from 'react-router-dom'
import details from '../../util/get_details'

export default class Results extends React.Component {    
    constructor(props){
        super(props)
        this.getDetails = this.getDetails.bind(this)
    }   
    
    getDetails(){    
        console.log(this.props.SearchResults.id)
        const path = `${this.props.id}`
        console.log(path)
        const value = path.split('/')[3]
        console.log(value)
        details.search(value).then(searchResults => {
          this.setState({SearchResults: searchResults});
        })
      }    
    
    render() {
        return (
                <Link to={`/details${this.props.id}`}>
                <section>
                        <img src={this.props.poster} alt="" className="thumbnail"></img>
                        <h2>{this.props.heading}</h2>
                </section>
                </Link>
            )
    }
}
