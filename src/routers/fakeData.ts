import KoaRouter from "koa-router";
import { StatusCodes } from 'http-status-codes';
import {v4} from 'uuid';

const router = new KoaRouter({
    prefix: '/fake-data'
});

const collections: Map<string, Map<string, any>> = new Map(); 

router.get('/', (ctx) => {
    ctx.body = [...collections.keys()];
});

router.get('/:collection', (ctx) => {
    const collection = collections.get(ctx.params.collection);

    ctx.body = {
        collectionName: ctx.params.collection,
        values: [...collection.entries()].map((entry) => {
            return {id: entry[0], value: entry[1]}
        })
    }
});

router.get('/:collection/:id', (ctx) => {
    const collection = collections.get(ctx.params.collection);
    const entry = collection?.get(ctx.params.id);

    ctx.status = StatusCodes.OK;
    ctx.body = entry || "no value";
});

router.post('/:collectionKey', (ctx) => {
    const {collectionKey} = ctx.params;
    const collection = collections.get(collectionKey) || new Map();
    let { id, ...payload } = ctx.request.body; 

    id = id || v4();
    
    const lookupValue = collection.get(id) || payload;
    collection.set(id, lookupValue);
    collections.set(collectionKey, collection);

    ctx.body = {
        url: `https://localhost:3000/fake-data/${ctx.params.collection}`,
        id,
        payload: payload
    };

    ctx.status = StatusCodes.CREATED;
})

export default router