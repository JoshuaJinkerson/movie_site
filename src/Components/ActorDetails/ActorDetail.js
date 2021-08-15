import React, {useState, useEffect} from 'react'

import './Actors.css'

import { Link } from 'react-router-dom'


const ActorDetail = () => {    
    const [details, setDetails] = useState({
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
        // let endpoint2 = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/'
        let endpoint3 = 'https://data-imdb1.p.rapidapi.com/actor/'

        //Set variables for parts of fetch URLs
        let ID = window.location.href.split('/')[4]

        //Set fetch url variables  
        let detailsURL = (ID.includes('tt') ? `${endpoint1}id/${ID}/` : `${endpoint3}id/${ID}/`) 
        let moviesURL = `${endpoint3}id/${ID}/movies_knownFor/`        

        //Call multiple fetch promises
        let [data, movie] = await Promise.all([
            fetch(detailsURL, {
            method: "GET",
            headers: {
                "x-rapidapi-key": `b4480f4a50msh958e42fa6e7c537p12f648jsna1792952e958`,
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                'Content-Type': 'application/json',
            }}),
            fetch(moviesURL, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "b4480f4a50msh958e42fa6e7c537p12f648jsna1792952e958",
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                'Content-Type': 'application/json',
            }})
        ])
            //Process data for the movie details response
            let jsonResponse = await data.json()
            jsonResponse = flattenOneObject(jsonResponse)
            // console.log(jsonResponse)

            //format date
            let time = jsonResponse.birth_date.split('-')
            let movie_release = new Date(time[0], time[1]-1, time[2])
            let options = {month: 'long', year: 'numeric', day: 'numeric'}
            let date = movie_release.toLocaleDateString('en-US', options)
            jsonResponse['birth_date']=date

            //Process data for the Movie list response
            let moviesJsonResponse = await movie.json()
            moviesJsonResponse = flattenOneObject(moviesJsonResponse)
            moviesJsonResponse = moviesJsonResponse.slice(0, 4)
            // moviesJsonResponse = moviesJsonResponse.slice(0,4)            


            //get the nameIDs for the top for cast of movie
            let movieList = []
            for (let i = 0; i < moviesJsonResponse.length; i++) {
                movieList.push(moviesJsonResponse[i][0]['imdb_id'])
            }
           
            //Reformat OBJ list with numbers
            function flattenData(arrData){
                let movies = {}
                for(let i = 0; i < arrData.length; i++){
                    arrData.map(movie => {
                    let j = 0
                    while (j < Object.keys(arrData).length+8) { //Number after array length adds extra values pairs from the movies being looped
                        let key = Object.keys(movie)[j]
                        let value = movie[key]                       
                        movies[key + "_" + i] = value
                        j++
                        i++
                    }
                    return () => movies 
                }
            )}
            return movies
        }            

            //Get details for cast to use on movie details page
            let movieDetails = async () => {     
                let movieDetails = []
                for(const movie of movieList) {
                    let movieURL = `${endpoint1}id/${movie}/`
                    let response = await fetch(movieURL, {
                        method: "GET",
                        headers: {
                            "x-rapidapi-key": `b4480f4a50msh958e42fa6e7c537p12f648jsna1792952e958`,
                            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                            'Content-Type': 'application/json',
                        }}
                    )                    
                    let jsonResponse = await response.json()
                    console.log(jsonResponse)
                    movieDetails.push(flattenOneObject(jsonResponse))
                    console.log(movieDetails)
                    
                }
                return flattenData(movieDetails)              
            }
            
            //Reformat cast data into one Object
            let movies = await movieDetails()
            console.log(movies)
            
            /*Join the two responses into one object*/
            let movieData = {
                ...jsonResponse,
                ...movies
            }
            /*Set the state of the responses to use the data*/
            setDetails(movieData)
        

        
        
        return 
    }

    getDetails()
   

}, [details.release])

    return (
            <div className="container">
                
                {/* section for poster */}
                <h1>{details.name}</h1>
                <div className="detailsBG">
                    <div className="thumb">
                        <img src={details.image_url} alt={details.name}></img>
                    </div>

                    {/* section for details and actors */}
                    <div className="detail">
                        <h2 className="movieName">BIO</h2>
                        <p className="movieDesc">{details.partial_bio}</p>
                    </div>
                </div>
                    {/* section for actors */}
                <div className="actorsBG">
                    <h2>ALSO KNOWN FOR...</h2>
                    <div className="actors">
                        <Link to={`/movie/${details.imdb_id_0}`}>
                            <img alt={details.title_1} src={details.image_url_10}></img>
                            <h3>{details.title_1}</h3>
                        </Link>
                        <Link to={`/movie/${details.imdb_id_4}`}>
                            <img alt={details.title_13} src={details.image_url_22}></img>
                            <h3>{details.title_13}</h3>
                        </Link>
                        <Link to={`/movie/${details.imdb_id_8}`}>
                            <img alt={details.title_25} src={details.image_url_34}></img>
                            <h3>{details.title_25}</h3>
                        </Link>
                        <Link to={`/movie/${details.imdb_id_12}`}>
                            <img alt={details.title_37} src={details.image_url_46}></img>
                            <h3>{details.title_37}</h3>
                        </Link>
                    </div>
                </div>

                <div className="infoBG">
                    <h2>DETAILS</h2>
                    <h3>Birth date:</h3>
                        <p>{details.birth_date}</p>
                    <h3>Birth Place:</h3>
                        <p>{details.birth_place}</p>
                    <h3>Height:</h3>
                        <p>{details.height}</p>
                    <h3>Horoscope:</h3>
                        <p>{details.star_sign}</p>

                </div>
            </div>
        )
}

export default ActorDetail