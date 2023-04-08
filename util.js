const fetchData = async (date, station) => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.XRapidAPIKey,
            'X-RapidAPI-Host': process.env.XRapidAPIHost
        }
    };

    try {
        const fetchedData = await fetch(`https://meteostat.p.rapidapi.com/stations/hourly?station=${station}&start=${date}&end=${date}&tz=Europe%2FPrague&units=metric`, options)
        const json = await fetchedData.json()
        return json
    } catch (error) {
        return error
    }

    // fetch(`https://meteostat.p.rapidapi.com/stations/hourly?station=${station}&start=${date}&end=${date}&tz=Europe%2FPrague&units=metric`, options)
    //     .then(response => response.json())
    //     .then(response => {
    //         //  console.log(response)
    //          return response

    //     })
    //     .catch(err => console.error(err));
}

module.exports = {
    fetchData
}

