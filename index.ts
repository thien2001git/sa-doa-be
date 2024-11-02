import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import router from './src/routes';
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors({}));
app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
router(app);
app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
