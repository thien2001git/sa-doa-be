"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserCollection_1 = __importDefault(require("../data/mongodb/collections/UserCollection"));
const router = express_1.default.Router();
/* GET users listing. */
router.get('/', (req, res, next) => {
    UserCollection_1.default.findAll().then((_res) => {
        res.send(_res);
    }).catch(e => {
        console.log(e);
        res.send([]);
    });
});
router.post('/upsert', (req, res, next) => {
    UserCollection_1.default.upsert({ _id: req.body._id, id: req.body.id }, req.body).then(r => {
        res.send(true);
    }).catch(e => {
        console.log(e);
        res.send(false);
    });
});
router.post('/delete', (req, res, next) => {
    UserCollection_1.default.delete(req.body).then(r => {
        res.send(true);
    }).catch(e => {
        console.log(e);
        res.send(false);
    });
});
exports.default = router;
