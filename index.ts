import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import connect from './src/api/src/data/utils/ConnectionUtils';
import router from './src/routes';

dotenv.config();
const PORT = process.env.PORT || 8080;

// connect to database
connect(process.env.ATLAS_URI, process.env.DB_NAME)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(cors({}));
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Không dùng file tĩnh nên bỏ
// app.use(express.static(path.join(__dirname, 'public')));

router(app);

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
