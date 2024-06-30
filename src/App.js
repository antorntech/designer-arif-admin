import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.min.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderMenu from "./pages/HeaderMenu";
import AddHeadMenu from "./pages/AddHeadMenu";
import AddHeroContent from "./pages/AddHeroContent";
import HeroContent from "./pages/HeroContent";
import EditHeadMenu from "./pages/EditHeadMenu";

function App() {
  const user = JSON.parse(localStorage.getItem("token"));

  return (
    <div className="App">
      {user ? (
        <Switch>
          <Main>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/head-menu" component={HeaderMenu} />
            <Route exact path="/add-head-menu" component={AddHeadMenu} />
            <Route exact path="/edit-head-menu/:id" component={EditHeadMenu} />
            <Route exact path="/hero-content" component={HeroContent} />
            <Route exact path="/add-hero-content" component={AddHeroContent} />
            <Redirect from="*" to="/dashboard" />
          </Main>
        </Switch>
      ) : (
        <Switch>
          <Route path="/sign-in" exact component={SignIn} />
          <Redirect from="*" to="/sign-in" />
        </Switch>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
