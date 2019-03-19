import React, { Component } from 'react';
import './App.css';

import Person from './Person/Person';

class App extends Component {
  
  state = {
    persons: [
      {id: 1, name: 'Mckenzie', age: 21},
      {id: 2, name: 'Skye', age: 24},
      {id: 3, name: 'Nicole', age: 17}
    ],
    showList: false
  }

  // change username based on input value
  nameChangedHandler = (event, id) => {
    // best practice btw

    // find the array index of individual person object based on id 
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // create copy of that person object
    const person = { ...this.state.persons[personIndex] }

    // update the name of the copied person based on the event value (input text value)
    person.name = event.target.value;

    // copy the persons array from state
    const persons = [...this.state.persons];

    // update the person at the found index in the copied persons array to be the updated person
    persons[personIndex] = person;

    // update the state with the copied/updated persons array
    this.setState({ persons: persons })
  }

  // visually shows/hides the persons list content when the show people button is clicked
  togglePersonsHandler = () => {
    const show = this.state.showList;
    this.setState({showList: !show})
  };

  // deletes person from state list when first paragraph is clicked on
  deletePersonHandler = (index) => {
    // copy the persons array *important to copy array to avoid directly referencing/modifying array in memory
    const persons = [...this.state.persons];

    // remove the person at index
    persons.splice(index, 1);

    // update persons array state with modified copied array 
    this.setState({persons: persons});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      padding: '8px',
      cursor: 'pointer',
    };

    let persons = null;
    if (this.state.showList) {
      persons = (
        <div>
          { this.state.persons.map((person, index) => {
            return <Person 
              name={person.name} 
              age={person.age}
              click={() => this.deletePersonHandler(index)}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          }) }    
        </div>
      );

      style.backgroundColor = 'red';
    }

    let classes = [];
    if(this.state.persons.length <= 2) classes.push('red');
    if(this.state.persons.length <= 1) classes.push('bold');

    return (
      <div className="App">
        <h1>Mak's React Apperino</h1>
        <p className={classes.join(' ')}>FeelsGoodMan</p>

        {/* this is less efficient than switchHandler.bind */}
        <button style={style} onClick={this.togglePersonsHandler}>Show People</button>

        { persons }
      </div>
    );
  }
}

export default App;
