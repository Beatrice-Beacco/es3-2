require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

console.log('Persons', Person);

var morgan = require('morgan')


app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))


//Creates the GET request with all the phonebook entries in MongoDB,
//then if they are present it sends them as a response.
app.get('/api/persons', (request, response) => {
    Person.find({})
    .then(entries => response.json(entries))
})

//Creates the GET request with info about the phonebook and the timestamp of the request
app.get('/info', (request, response) => {
    let timestamp = new Date();
    let numberOfEntries = entries.length;
    if (request.body) {
        response.send('The phonebook has info for ' + numberOfEntries + ' people. <br/>' + timestamp);
    } else {
        response.status(404).end();
    }
})

//Displays single entries based on their id if they are present, else returns 404
app.get('/api/persons/:id', (request, response) => {
    if (request.body){
        const id = request.params.id
        Person.findById(id)
        .then(entry => response.json(entry))
    } else {
        response.status(404).end("This entry does not exist")
    }
    
})

//Deletes an entry filtering the entries array out of the id in the URI.
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    //entries = entries.filter(entry => entry.id !== id)

    response.status(204).end()
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
/*     if (checkName(body.name).length > 0) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    } */
    
    const entry = new Person ({
        'name': body.name,
        'number': body.number
    })

    console.log(entry);

    //Adds the entry to all other entries
    //entries = entries.concat(entry)

    //Responds with the content of entry
    entry.save().then(savedEntry => response.json(savedEntry))
})

//checkName function
///const checkName = (name) => entries.filter((entry) => entry.name == name)


//Defines the port of the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})