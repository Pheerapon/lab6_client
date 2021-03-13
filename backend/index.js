let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());


// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let bears = {
    list: [
        { "id": 1, "name": "Winnie", "weight": 50 },
        { "id": 2, "name": "Pooh", "weight": 66 }]
}

router.route('/bears')
    .get((req, res) => res.json(bears))
    .post((req, res) => {
        let id = (bears.list.length) ? bears.list[bears.list.length - 1].id + 1 : 1
        let name = req.body.name;
        let weight = req.body.weight;
        bears = { list: [...bears.list, { id, name, weight }] }
        res.json(bears.list)

    })
    

router.route('/bears/:bear_id')
    .get((req, res) => {
        let id = bears.list.findIndex(
            (item) => (item.id === +req.params.bear_id))
        res.json(bears.list[id])
    })

    .put((req,res) => {
        let id = bears.list.findIndex((item) => (
            item.id === +req.params.bear_id
        ))
        bears.list[id].name = req.body.name
        bears.list[id].weight = req.body.weight
        res.json(bears.list)
    })

    .delete((req, res) => {
        bears = bears.list.filter(item => item.id != +req.params.bear_id)
        res.json(bears.list)
    })
 


app.listen(8000, () => console.log('server is running...'))