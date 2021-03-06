import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { StatusCodes } from 'http-status-codes';
import FakeDataRouter from './routers/fakeData';
 
const app: Koa = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
        await next();
    } catch (error) {
        ctx.status = error.statusCode || error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = { error };
        ctx.app.emit('error', error, ctx);
    }
});


app.use(bodyParser());
app.use(FakeDataRouter.routes());
app.use(FakeDataRouter.allowedMethods());

app.use(async (ctx: Koa.Context) => {
    ctx.body = 'Hello world';
});

app.on('error', console.error);

export default app;