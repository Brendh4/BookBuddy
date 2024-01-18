import { useState } from 'react';
import Container from '../../components/Container';
import Col from '../../components/Col';
import Row from '../../components/Row';

const Signup = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('username is ' + username);
    console.log('password is ' + password);
  };

  return (
    <div>
      <div className="mt-4">
        <h2 className="text-center">Welcome to Wikipedia Searcher!</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <Container className="mt-3 mb-5 px-5">
          <Row className="mb-3">
            <Col size="12">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col size="12">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </div>
        </Container>
        <Container className="mt-4 d-flex justify-content-center">
          <div className="w-30">
            <h3>Hello {username}!</h3>
            <p>
              I probably shouldn't tell you this, but your password is{' '}
              {password}!
            </p>
          </div>
        </Container>
      </form>
    </div>
  );
};

export default Signup;
