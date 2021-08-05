import React from 'react'
import Results from '../Results/Results'

import './resultList.css'

export default class ResultList extends React.Component {        
    render() {
        return (
            <div className="resultList">
                {
                    this.props.SearchResults.map(movie => {       
                            return <Results id= {movie.imdb_id}
                                            heading = {movie.title}
                                            poster = {movie.image_url || null}  />                        
                    })
                }
            </div>
        )
    }
}
