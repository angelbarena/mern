import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
const DashBoard = () => <h2>DashBoard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={DashBoard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
