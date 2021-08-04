import React from 'react'
// import details from '../../util/get_details'


const Detail = (props) => {
    
    // const getDetails = () => {    
    //     const value = window.location.href.split('/')[3]
    //     console.log(value)
    //     details.search(value).then(searchResults => {
    //         this.setState({SearchResults: searchResults});
    //       })
    //   };
    
    
    return (
            <div>
                <img src={props.image} alt="" className="thumbnail"></img>
            </div>
        )
    }

export default Detail