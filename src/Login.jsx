import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POST } from './api';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useAuth } from './AuthProvider';
import getURL from './api/config';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { username, password }
      const response = await POST(getURL('LOGIN'), payload);

      login(response.data.token)
      navigate('/users'); 
    } catch (error) {
      setError('Invalid username or password');
    }
  };
// navigate dashboard in progress
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">AuthenTech, Inc.</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className='mt-5'>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <div className="login-form">
              <div className="d-flex flex-column align-items-center mb-2">
                <img src={"https://cdn-icons-png.flaticon.com/128/9850/9850774.png"} width="30%" alt="Logo" />
                <h5>
                  Authentech Database
                  Subsystem
                </h5>
                
              </div>
              <div className="card" style={{ border: "info",
                   borderRadius: '30px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    padding: '40px', }}>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername" className='mb-2'>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        className="form-control-sm rounded-0"
                        type="username"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className='mb-2'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        className="form-control-sm rounded-0"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formButton" className='mb-2'>
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      <Button
                        variant="dark"
                        className="btn btn-block bg-custom btn-flat rounded-0"
                        size="sm"
                        block="block"
                        type="submit"
                      >
                        Login
                      </Button>
                    </Form.Group>
                  </form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
