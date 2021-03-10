import React from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import { Container } from "@material-ui/core"
import Nav from "./shared/components/Navigations/Nav";
import ToolList from "./tool/pages/ToolList";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" exact>
              <ToolList />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Container>
      </Router>

    </div>
  );
}

export default App;
