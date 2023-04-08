const appendDate = (container, newDate) => {
    if (newDate !== '') {
        dates.push({ date: newDate })

        console.log('added dates',dates)

        const div = document.createElement('div')
        div.setAttribute('data-date', newDate)
        div.classList.add('added-date-wrapper')

        const span = document.createElement('span')
        span.innerText = newDate
        div.appendChild(span)

        const img = document.createElement('img')
        img.setAttribute('data-date', newDate)
        img.setAttribute('src', 'delete.png')
        img.setAttribute('alt', 'delete')
        img.classList.add('delete-icon')
        div.appendChild(img)

        container.appendChild(div)
        

    }
}

const updateDates = (container) => {

    container.innerHTML = ''
    
    dates.forEach(newDate => {
       
        const div = document.createElement('div')
        div.setAttribute('data-date', newDate.date)
        div.classList.add('added-date-wrapper')

        const span = document.createElement('span')
        span.innerText = newDate.date
        div.appendChild(span)

        const img = document.createElement('img')
        img.setAttribute('data-date', newDate.date)
        img.setAttribute('src', 'delete.png')
        img.setAttribute('alt', 'delete')
        img.classList.add('delete-icon')
        div.appendChild(img)

        container.appendChild(div)
    })

    const deleteButtons = document.querySelectorAll('.delete-icon')
    const datesWrapper = document.querySelector('#dates')

    deleteButtons.forEach(btn => btn.addEventListener('click',e => {
        const wrapper = btn.getAttribute('data-date')
        const dateToFind = { date: wrapper}
        const filteredDates = dates.filter(date => date.date !== dateToFind.date)
        
        dates = filteredDates

        updateDates(datesWrapper)
        
    }))
}