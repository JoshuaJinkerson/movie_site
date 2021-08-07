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

    function flattenObject(ob) {
        for (const i in ob) {
            if (!ob.hasOwnProperty(i)) continue;
            return ob[i]
        }
        return 
    }

    useEffect(() => {
        async function getDetails(){
        let endpoint = 'https://data-imdb1.p.rapidapi.com/movie/'
       
        let ID = window.location.href.split('/')[4]
        console.log(ID)
        let detailsURL =  `${endpoint}id/${ID}/`
        console.log(detailsURL)
        let detail = await fetch(detailsURL, {
            method: "GET",
            headers: {
                "x-rapidapi-key": `b4480f4a50msh958e42fa6e7c537p12f648jsna1792952e958`,
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                'Content-Type': 'application/json',
            }})
            console.log(detail)
            if(detail.ok){
                let jsonResponse = await detail.json()
                jsonResponse = flattenObject(jsonResponse)
                setDetails(jsonResponse)
                return jsonResponse
            
            }
        return 
    }

    getDetails()
}, [])
        
    return (
            <div>
                <h2>{details.title}</h2>
                <p>{details.description}</p>
                <a href={details.trailer}><img src={details.image_url} alt="" className="thumb"></img></a>
                <p>Click on the image for a trailer </p>
                
            
            
            </div>
        )
}

export default Detail