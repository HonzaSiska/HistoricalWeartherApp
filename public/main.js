

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


    // TEST DATA
    // const results = [
    //     {
    //         meta: {}, data: [
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },

    //         ]
    //     },
    //     {
    //         meta: {}, data: [
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },

    //         ]
    //     },
    //     {
    //         meta: {}, data: [
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },
    //             { time: "2020-01-01 00:00:00", temp: 0.3, dwpt: -1.5, rhum: 88, prcp: 0, snow: null, wdir: 40, wspd: 8.6, wpgt: 13, pres: 1036.9, tsun: 0, coco: 3 },

    //         ]
    //     }
    // ]

    let tableNumber = 0

    results.forEach((item, index) => {

        tableNumber += 1

        const { data } = item

        const parsedDate = data[0].time.split(" ")[0]

        html += `<div class="single-table-wrapper draggables" draggable="true">
        <img class='drag-icon' src='/drag-flick.png' alt='drag' />`

        html += `<table class="table-results" >
                <tr>
                    <div class="table-title">
                        <h3>${parsedDate}</h3>
                    </div>
                </tr>
                <colgroup>
                    <col data-col=${tableNumber}0 style="background-color: #618ae9;">
                    <col data-col=${tableNumber}1  style="background-color: #84a6f3;">
                    <col data-col=${tableNumber}2 style="background-color: #618ae9;">
                    <col data-col=${tableNumber}3 style="background-color: #84a6f3;">
                    <col data-col=${tableNumber}4 style="background-color: #618ae9;">
                    <col data-col=${tableNumber}5 style="background-color: #84a6f3;">
                </colgroup>
                <thead>
                <tr>
                    <th data-btn-index="${index}" data-th=${tableNumber}0>Čas</th>
                    <th data-btn-index="${index}" data-th=${tableNumber}1>C°</th>
                    <th data-btn-index="${index}" data-th=${tableNumber}2>Vlhk.</th>
                    <th data-btn-index="${index}" data-th=${tableNumber}3>Srážky (mm)</th>
                    <th data-btn-index="${index}" data-th=${tableNumber}4>Sníh (mm)</th>
                    <th data-btn-index="${index}" data-th=${tableNumber}5>Vítr (km/h)</th>
                </tr>
            </thead><tbody>`

        data.forEach((subItem, i) => {

            const { time, temp, rhum, prcp, snow, wspd } = subItem

            const parsedTime = time.split(" ")[1]

            html += `
            
            <tr>
                <td data-btn-index="${index}"  data-td=${tableNumber}0>
                    ${parsedTime}
                </td>
                <td data-btn-index="${index}"  data-td=${tableNumber}1>
                    ${temp}
                </td>
                <td  data-btn-index="${index}" data-td=${tableNumber}2>
                    ${rhum}
                </td>
                <td data-btn-index="${index}"  data-td=${tableNumber}3>
                    ${prcp}
                </td>
                <td data-btn-index="${index}"  data-td=${tableNumber}4>
                    ${snow === 'null' ? '0' : snow}
                </td>
                <td data-btn-index="${index}"  data-td=${tableNumber}5>
                    ${wspd}
                </td>
            </tr>`
        })

        html += `</tbody></table><div style="margin: auto;"><button  class="secondary-btn">
        otevřít sloupce</button></div></div>`

    })

    resultsSection.innerHTML = html

    const dragIcons = document.querySelectorAll('.drag-icon')
    const draggables = document.querySelectorAll(".draggables");
    const tableWrapper = document.querySelectorAll(".single-table-wrapper");
    let initialX, initialY, currentX, currentY; xOffset = 0, yOffset = 0;

    console.log(draggables)

    window.addEventListener('resize', (e) => {
        tableWrapper.forEach(p => {
            p.children[0].style.left = p.offsetLeft + 'px'
            //    console.log(p.children[0])
        })
    })

    // place drag icon in the right place
    tableWrapper.forEach(p => {
        p.children[0].style.left = p.offsetLeft + 'px'
        console.log(p.children[0])
    })

    draggables.forEach(item => {
        console.log(item)
        // on dbclick make whole table wrapper draggable
        dragIcons.forEach(icon => {
            icon.addEventListener('dblclick', (e) => {
                const distanceFromTop = document.documentElement.scrollTop || document.body.scrollTop
                const randomHeight = Math.floor(Math.random() * 200)
                e.target.parentNode.classList.add('can-be-dragged')
                e.target.style.display = 'none'
                //place draggable window on screen in random position
                item.style.left = randomHeight + 'px'
                item.style.top = distanceFromTop + randomHeight + 'px'
            })
        })
        dragIcons.forEach(icon => {
            icon.addEventListener('touchend', (e) => {
                const distanceFromTop = document.documentElement.scrollTop || document.body.scrollTop
                const randomHeight = Math.floor(Math.random() * 200)
                e.target.parentNode.classList.add('can-be-dragged')
                e.target.style.display = 'none'
                //place draggable window on screen in random position
                item.style.left = randomHeight + 'px'
                item.style.top = distanceFromTop + randomHeight + 'px'
            })
        })

        // DRAGGING FUNCTIONALITY

        item.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("text/plain", event.target.id);
            initialX = event.clientX;
            initialY = event.clientY;

        });

        item.addEventListener("dragend", function (event) {
            currentX = event.clientX - initialX;
            currentY = event.clientY - initialY;
            event.target.style.left = (event.target.offsetLeft + currentX) + "px";
            event.target.style.top = (event.target.offsetTop + currentY) + "px";
        });

        item.addEventListener('touchstart', handleTouchStart, false);
        item.addEventListener('touchmove', handleTouchMove, false);
        item.addEventListener('touchend', handleTouchEnd, false);


        function handleTouchStart(e) {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
            console.log('touch')
        }

        function handleTouchMove(e) {
            if (e.touches.length === 1) {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, item);
                console.log('move')
            }
        }

        function handleTouchEnd(e) {
            // Handle drag and drop end actions
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        }
    })


    //// add width attr to each column 

    const cols = document.querySelectorAll("col")
    cols.forEach(col => {

        // console.log(col)
        const width = col.offsetWidth
        col.dataset.originWidth = width

        col.addEventListener('click', (e) => collapseColumn(e))
    })


    const ths = document.querySelectorAll("th")

    ths.forEach(th => {
        th.addEventListener('dblclick', (e) => {
            const tableIndex = th.getAttribute("data-btn-index")

            collapseColumn(e, tableIndex)

        })
        th.addEventListener('touchend', (e) => {
            const tableIndex = th.getAttribute("data-btn-index")

            collapseColumn(e, tableIndex)

        })

    })

    const tds = document.querySelectorAll("th")
})
















