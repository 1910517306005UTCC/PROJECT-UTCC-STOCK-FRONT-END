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
import EditProfile from "./user/pages/EditProfile";
import DetailTool from "./tool/pages/DetailTool";
import DetailBoard from "./board/page/DetailBoard";
import EditBoard from "./board/page/EditBoard";
import EditTool from "./tool/pages/EditTool";
import BoardIncomplete from "./board/page/BoardIncomplete";
import HistoryTool from "./tool/pages/HistoryTool";
import HistoryBoard from "./board/page/HistoryBoard";
import HistoryProject from "./board/page/HistoryProject";
import DetailHistoryProject from "./board/page/DetailHistoryProject";
import EditProject from "./board/page/EditProject";
import Home from "./Home";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";
import Profile from "./user/pages/Profile";


function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/tool/list" exact>
              <ToolList />
            </Route>
            <Route path="/tool/new">
              <CreateTool />
            </Route>
            <Route path="/:tid/tool" exact>
              <DetailTool />
            </Route>
            <Route path="/tool/:bid" exact>
              <EditTool />
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
            <Route path="/:bid/board" exact>
              <DetailBoard />
            </Route>
            <Route path="/board/:bid">
              <EditBoard />
            </Route>
            <Route path="/boardincomplete">
              <BoardIncomplete />
            </Route>
            <Route path="/project/new">
              <CreateProject />
            </Route>
            <Route path="/historytool">
              <HistoryTool />
            </Route>
            <Route path="/historyboard">
              <HistoryBoard />
            </Route>
            <Route path="/historyproject">
              <HistoryProject />
            </Route>
            <Route path="/:hid/project">
              <DetailHistoryProject />
            </Route>
            <Route path="/project/:pid">
              <EditProject />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/profile/id">
              <EditProfile />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Container>
      </Router>

    </div>
  );
}

export default App;
