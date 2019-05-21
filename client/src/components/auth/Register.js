import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { TextInput } from 'react-materialize';




class Register extends Component {
    constructor () {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user goes to Register page, send them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };

    

    render() {
        const { errors } = this.state;

        return (
            <div className="container center">
                <div className="row">
                    <div className="col s12">
                        <h4 className="register-below">
                            <b>Register</b> below
                        </h4>
                        <p className="account-already">
                            Already have an account? <Link to="/login" className="login-now">&nbsp;Log In</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={this.onSubmit} autoComplete="off">
                        <div className="col s8 offset-s2">
                            <TextInput
                                noLayout="false"
                                onChange={this.onChange}
                                label="Name"
                                value={this.state.name}
                                error={errors.name}
                                id="name"
                                type="text"
                                className={classnames("", {
                                    invalid: errors.name
                                })}
                            />
                        </div>
                        <div className="col s8 offset-s2">
                            <TextInput
                                noLayout="false"
                                onChange={this.onChange}
                                label="Email"
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: errors.email
                                })}
                            />
                        </div>
                        <div className="col s8 offset-s2">
                            <TextInput
                                noLayout="false"                            
                                onChange={this.onChange}
                                label="Password"
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password
                                })}
                            />
                        </div>
                        <div className="col s8 offset-s2">
                            <TextInput 
                                noLayout="false"
                                onChange={this.onChange}
                                label="Confirm Password"
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password2
                                })}
                            />
                        </div>
                        <div className="col s12">
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="sign-up-btn btn btn-large waves-effect waves-light hoverable"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register));