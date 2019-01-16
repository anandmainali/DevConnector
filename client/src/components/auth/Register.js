import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../store/actions/authActions";
import TextFieldGroup from "../../components/common/TextFieldGroup";

class Register extends Component {
  constructor() {
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
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onInputChangeHandler = e => {
    return this.setState({
      [e.target.name]: e.target.value
    });
  };

  formSubmitHandler = e => {
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
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.formSubmitHandler}>
                <TextFieldGroup
                  placeholder="Name"
                  error={errors.name}
                  name="name"
                  value={this.state.name}
                  onChange={this.onInputChangeHandler}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  error={errors.email}
                  name="email"
                  value={this.state.email}
                  onChange={this.onInputChangeHandler}
                  info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  error={errors.password}
                  name="password"
                  value={this.state.password}
                  onChange={this.onInputChangeHandler}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  error={errors.password2}
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onInputChangeHandler}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
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
