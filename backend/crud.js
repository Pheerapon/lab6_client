let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();



// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let dogs = {
    list: [
        { "id": "5935512012", "Name": "boo", "Species": "Beagle", "Age": 2 , "Price": 10000},
        { "id": "5935512013", "Name": "reace", "Species": "Bulldog", "Age": 1.5, "Price": 15000}]
}

router.route('/dogs')
    .get((req, res) => res.json(dogs))
    .post((req, res) => {
        // let id = (dogs.list.length) ? dogs.list[dogs.list.length - 1].id + 1 : 1
        let id = req.body.id
        let Name = req.body.Name;
        let Species = req.body.Species;
        let Age = req.body.Age;
        let Price = req.body.Price;
        dogs = { list: [...dogs.list, { id, Name, Species, Age, Price }] }
        res.json(dogs.list)

    })
    

router.route('/dogs/:dog_id')
    .get((req, res) => {
        let id = dogs.list.findIndex(
            (item) => (item.id === req.params.dog_id))
            if(id === -1){
                res.send('Not found')
            }

        res.json(dogs.list[id])
    })

    .put((req,res) => {
        let id = dogs.list.findIndex((item) => (
            item.id === req.params.dog_id
        ))
        if(id === -1){
            res.send('Not found')
        }
        dogs.list[id].Name = req.body.Name
        dogs.list[id].Species = req.body.Species
        dogs.list[id].Age = req.body.Age
        dogs.list[id].Price = req.body.Price
        res.json(dogs.list)
    })

    .delete((req, res) => {
        
        dogs = dogs.list.filter(item => item.id !== req.params.dog_id)
        res.json(dogs.list)
        if(id === -1){
            res.send('Not found')
        }
    })
 


app.listen(8080, () => console.log('server is running...'))