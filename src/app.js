const path= require('path')
const express =require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicDitrectoryPath = path.join(__dirname,'../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDitrectoryPath))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ojas Raul'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ojas Raul'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Ojas Raul'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address must be provided.'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecastData,
                address:req.query.address
            })
        })
        
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Enter a search query'
        })
    }

    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('Error-404',{
        title:'404 Error',
        errorMsg:'Help page not found.',
        name:'Ojas Raul'
    })
})

app.get('*',(req,res)=>{
    res.render('Error-404',{
        title:'404 Error',
        errorMsg:'Page not found.',
        name:'Ojas Raul'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})