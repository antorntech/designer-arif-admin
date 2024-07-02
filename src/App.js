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
import TaskList from "./pages/TaskList";
import AddTaskList from "./pages/AddTaskList";
import EditTaskList from "./pages/EditTaskList";
import EditHeroContent from "./pages/EditHeroContent";
import Qualification from "./pages/Qualification";
import AddExperience from "./pages/AddExperience";
import AddCertification from "./pages/AddCertification";
import EditExperience from "./pages/EditExperience";
import Skills from "./pages/Skills";
import AddSkill from "./pages/AddSkill";
import { EditSkill } from "./pages/EditSkill";
import Reviews from "./pages/Reviews";
import AddReview from "./pages/AddReview";
import { EditReview } from "./pages/EditReview";
import Blogs from "./pages/Blogs";
import AddBlog from "./pages/AddBlog";
import { EditBlog } from "./pages/EditBlog";
import FreeResource from "./pages/FreeResource";
import AddFreeResource from "./pages/AddFreeResource";
import { EditFreeResource } from "./pages/EditFreeResource";
import ServiceCategory from "./pages/ServiceCategory";
import AddServiceCategory from "./pages/AddServiceCategory";
import { EditServiceCategory } from "./pages/EditServiceCategory";
import Services from "./pages/Services";
import AddService from "./pages/AddService";
import { EditServices } from "./pages/EditService";
import EditCertification from "./pages/EditCertification";

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
            <Route
              exact
              path="/edit-hero-content/:id"
              component={EditHeroContent}
            />
            <Route exact path="/task-list" component={TaskList} />
            <Route exact path="/add-task-list" component={AddTaskList} />
            <Route exact path="/edit-task-list/:id" component={EditTaskList} />
            <Route exact path="/service-category" component={ServiceCategory} />
            <Route
              exact
              path="/add-service-category"
              component={AddServiceCategory}
            />
            <Route
              exact
              path="/edit-service-category/:id"
              component={EditServiceCategory}
            />
            <Route exact path="/services" component={Services} />
            <Route exact path="/add-service" component={AddService} />
            <Route exact path="/edit-service/:id" component={EditServices} />
            <Route exact path="/qualification" component={Qualification} />
            <Route
              exact
              path="/qualification/add-experience"
              component={AddExperience}
            />
            <Route
              exact
              path="/qualification/edit-experience/:id"
              component={EditExperience}
            />
            <Route
              exact
              path="/qualification/add-certification"
              component={AddCertification}
            />
            <Route
              exact
              path="/qualification/edit-certification/:id"
              component={EditCertification}
            />
            <Route exact path="/skills" component={Skills} />
            <Route exact path="/skills/add-skill" component={AddSkill} />
            <Route exact path="/skills/edit-skill/:id" component={EditSkill} />
            <Route exact path="/reviews" component={Reviews} />
            <Route exact path="/reviews/add-review" component={AddReview} />
            <Route
              exact
              path="/reviews/edit-review/:id"
              component={EditReview}
            />
            <Route exact path="/blogs" component={Blogs} />
            <Route exact path="/blogs/add-blog" component={AddBlog} />
            <Route exact path="/blogs/edit-blog/:id" component={EditBlog} />
            <Route exact path="/freeresource" component={FreeResource} />
            <Route
              exact
              path="/freeresource/add-freeresource"
              component={AddFreeResource}
            />
            <Route
              exact
              path="/freeresource/edit-freeresource/:id"
              component={EditFreeResource}
            />
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
