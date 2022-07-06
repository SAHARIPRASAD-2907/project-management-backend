// Importing modules
const express = require("express");
const { graphqlHTTP } = require('express-graphql');
require("dotenv").config();
const schema = require("./schemas/schema")

const port = process.env.PORT || 8000;

// Setting up express server
const app = express();

// Setting up graphQL endpoints
app.use('/graphql',
	graphqlHTTP({
	schema,
	graphiql: process.env.NODE_ENV === "development"
}))


app.listen(port, console.log(`server running on port ${port}`));
