import React from 'react'
import Results from '../Results/Results'


import './resultList.css'
// import details from '../../util/get_details'


export default class ResultList extends React.Component {        
    // constructor(props){
    //     super(props)
    //     this.getDetails = this.getDetails.bind(this)
    // }
        
    // getDetails(){    
    //     console.log(this.props.SearchResults.id)
    //     const path = `${this.props.id}`
    //     console.log(path)
    //     const value = path.split('/')[3]
    //     console.log(value)
    //     details.search(value).then(searchResults => {
    //       this.setState({SearchResults: searchResults});
    //     })
    //   }
    
    
    render() {
        return (
            <div className="resultList">
                {
                    this.props.SearchResults.map(movie => {
                        return <Results id={movie.id}
                                        heading = {movie.title || movie.name}
                                        poster = {movie.image ? movie.image.url : null}  />
                    })
                }
            </div>
        )
    }
}