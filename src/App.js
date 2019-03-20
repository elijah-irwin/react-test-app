import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
    let persons = null;
    let btnClass = '';

    if (this.state.showList) {
      persons = (
        <div>
          { this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
                <Person 
                name={person.name} 
                age={person.age}
                click={() => this.deletePersonHandler(index)}
                changed={(event) => this.nameChangedHandler(event, person.id)}/>
              </ErrorBoundary>
          }) }    
        </div>
      );
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if(this.state.persons.length <= 2) assignedClasses.push(classes.red);
    if(this.state.persons.length <= 1) assignedClasses.push(classes.bold);

    return (
      <div className={classes.App}>
        <h1>Mak's React Apperino</h1>
        <p className={assignedClasses.join(' ')}>FeelsGoodMan</p>

        {/* this is less efficient than switchHandler.bind */}
        <button className={btnClass} onClick={this.togglePersonsHandler}>Show People</button>

        { persons }
      </div>
    );
  }
}

export default App;
