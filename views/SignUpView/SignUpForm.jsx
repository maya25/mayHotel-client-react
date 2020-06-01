import React from 'react'
import { Input } from "@material-ui/core";
import Loader from "react-loader";
import { Redirect } from "react-router-dom";

import Box from "../../components/Box/Box";
import Form from "../../components/Form/Form";
import FormField from "../../components/FormField/FormField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import UserStore from "../../stores/UserStore";

class SignUpForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            email: '',
            password: '',
            _id: '',
            firstname: '',
            lastname: '',
            address: '',
            phone: '',
            loading: false
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        const context = this.context;
        const { email, password, _id, firstname, lastname, address, phone } = this.state;
        try {
            await context.signUp(email, password, _id, firstname, lastname, address, phone);
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

        const { email, password, _id, firstname, lastname, address, phone } = this.state;
        return (
            <Box>
                <Loader loaded={!this.state.loading}>
                    <Form onSubmit={this.handleSubmit} >
                        <FormField title="דואר אלקטרוני">
                            <Input
                                value={email}
                                name="email"
                                onChange={this.handleInputChange}
                                dir="ltr"
                                type="email"
                            />
                        </FormField>
                        <FormField title="סיסמה">
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleInputChange}
                                dir="ltr"
                            />
                        </FormField>
                        <FormField title="מס' תעודת זהות">
                            <Input value={_id} name="_id" onChange={this.handleInputChange} dir="ltr" />
                        </FormField>
                        <FormField title="שם פרטי">
                            <Input value={firstname} name="firstname" onChange={this.handleInputChange} />
                        </FormField>
                        <FormField title="שם משפחה">
                            <Input value={lastname} name="lastname" onChange={this.handleInputChange} />
                        </FormField>
                        <FormField title="מספר טלפון">
                            <Input value={phone} name="phone" onChange={this.handleInputChange} dir="ltr" />
                        </FormField>
                        <FormField title="כתובת מגורים">
                            <Input value={address} name="address" onChange={this.handleInputChange} />
                        </FormField>
                        <SubmitButton>הירשם</SubmitButton>
                    </Form>
                </Loader>
            </Box>
        );
    }
}

SignUpForm.contextType = UserStore;

export default SignUpForm;