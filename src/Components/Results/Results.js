import React from 'react'

import './Results.css'

import { Link } from 'react-router-dom'

const Results = (props) => {    
    return (
            <Link to={`/details/${props.id}`} >
                <section>
                        <img src={props.poster} alt="" className="thumbnail"></img>
                        <h2>{props.heading}</h2>
                </section>
            </Link>
            )
}

export default Results
