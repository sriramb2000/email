import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Email.css';
import Email from './Components/Email';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';


function App() {
  return (
    <Container>
      <Container style={{marginBottom: 34, marginTop: 24}}><h1 className="banner">prefilled email maker.</h1></Container>
      <Email/>
      <Container><h6 className="banner">made with 🖤</h6></Container>
    </Container>
    
  );
}

export default App;
