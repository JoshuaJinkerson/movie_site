import React, {useState, useEffect} from 'react'

import './Details.css'

const Detail = () => {    
    const [details, setDetails] = useState({
        banner: null,
        content_rating: null,
        created_at: null,
        description: null,
        image_url: null,
        imdb_id: null,
        keywords: null,
        movie_length: null,
        plot: null,
        popularity: null,
        rating: null,
        release: null,
        title: null,
        trailer: null,
        year: null,
    });

    function flattenOneObject(ob) {
        for (const i in ob) {
            if (!ob.hasOwnProperty(i)) continue;
            return ob[i]
        }
        return 
    };

    // function getNameID(ob) {
    //     for (const i in ob) {
    //         if (!ob.hasOwnProperty(i)) continue;
    //         return ob[i]
    //     }
    //     return 
    // };

    useEffect(() => {
        async function getDetails(){
        //Set endpoint Variables
        let endpoint1 = 'https://data-imdb1.p.rapidapi.com/movie/'
        let endpoint2 = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/'

        //Set variables for parts of fetch URLs
        let ID = window.location.href.split('/')[4]
        
        //Set fetch url variables  
        let detailsURL =  `${endpoint1}id/${ID}/`
        let castURL = `${endpoint2}${ID}`
        
        //Call multiple fetch promises
        let [data, cast] = await Promise.all([
            fetch(detailsURL, {
            method: "GET",
            headers: {
                "x-rapidapi-key": `b4480f4a50msh958e42fa6e7c537p12f648jsna1792952e958`,
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                'Content-Type': 'application/json',
            }}),
            fetch(castURL, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "b4480f4a50msh958e42fa6e7c537p12f648jsna1792952e958",
                "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                'Content-Type': 'application/json',
            }})
        ])
            //Process data for the movie details response
            let jsonResponse = await data.json()
            jsonResponse = flattenOneObject(jsonResponse)
 
            //Process data for the cast list response
            let castJsonResponse = await cast.json()
            castJsonResponse = Object.values(castJsonResponse)[9]
            castJsonResponse = castJsonResponse.slice(0,4)

            //get the nameIDs for the top for cast of movie
            let castList = []
            castJsonResponse.reduce(function(result, currentObject) {    
                for(var key in currentObject) {
                    if (currentObject.hasOwnProperty(key)) {
                            if(currentObject[key].includes('nm')){                    
                                castList.push(currentObject[key])
                            }  
                    }
                }
                return result;
            }, {});

            /*Join the two responses into one object*/
            let movieData = {
                ...jsonResponse,
                ...castJsonResponse
            }
            /*Set the state of the responses to use the data*/
            setDetails(movieData)
        return 
    }

    getDetails()
}, [])

    return (
            <div className="movieDetail">
                <div className="detail">
                
                    <h2 className="movieName">{details.title}</h2>
                    <p className="movieDesc">{details.description}</p>
                
                
                <div className="actors">
                    <img alt="" src={details.banner}></img>
                    <img alt="" src={details.banner}></img>
                    <img alt="" src={details.banner}></img>
                    <img alt="" src={details.banner}></img>
                </div>
                </div>
                
                <div className="thumb">
                    <a href={details.trailer}><img src={details.banner} alt=""></img></a>
                    <p >Click on the image for a trailer </p>
                </div>
            </div>
        )
}

export default Detail