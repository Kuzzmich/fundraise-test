const Router = require('koa-router');
const router = new Router();
const mongo = require('./db');

router.post('/donate', async ctx => {
  const allowedCurrencies = ['USD', 'EUR', 'GBP', 'RUB'];
  const { body } = ctx.request;

  if (body.amount <= 0 || !allowedCurrencies.includes(body.currency)) {
    throw new Error('Error. Check the currency and entered amount');
  }

  const client = await mongo.getMongoClient();
  const db = client.db(mongo.dbName);
  const result = await db.collection(mongo.collectionName).insertOne(body);

  ctx.body = {
    ok: true
  };
});


module.exports = router;
