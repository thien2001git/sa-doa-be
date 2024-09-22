import express from "express";
import userCollection from "../../data/mongodb/collections/UserCollection";

const userRouter = express.Router();
userRouter.get('/', (req, res, next) => {
    userCollection.findAll().then((_res) => {
        res.send(_res)
    }).catch(e => {
        console.log(e)
        res.send([])
    })
});

userRouter.post('/upsert', (req, res, next) => {
    if (req.body !== undefined) {
        userCollection.upsert({_id: req.body.id}, req.body).then(r => {
            res.send(true)
        }).catch(e => {
            console.log(e)
            res.send(false)
        })
    } else {
        res.send(false)
    }
});


userRouter.post('/create', (req, res, next) => {
    if (req.body !== undefined) {
        userCollection.create(req.body).then(r => {
            res.send(true)
        }).catch(e => {
            console.log(e)
            res.send(false)
        })
    } else {
        res.send(false)
    }
});
userRouter.post('/delete', (req, res, next) => {
    userCollection.delete(req.body).then(r => {
        res.send(true)
    }).catch(e => {
        console.log(e)
        res.send(false)
    })
});

export default userRouter