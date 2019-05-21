import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { TextInput } from 'react-materialize';


class Login extends Component {
    constructor () {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If not logged in, user goes to Login page, otherwise send them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); //push user to dashboard when they login
        }

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData); //redirect handled within component, no need to pass in this.props.history as a parameter
    };

    render() {
        const {errors} = this.state;

        return (
            <div className="container center">
                <div style={{ marginTop: "4rem"}} className="row">
                    <div className="col s12">
                        <div className="col s12" style={{ paddingLeft: "11.25px" }}>
                            <h4 className="login-below">
                                <b>Login</b> below
                            </h4>
                            <p className="have-account">
                            Don't Have an Account? 
                            <Link to="/register" className="register-now"> &nbsp;Register Today</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit} autoComplete="off">
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
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                            </div>
                            <div className="col s8 offset-s2">
                                <TextInput
                                    noLayout="false"
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    label="Password"
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password || errors.passwordincorrect
                                    })}
                                />
                            </div>
                            
                            <div className="col s12" style={{ paddingLeft:"11.25px"}}>
                                <button
                                    style={{ 
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="login-btn btn btn-large waves-effect waves-dark hoverable">
                                        Login
                                    </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect (
    mapStateToProps,
    { loginUser}
)(Login);

