const mongoose = require('mongoose');

const connectDB = async() =>{

	//console.log(process.env.MONGO_URL)
	const conn = await mongoose.connect(process.env.MONGO_URL);

	console.log(`MongoDB Connected: ${conn.connection.host}`)
}



module.exports = connectDB; 