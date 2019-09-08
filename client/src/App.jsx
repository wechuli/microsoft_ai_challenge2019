import React from "react";
import { Switch, Route } from "react-router-dom";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ImageUpload from "./pages/ImageUpload";

function App() {
  return (
    <>
     <NavBar/>
      <div className="container">
        <Switch>

          <Route exact path="/" component={Home}/>
          <Route exact path="/upload" component={ImageUpload}/>
        </Switch>
      </div>
    </>
  );
}

export default App;
