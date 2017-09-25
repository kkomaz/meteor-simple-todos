import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import Task from './Task.jsx';
import { Tasks } from '../api/tasks.js';

/**
 * Add task via mongo terminal
 * db.tasks.insert({ text: 'Hello World', createdAt: new Date() });
 */

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    Tasks.insert({
      text: this.state.value,
      createdAt: new Date(), //current time
    });

    this.setState({ value: '' });
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <form className="new-task" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Type to add new tasks"
          />
        </form>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
}

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  }
}, App);
