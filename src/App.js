import { Button, FormControl, IconButton, Input, InputLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from "react-flip-move"
import SendIcon from '@material-ui/icons/Send';

function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
  }

  useEffect(() => {
    db.collection("messages").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, [])

  return (
    <div className="App">
      <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202010/Screenshot_2020-10-14_at_1.42._1200x768.png?UShl3_oE5u3ZKwzCwy2pjKiFeeQoMrFV&size=350:200" alt=""/>
      <h1>I challenge build Facebook Messenger clone with React from now on 🚀</h1>
      <h2>Welcome { username }</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter a message..." value={ input } onChange={ (e) => setInput(e.target.value) } />
          <IconButton className="app__iconButton" disabled={ !input } variant="contained" color="primary" type="submit" onClick={ sendMessage }>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

    <FlipMove>
      {
        messages.map(({ id, message }) => (
          <Message key={ id } username={ username } message={ message }/>
        ))
      }
    </FlipMove>
    </div>
  );
}

export default App;
