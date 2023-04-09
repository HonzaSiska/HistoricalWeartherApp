

const hledejBtn = document.querySelector('#hledej')
const addBtn = document.querySelector('#add-icon')
const spinner = document.querySelector('#spinner')
let dates = []

addBtn.addEventListener('click', e => {

    let selectedDate = document.querySelector('#date').value
    const datesWrapper = document.querySelector('#dates')


    if (dates.length < 3) appendDate(datesWrapper, selectedDate)

    document.querySelector('#date').value = ''

    const deleteButtons = document.querySelectorAll('.delete-icon')

    deleteButtons.forEach(btn => btn.addEventListener('click', e => {
        const wrapper = btn.getAttribute('data-date')
        const dateToFind = { date: wrapper }
        const filteredDates = dates.filter(date => date.date !== dateToFind.date)

        dates = filteredDates

        updateDates(datesWrapper)
    }))
})


const fetchData = async (dates, station) => {
    if (dates.length === 0) return
    const data = { dates, station }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };

    try {
        spinner.classList.remove('spinner-hidden')
        spinner.classList.add('spinner-visible')

        const fetchedData = await fetch('/api/fetch', options)
        const json = await fetchedData.json()

        spinner.classList.add('spinner-hidden')
        spinner.classList.remove('spinner-visible')

        return JSON.parse(json)
    } catch (error) {

        spinner.classList.add('spinner-hidden')
        spinner.classList.remove('spinner-visible')

        return error
    }

    // fetch('/api/fetch', options)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(JSON.parse(data))
    //         return data
    //     })
    //     .catch(error => console.error(error));
}



hledejBtn.addEventListener('click', async (e) => {
    e.preventDefault()

    const station = document.querySelector('#station').value
    const resultsSection = document.querySelector('#results-wrapper')
    const results = await fetchData(dates, station)
    console.log(results)

    let html = ''

    results.forEach(item => {

        const {data} = item

        const parsedDate = data[0].time.split(" ")[0]

        html += `
            <div class="table-title">
                <h3>${parsedDate}</h3>
            </div>`

            html += `<table>
            <thead>
                <tr>
                    <th>Čas</th>
                    <th>C°</th>
                    <th>Vlhk.</th>
                    <th>Srážky (mm)</th>
                    <th>Sníh (mm)</th>
                    <th>Vítr (km/h)</th>
                </tr>
            </thead><tbody>`

        data.forEach(subItem => {

            const {time, temp, rhum, prcp, snow, wspd } = subItem

            const parsedTime = time.split(" ")[1]
            
            html += `
            
            <tr>
                <td>
                    ${parsedTime}
                </td>
                <td>
                    ${temp}
                </td>
                <td>
                    ${rhum}
                </td>
                <td>
                    ${prcp}
                </td>
                <td>
                    ${snow === 'null' ? '0' : snow}
                </td>
                <td>
                    ${wspd}
                </td>
            </tr>`
        })

        html += ` </tbody></table>`

    })

    resultsSection.innerHTML = html

})

    









