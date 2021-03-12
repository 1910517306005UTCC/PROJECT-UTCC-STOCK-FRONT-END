import React from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import { Container } from "@material-ui/core"
import Nav from "./shared/components/Navigations/Nav";
import ToolList from "./tool/pages/ToolList";
import CreateTool from "./tool/pages/CreateTool";

import "./App.css"
import CreateBoard from "./board/page/CreateBoard";
import CreateProject from "./board/page/CreateProject";
import BoardList from "./board/page/BoardList";
import BoardRequest from "./board/page/BoardRequest";

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
            <Route path="/tool/new">
              <CreateTool />
            </Route>
            <Route path="/board/list">
              <BoardList />
            </Route>
            <Route path="/board/request">
              <BoardRequest />
            </Route>
            <Route path="/board/new">
              <CreateBoard />
            </Route>
            <Route path="/project/new">
              <CreateProject />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Container>
      </Router>

    </div>
  );
}

export default App;
