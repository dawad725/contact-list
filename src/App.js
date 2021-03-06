import { Switch, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import ContactList from './ContactList';
import IndividualContact from './IndividualContact';
import AddContact from './AddContact'
import EditContact from './EditContact'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

//Function that holds state and takes information from other components 
class App extends Component {
  constructor() {
    super()

    // This is where state lives. When new contact is added in the individual contact component
    // they get added to this data structure by the addcontact function 
    this.state = {
      contacts: [
        { id: 1, name: 'Jerry Seinfeld', number: '919-450-2551', email: 'jerry@gmail.com', imageUrl: 'https://media1.giphy.com/media/e2QYPpUe8WmpG/giphy.gif' },
        { id: 2, name: 'Cosmo Kramer', number: '919-450-2111', email: 'theK-man@gmail.com', imageUrl: 'https://media.giphy.com/media/4WBuU8k2fwaSk/giphy.gif' },
        { id: 3, name: 'Elaine Benes', number: '919-450-2431', email: 'elaine@gmail.com', imageUrl: 'https://melmagazine.com/wp-content/uploads/2018/08/1Xx_bauNjZ_fhN4Jk2JwoKg.gif' },
        { id: 4, name: 'George Costanza', number: '919-450-2431', email: 'george@gmail.com', imageUrl: 'https://i.gifer.com/4KNI.gif' }
      ]

    }

  }
  // When a new contact is added, this function validates the the input that comes in.
  // From there is gets added to state 
  addContact = (contact) => {
    const generateId = () => Math.round(Math.random() * 100000000);

    const newContact = {
      id: generateId(),
      name: contact.name,
      email: contact.email,
      imageUrl: contact.imageUrl,
      number: contact.number
    }

    this.setState({ contacts: this.state.contacts.concat([newContact]) });
  }


  removeContact = (contact) => {
    let array = [...this.state.contacts];
    let contactIndex = this.state.contacts.findIndex(c => c.id == contact)
    if (contactIndex !== -1) {
      array.splice(contactIndex, 1)
      this.setState({ contacts: array })
    }

  }

  // editContact = (contact) => {
  //   console.log("poop")
  //   let array = [...this.state.contacts];
  //   let contactIndex = this.state.contacts.findIndex(c => c.id == contact);

  //   console.log(array, "array")
  //   console.log(contactIndex, "contactIndex")
  //   if (contactIndex !== -1) {
  //     array[contactIndex].name = "Farva"
  //     array[contactIndex].email = "Farva"
  //     array[contactIndex].number = "Farva"
  //     this.setState = ({
  //       contacts: array
  //     })
  //   }

  // }

  editButtonClick = (contact) => {
    this.state.history.push("./")
  }

  render() {
    return (

      <Switch>
        <Route exact path={['/', '/contacts']} render={() => (
          <div className="App">
            <header className="App-header"></header>
            <div className="App-intro">
              <div className="row">
                <div className="container col-8">
                  <h1 className="App-title">My Contact List</h1>
                  <ContactList contacts={this.state.contacts} removeContact={this.removeContact} editContact={this.editContact}></ContactList>
                  <Link to="/contacts/new">
                    <button type="button" className="addButton btn btn-secondary">
                      Add New Contact
                 </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )} />
        <Route exact path="/contacts/new" render={() => (<AddContact addContact={this.addContact} />)} />
        <Route exact path="/contacts/:id" render={(props) => (
          <IndividualContact contacts={this.state.contacts} props={props} editContact={this.editContact} />)} />
        <Route exact path="/contacts/:id/edit" render={(props) => (
          <EditContact contacts={this.state.contacts} props={props} />)} />
      </Switch>


    );
  }

};




export default App;


