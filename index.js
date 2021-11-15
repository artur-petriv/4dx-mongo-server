const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://4dx_admin:Qqqq4321@cluster0.ighg8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const start = async () => {
  try {
    await client.connect();
    console.log('connected');
    // await client.db().createCollection('movies');
    const movies = client.db().collection('movies');
    // await movies.insertOne({ name: 'The Eternals', year: 2021 });
    const movie = await movies.findOne({ name: 'The Eternals' })
    console.log(movie)
  } catch (e) {
    console.log(e);
  }
}

start();