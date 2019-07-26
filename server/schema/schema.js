const graphql = require('graphql');
const Work = require('../models/work');
const Workers = require('../models/workers');
const Department = require('../models/department')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;


const WorkType = new GraphQLObjectType({
  name: 'Work',
  fields: () => ({
    id: { type: GraphQLID },
    priority: { type: GraphQLString },
    description: { type: GraphQLString },
    department: {
      type: DepartmentType,
      resolve(parent, args) {
        return Department.findById(parent.department)
      }
    },
    worker: {
      type: WorkersType,
      resolve(parent, args) {
        return Workers.findById(parent.worker)
      }
    }
  })
})

const DepartmentType = new GraphQLObjectType({
  name: 'Department',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
})

const WorkersType = new GraphQLObjectType({
  name: 'Workers',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    department: {
      type: DepartmentType,
      resolve(parent, args) {
        return Department.findById(parent.department)
      }
    },
    skills: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    eachDep: {
      type: WorkType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Work.findById(args.id)
      }
    },
    works: {
      type: new GraphQLList(WorkType),
      resolve(parent, args) {
        return Work.find({})
      }
    },
    workers: {
      type: new GraphQLList(WorkersType),
      resolve(parent, args) {
        return Workers.find({})
      }
    },
    department: {
      type: new GraphQLList(DepartmentType),
      resolve(parent, args) {
        return Department.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDepartment: {
      type: DepartmentType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        let department = new Department({
          name: args.name
        })
        return department.save()
      }
    },
    addWorkers: {
      type: WorkersType,
      args: {
        name: { type: GraphQLString },
        department: { type: new GraphQLNonNull(GraphQLID) },
        skills: { type: GraphQLString }
      },
      resolve(parent, args) {
        let workers = new Workers({
          name: args.name,
          department: args.department,
          skills: args.skills
        })
        return workers.save()
      }
    },
    addWork: {
      type: WorkType,
      args: {
        priority: { type: GraphQLString },
        description: { type: GraphQLString },
        worker: { type: GraphQLString },
        department: { type: GraphQLString }
      },
      resolve(parent, args) {
        let work = new Work({
          priority: args.priority,
          description: args.description,
          worker: args.worker,
          department: args.department
        });
        return work.save()
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
