const request =require('request')

const forecast = (la,lo,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=168df220fd5b5ece380027d0b98e2cf9&query='+la+','+lo//+'&units=f'
    
    request({url,json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Weather Services!',undefined)
        } else if (body.error){
            callback('Unable to find the location. Try other location.',undefined)
        } else{
            callback(undefined, body.current.weather_descriptions+'. It is currently '+ body.current.temperature +' degrees out. But it feels like '+ body.current.feelslike+' degrees out.')
        }
    })
}

module.exports = forecast