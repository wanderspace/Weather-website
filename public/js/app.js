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
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent=data.error
                // return console.log(data.error)
            }

            messageTwo.textContent='Location : ' + data.location
            messageOne.textContent='Forecast : ' + data.forecastData
        })
    })
})