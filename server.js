const Koa = require('koa');
const bodyParser = require('koa-parser');


const router = require('./routes');

const app = new Koa();
const PORT = 4000;

const db = require('./models');

const start = async () => {
    try {
        await db.sequelize.sync({ force: true })
            .then(() => console.log('Database models have synced'))
            .catch((err) => console.log(err));

        app.context.db = db;
        app.use(bodyParser());

        app.use(router.routes());

        app.listen(PORT, () => {
            console.log(`Server started and listening on a port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

start();