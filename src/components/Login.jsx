import React from 'react';
import axios from 'axios'

class Login extends React.Component {
  constructor() {
    super();
    this.state={
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitForm(event) {
    event.preventDefault()
    const { email, password } = this.state
    const data = { email, password }

    this.setState({
      email: '',
      password: ''
    })

    // Calling Rails Sign-in API.
    axios.post(
      'http://localhost:3001/auth/sign_in',
      {
        email: data.email,
        password: data.password
      }
    )
    .then(response => {
      alert("Sign-in successfully!!!")
      console.log(response)
    })
    .catch(error => {
      alert("Something failed due to error code: " + error.response.status)
      console.log(error)
    })
  }

  render() {
    return(
      <div className="">
        <h3> Login Form </h3>

        <form>
          <p> Email: <input
                      type="text"
                      name='email'
                      value={this.state.email}
                      onChange={this.handleChange}
                      />
          </p>
          <p> Password: <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
          </p>
          <button type="submit" onClick={this.submitForm}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
