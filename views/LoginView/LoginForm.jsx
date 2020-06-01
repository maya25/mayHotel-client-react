import React from "react";
import { Input } from "@material-ui/core";
import styled from "styled-components";
import Form from "../../components/Form/Form";
import FormField from "../../components/FormField/FormField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import UserStore from "../../stores/UserStore";
import { Redirect } from "react-router-dom";
import Loader from "react-loader";
import Box from "../../components/Box/Box";

const SignupButton = styled.button`
position: relative;
top: 10px;
padding: 15px 5px;
width: 100%;
background-color: #fff;
box-sizing: border-box;
border-radius: 7px;
border-style: solid;
border-color: #0099ff;
border-width: 2.5px;
color: #0099ff;
font-size: 16px;
text-align: center;
`;

class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      email: "amit@gmail.com",
      password: "123456789",
      loading: false,
      signup: false
    };
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const context = this.context;
    try {
      await context.login(this.state.email, this.state.password);
      this.setState({ isLoggedIn: true, loading: false });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const context = this.context;
    if (context.isLoggedIn) return <Redirect to="/" />;
    if (this.state.signup) return <Redirect to="/signup" />;

    return (
      <Box>
        <Loader loaded={!this.state.loading}>
          <Form onSubmit={this.handleSubmit}>
            <FormField title="דואר אלקטרוני">
              <Input
                value={this.state.email}
                name="email"
                onChange={this.handleInputChange}
                dir="ltr"
              />
            </FormField>
            <FormField title="סיסמה">
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                dir="ltr"
              />
            </FormField>

            <SubmitButton>התחבר</SubmitButton>
            <SignupButton onClick={() => this.setState({ signup: true })}>משתמש חדש? הירשם</SignupButton>

          </Form>
        </Loader>
      </Box>
    );
  }
}

LoginForm.contextType = UserStore;

export default LoginForm;
