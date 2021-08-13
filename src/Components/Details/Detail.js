import React, {useState, useEffect} from 'react'

import './Details.css'

import { Link } from 'react-router-dom'


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

    useEffect(() => {
        async function getDetails(){
        //Set endpoint Variables
        let endpoint1 = 'https://data-imdb1.p.rapidapi.com/movie/'
        let endpoint2 = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/'
        let endpoint3 = 'https://data-imdb1.p.rapidapi.com/actor/'

        //Set variables for parts of fetch URLs
        let ID = window.location.href.split('/')[5]

        //Set fetch url variables  
        let detailsURL = (ID.includes('tt') ? `${endpoint1}id/${ID}/` : `${endpoint3}id/${ID}/`) 
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
           
            //Reformat OBJ list with numbers
            function flattenData(arrData){
                let actors = {}
                for(let i = 0; i < arrData.length; i++){
                    arrData.map(actor => {
                    let j = 0
                    while (j < Object.keys(arrData).length) {
                        let key = Object.keys(actor)[j]
                        let value = actor[key]                       
                        actors[key + "_" + i] = value
                        j++
                        i++
                    }
                    return () => actors 
                }
            )}
            return actors
        }            

            //Get details for cast to use on movie details page
            let castDetails = async () => {     
                let actorDetails = []
                for(const cast of castList) {
                    let actorURL = `${endpoint3}id/${cast}/`
                    let response = await fetch(actorURL, {
                        method: "GET",
                        headers: {
                            "x-rapidapi-key": `b4480f4a50msh958e42fa6e7c537p12f648jsna1792952e958`,
                            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                            'Content-Type': 'application/json',
                        }}
                    )                    
                    let jsonResponse = await response.json()
                    actorDetails.push(flattenOneObject(jsonResponse))
                }
                return flattenData(actorDetails)              
            }
            
            //Reformat cast data into one Object
            let actors = await castDetails()

            /*Join the two responses into one object*/
            let movieData = {
                ...jsonResponse,
                ...actors
            }
            /*Set the state of the responses to use the data*/
            setDetails(movieData)
        return 
    }

    getDetails()
}, [])

    return (
            <div className="movieDetail">
                <div className="thumb">
                    <a href={details.trailer}><img src={details.banner} alt=""></img></a>
                    <p>Click on the image for a trailer</p>
                </div>                
                <div className="detail">
                
                    <h2 className="movieName">{details.title}</h2>
                    <p className="movieDesc">{details.description}</p>
                
                
                    <div className="actors">
                        <Link to={`/actor/details/${details.imdb_id_0}`}><img alt="" src={details.image_url_2}></img></Link>
                        <Link to={`/actor/details/${details.imdb_id_4}`}><img alt="" src={details.image_url_6}></img></Link>
                        <Link to={`/actor/details/${details.imdb_id_8}`}><img alt="" src={details.image_url_10}></img></Link>
                        <Link to={`/actor/details/${details.imdb_id_12}`}><img alt="" src={details.image_url_14}></img></Link>
                    </div>
                </div>
                

            </div>
        )
}

export default Detail