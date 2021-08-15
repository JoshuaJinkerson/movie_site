let clientId = 'b4480f4a50msh958e42fa6e7c537p12f648jsna1792952e958'
let endpoint = 'https://data-imdb1.p.rapidapi.com/movie/'
let jsonResponse;

function flattenObject(ob) {
    for (const i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        return ob[i]
    }
    return 
}


const imdb = {
    async getID (){
        const imdbID = jsonResponse.Result.map(movie => {return movie.imdb_id})                
        console.log(imdbID)
        let details = []
        let ID;
        for (let i = 0; imdbID.length > i; i++){
            ID = imdbID[i]
            console.log(ID)
            
            const detailsURL =  `${endpoint}id/${ID}/`
            const detail = await fetch(detailsURL, {
                method: "GET",
                headers: {
                    "x-rapidapi-key": `${clientId}`,
                    "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                    'Content-Type': 'application/json',
                }})
                if(detail.ok){
                    jsonResponse = await detail.json()
                    console.log(jsonResponse)   
                    let data = flattenObject(jsonResponse)
                    details.push(data)
                    console.log(details)
            }   
        }
        return details
    },

    async search(value){
        const urltoFetch = `${endpoint}imdb_id/byTitle/${value}/`
        const response = await fetch(urltoFetch, {
            method: "GET",
            headers: {
                "x-rapidapi-key": `${clientId}`,
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                'Content-Type': 'application/json',
            } 
        })
        if (response.ok){
            jsonResponse = await response.json()
            console.log(jsonResponse)
            let Response = this.getID()
            return Response
            }
        }  
}

export default imdb
