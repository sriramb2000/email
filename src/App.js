import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Email from './Components/Email';
import Container from 'react-bootstrap/Container';


function App() {
  return (
    <Container>
      <Container style={{marginBottom: 34, marginTop: 24}}><h1 className="banner">prefilled email maker.</h1></Container>
      <Email/>
      <Container style={{marginBottom: 24}}><h6 className="banner">made with 🖤</h6></Container>
    </Container>
    
  );
}

export default App;
