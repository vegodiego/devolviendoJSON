const express = require('express');
const mongoose = require("mongoose");


const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var schema = mongoose.Schema({
  name: String,
  price: Number  
});

var Product = mongoose.model("Product", schema)


app.get('/products', async (req, res) => {
	res.set({
		"Content-Type": "application/json"
	});
	const products = await Product.find({});
	res.json(products);
});

app.listen(3000, () => console.log('Listening on port 3000!'));


