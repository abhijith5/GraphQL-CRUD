import { gql } from 'apollo-boost';

const getWorks = gql`
{
  works {
    description
    priority
    worker {
      name
    }
    department {
      name
    }
  }
}
`;

const getWorkers = gql`
{
  workers {
    name
    department {
      name
    }
  }
}
`;

const getDepartment = gql`
{
  department {
    name
  }
}
`;

const addWorks = gql`
mutation AddWork($priority: String!, $description: String!, $department: ID!, $worker: ID!){
  addWork(priority: $priority, description: $description, department: $department, worker: $worker) {
    priority
    descriptions
    worker {
      name
    }
    department {
      name
    }
  }
}
`;

const getEachWork = gql`
query GetEachDep($id: ID){
  eachDep(id: $id) {
    description
    department {
      name
    }
  }
}

`;


export {
  getWorks,
  getWorkers,
  getDepartment,
  addWorks,
  getEachWork
}