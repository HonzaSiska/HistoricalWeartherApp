require('dotenv').config()
const express = require('express');
const { fetchData } = require("./util.js")
const app = express();
app.use(express.static(__dirname + '/public'));
// middleware
app.use(express.json())
app.post('/api/fetch', async (req, res) => {
    let fetchedData = []

    const {dates, station} = req.body
    console.log('body', dates)
   
    for(let item of dates){
        console.log('item', item)
        const result =  await fetchData(item.date, station)
        fetchedData.push(result)
    }

    // function delayedLoop() {
    //     for (let i = 0; i < dates.length -1 ; i++) {
    //       setTimeout(function() {
    //         const result =   fetchData(dates[0].date, station)
    //         fetchedData.push(result)
    //       },( i + 1) * 334);
    //     }
    //   }
      
    //    delayedLoop();
    


    console.log('result', JSON.stringify(fetchedData))

    // console.log(req.body)
    res.json(JSON.stringify(fetchedData));
});
const PORT = process.env.PORT || 4000
app.listen(PORT , () => console.log(`Server running on port ${PORT}`))