import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
// import { onDocumentCreated } from 'firebase-functions/v2/https';
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';




export const add = onRequest(async (request, response) => {
    const {first, second, from, to, rate}: any = request.body;
    console.log('from is ', from);
    console.log('to is ', to);
    console.log('rate is ', rate);
    response.json({
        result: Number(first + second)
    });
});

export const deduction = onRequest(async (request, response) => {
    const {first, second, from, to, rate}: any = request.body;
    console.log('from is ', from);
    console.log('to is ', to);
    console.log('rate is ', rate);
    response.json({
        result: Number(first - second)
    })
});

export const multiply = onRequest(async (request, response) => {
    const {first, second, from, to, rate}: any = request.body;
    console.log('from is ', from);
    console.log('to is ', to);
    console.log('rate is ', rate);
    response.json({
        result: Number(first * second)
    })
})

export const divide = onRequest(async (request, response) => {
    const {first, second, from, to, rate}: any = request.body;
    console.log('from is ', from);
    console.log('to is ', to);
    console.log('rate is ', rate);
    response.json({
        result: Number(first / second)
    })
})

initializeApp();