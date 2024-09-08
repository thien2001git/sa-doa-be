import express from "express";
import userCollection from "../data/mongodb/collections/UserCollection";

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    userCollection.findAll().then((_res) => {
        res.send(_res)
    }).catch(e => {
        console.log(e)
        res.send([])
    })
});

router.post('/upsert', (req, res, next) => {
    userCollection.upsert({_id: req.body._id, id: req.body.id}, req.body).then(r => {
        res.send(true)
    }).catch(e => {
        console.log(e)
        res.send(false)
    })
});

router.post('/delete', (req, res, next) => {
    userCollection.delete(req.body).then(r => {
        res.send(true)
    }).catch(e => {
        console.log(e)
        res.send(false)
    })
});

export default router
