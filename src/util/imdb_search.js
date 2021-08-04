let clientId = 'b4480f4a50msh958e42fa6e7c537p12f648jsna1792952e958'
let endpoint = 'https://imdb8.p.rapidapi.com/'
let jsonResponse;

 const imdb = {
    async search(value){
        const urltoFetch = `${endpoint}title/find?q=${value}`
        const response = await fetch(urltoFetch, {
            method: "GET",
            headers: {
                "x-rapidapi-key": `${clientId}`,
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                'Content-Type': 'application/json',
            } 
        })
        if (response.ok){
            jsonResponse = await response.json()
            console.log(jsonResponse)
            console.log(jsonResponse.results)
            if(jsonResponse.results !== []){
                return jsonResponse.results.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    name: movie.name,
                    year: movie.year,
                    image: movie.image,
                    runningTime: movie.runningTimeInMinutes,
                    principals: movie.principals
                }))        
        
        }else{
                return []
                }
        }

        console.log(jsonResponse)

    }
}

export default imdb
