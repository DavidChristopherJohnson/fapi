import KoaRouter from "koa-router";
import { StatusCodes } from 'http-status-codes';

const router = new KoaRouter({
    prefix: '/fake-data'
});

const collections: Map<string, Map<string, any>> = new Map(); 

router.get('/', (ctx) => {
    ctx.body = "hit dater faker"
});

router.post('/:collection', (ctx) => {
    console.log("input: ", ctx.request.body);
    let { id, ...payload } = ctx.request.body; 

    id = id || 'aaaa';
    
    console.log(id, payload);
    ctx.request.body

    ctx.body = {
        url: `https://localhost:3000/fake-data/${ctx.params.collection}`,
        id,
        payload: payload
    };

    ctx.status = StatusCodes.CREATED;
})

export default router