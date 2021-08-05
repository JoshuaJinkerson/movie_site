import React from 'react'

import './Results.css'

import { Link } from 'react-router-dom'
// import details from '../../util/get_details'

const Results = (props) => {    
    
    // const getDetails = (e) => {   
    //     console.log(e) 
    //     const value = e.split('/')[2]
    //     console.log(value)
    //     const movie = details.search(value)
    //     console.log(movie)
    // };
        // onClick={() => {getDetails(props.id)}}
    return (
            <Link to={`/details${props.id}`} >
                <section>
                        <img src={props.poster} alt="" className="thumbnail"></img>
                        <h2>{props.heading}</h2>
                </section>
            </Link>
            )
}

export default Results
