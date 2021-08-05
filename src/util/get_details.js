let clientId = 'b4480f4a50msh958e42fa6e7c537p12f648jsna1792952e958'
let endpoint = 'https://imdb8.p.rapidapi.com/'
let jsonResponse;


const details = {
    async search(value){
        const urltoFetch = `${endpoint}title/get-details?tconst=${value}`
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
            return jsonResponse
        }else{
            return []
             }
    }
}

export default details