const { projects,clients } = require("../sampleData.js")

const { GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList } = require('graphql')

// Client Type
const ClientType = new GraphQLObjectType({
	name:'Client',
	fields:()=>({
		id:{type:GraphQLID},
		name:{type:GraphQLString},
		email:{type:GraphQLString},
		phone:{type:GraphQLString}
	})
});

// Project Type
const ProjectType = new GraphQLObjectType({
	name:'Project',
	fields:()=>({
		id:{type:GraphQLID},
		name:{type:GraphQLString},
		description:{type:GraphQLString},
		status:{type:GraphQLString},
		client:{
			type:ClientType,
			resolve(parent,args){
				return clients.find(client => client.id === parent.clientId)
			}
		}
	})
})

// Root query for getting information 
const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields:{
		// Fetching all projects
		projects:{
			type:new GraphQLList(ProjectType),
			resolve(parent,args){
				return projects
			}
		},
		// Fetching all clients
		clients:{
			type:new GraphQLList(ClientType),
			resolve(parent,args){
				return clients
			}
		},
		// fetching client by id
		client:{
			type:ClientType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				return clients.find(client => client.id === args.id)
			}
		},
		// fetching project by id
		project:{
			type:ProjectType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				return projects.find(project=>project.id === args.id)
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query:RootQuery
})