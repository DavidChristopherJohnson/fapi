import KoaRouter from "koa-router";

const router = new KoaRouter({
    prefix: '/fake-data'
});

router.get('/', (ctx) => {
    ctx.body = "hit dater faker"
});

export default router