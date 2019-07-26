import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost'
import WorkersList from './components/WorkersList';

const client = new ApolloClient({
  uri: 'http://localhost:3200/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>To-Do App</h1>
          <WorkersList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
