import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
// import { onDocumentCreated } from 'firebase-functions/v2/https';
// import {initializeApp} from "firebase-admin/app";
import {config} from 'dotenv'

import * as express from 'express';
import { authentication } from "./middleware";
import { addController, deductionController, dividerController, multiplyController } from "./controller/calculation.controller";
import { deleteHistoryForUser, getHistoryByUser } from "./controller/history.controller";
import { getUserByToken, signUp } from "./controller/user.controller";

config();

const app = express();

app.post('/add', authentication, addController);

app.post('/deduction', authentication, deductionController);

app.post('/multiply', authentication, multiplyController);

app.post('/divide', authentication, dividerController);

app.get('/history', authentication, getHistoryByUser);

app.delete('/history/:id', authentication, deleteHistoryForUser);

app.get('/signin', authentication, getUserByToken);

app.post('/signup', signUp)

export const calculation = onRequest(app);
