const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent='From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent='Loading Forecast...'
    messageTwo.textContent=''
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent=data.error
                // return console.log(data.error)
            }

            messageOne.textContent='Forecast : ' + data.forecastData
            messageTwo.textContent='Location : ' + data.location
            // console.log('Forecast :' + data.forecastData)
            // console.log('Location :' + data.location)
            // console.log('Address :' + data.address)
        })
    })
})