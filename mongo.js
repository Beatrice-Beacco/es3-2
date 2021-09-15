const mongoose = require('mongoose')
 
if (process.argv.length < 5) {
    console.log('Please provide all of the data')
    process.exit(1)
}
 
const password = process.argv[2]
 
const url =
    `mongodb+srv://user:${password}@cluster0.fkwh6.mongodb.net/phonebookDB?retryWrites=true&w=majority`

mongoose.connect(url)
 
const personsSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model('Person', personsSchema)

const entry = new Person({
    name: process.argv[3],
    number: process.argv[4]
})


 
entry.save()
    .then(result => Person.find({}))
    .then(result => {
    result.forEach(entry => console.log(entry))})
    .then(result => mongoose.connection.close())
    