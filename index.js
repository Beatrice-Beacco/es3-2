require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

console.log('Persons', Person);

//Defining middlewares
var morgan = require('morgan')

//Error handler
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


//Using middlewares
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))



//Creates the GET request with all the phonebook entries in MongoDB,
//then if they are present it sends them as a response.
app.get('/api/persons', (request, response, next) => {
    Person.find({})
    .then(entries => response.json(entries))
    .catch(error => next(error))
})

//Creates the timestamp, then sends a the GET request where the total results of
//MongoDB are requested, then the number of entries is used in the resulting string.
app.get('/info', (request, response) => {
    let timestamp = new Date();
    Person.find({})
    .then(entries => entries.length)
    .then(result =>{
        if (request.body) {
            response.send('The phonebook has info for ' + result + ' people. <br/>' + timestamp);
        } else {
            response.status(404).end();
        }
    })
})

//Displays single entries based on their id if they are present, else returns 404
app.get('/api/persons/:id', (request, response) => {
    Person.find({_id:request.params.id})
    .then(entry => response.json(entry))
    .catch(error => response.status(404).end("Non existent resource")) 
})

//Deletes an entry using Mongoose method if the resource is present
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//Add new entries
app.post('/api/persons', (request, response) => {
    
    //Returns error 400 if there is no name or number in the request body
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }

    //Uses the cunstom function checkName, which filters all the entries and returns a result
    //if a name is the same. If there is at least a result in the returned array, it means that the 
    //name is a duplicate and ends the request with status 400
    if (checkName(body.name).length > 0) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    } 
    
    //Creates a new entry with the Person constructor
    const entry = new Person ({
        'name': body.name,
        'number': body.number
    })

    //Saves the entry i mongodb and sends it as response
    entry.save()
    .then(savedEntry => response.json(savedEntry))
        .catch(err => response.status(500).send(err))
})

//Checks fon the name propriety using Mongoose find method
const checkName = (searchname) => Person.find({name:searchname})

//Update an entry by its matching id to the DB, then sends it as response
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const entry = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, entry, { new: true })
        .then(updatedEntry => {
            response.json(updatedEntry)
        })
        .catch(error => next(error))
})


//Defines the port of the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

//Use unknown endpoint
app.use(unknownEndpoint)