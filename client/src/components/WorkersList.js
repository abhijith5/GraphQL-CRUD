import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getWorks } from '../queries/queries';

class WorkersList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  displayWorks() {
    var data = this.props.data;
    console.log(data)

    if (data.loading) {
      return (<div>Loading ......</div>)
    } else {
      return data.works.map(work => {
        return (
          <ul>
            <li key={work.id} >{work.description}</li>
            <ol>
              <li>{work.department.name}</li>
            </ol>
          </ul>
        )
      })
    }
  }
  render() {
    return (
      <div>
        <ul>
          {this.displayWorks()}
        </ul>
      </div>
    )
  }
}

export default graphql(getWorks)(WorkersList)