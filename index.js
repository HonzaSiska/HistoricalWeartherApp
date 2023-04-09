require('dotenv').config()
const cors = require('cors')
const express = require('express');
const fetchNode = require('node-fetch');

const { fetchData } = require("./util.js");

const app = express();

app.use(cors())

app.use(express.static(__dirname + '/public'));

app.use(express.json())

app.post('/api/fetch', async (req, res) => {
    let fetchedData = []

    const { dates, station } = req.body
    console.log('body', process.env.XRapidAPIKey)
    console.log('env1', process.env.XRapidAPIHost)


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.XRapidAPIKey,
            'X-RapidAPI-Host': process.env.XRapidAPIHost
        }
    };

    // try {
    //     const data = await fetch(`https://meteostat.p.rapidapi.com/stations/hourly?station=${station}&start=${dates[0].date}&end=${dates[0].date}&tz=Europe%2FPrague&units=metric`, options)
    //     const json = await data.json()
    //     console.log('json', json)
    //     fetchedData.push(json)
    //     console.log('result', JSON.stringify(fetchedData))

    //     res.json(JSON.stringify(fetchedData));
    // } catch (error) {
    //     console.log('error',error)
    //     return error
    // }


    // for(let item of dates){
    //     console.log('item', item)
    //     const result =  await fetchData(item.date, station)
    //     fetchedData.push(result)

    const runLoop = async () => {
        for (let item of dates) {
            const data = await fetchNode(`https://meteostat.p.rapidapi.com/stations/hourly?station=${station}&start=${item.date}&end=${item.date}&tz=Europe%2FPrague&units=metric`, options)
            const json = await data.json()
            console.log('json', json)
            fetchedData.push(json)
            console.log('result', JSON.stringify(fetchedData))
        }
    }
    try {
        await runLoop()
        res.json(JSON.stringify(fetchedData));
    } catch (error) {
        console.log(error)
    }

    

    // console.log('result', JSON.stringify(fetchedData))

    // res.json(JSON.stringify(fetchedData));




});
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))