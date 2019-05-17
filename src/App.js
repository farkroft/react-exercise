import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';

// class based components called statefull components
class App extends Component {
  state = {
    persons: [
      { id: 'asd1', name: 'Max', age: 28 },
      { id: 'asd2', name: 'Manu', age: 29 },
      { id: 'asd3', name: 'Anggi', age: 30 }
    ],
    showPersons: false
  }

  // to change person name from input
  nameChangedHandler = (event, id) => {
    // to get the index of id that pass
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })

    // const person = Object.assign({}, this.state.persons[personIndex]);
    // old approach, use ES6 instead
    // to get the object whose index get from personIndex and store it to variable
    const person = {
      ...this.state.persons[personIndex]
    };

    // get the name value from event 
    person.name = event.target.value;

    // react way to indirectly mutate object after we copy the value
    // copas from state
    const persons = [...this.state.persons];
    // get the object and index and assign it to variable
    persons[personIndex] = person;

    // set the state with the value
    this.setState({ persons: persons });
  }

  temp = [];

  // delete person card
  deletePersonHandler = (personIndex) => {
    // const person = this.state.person.slice();
    const persons = [...this.state.persons];
    this.temp.push(persons[personIndex]);
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  // to show/hide person cards
  tooglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid black',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style.color = 'black';
      style[':hover'] = {
        backgroundColor: 'blue',
        color: 'black'
      }
      
      if (this.state.persons.length === 0) {
        const doesShow = this.state.showPersons;
        this.setState({ showPersons: !doesShow });
        this.setState({ persons: this.temp})
        this.temp = [];
      }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm React App</h1>
          <p className={classes.join(' ')}>This is really working</p>
          <button
            style={style}
            onClick={this.tooglePersonHandler}>Toogle Person</button>
          {persons}
        </div>
      </StyleRoot>
      
    );
  }
}

export default Radium(App);
