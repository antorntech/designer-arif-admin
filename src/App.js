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
import About from "./pages/About";
import AddAbout from "./pages/AddAbout";
import EditAbout from "./pages/EditAbout";
import FooterMenu from "./pages/FooterMenu";
import AddFooterMenu from "./pages/AddFooterMenu";
import EditFooterMenu from "./pages/EditFooterMenu";
import Notification from "./pages/Notification";
import Settings from "./pages/Settings";
import AddSetting from "./pages/AddSetting";
import { EditSetting } from "./pages/EditSetting";

import Slider from "./pages/Slider";
import AddSlider from "./pages/AddSlider";
import { EditSlider } from "./pages/EditSlider";
import VideoAnimations from "./pages/VideoAnimations";
import AddVideoAnimation from "./pages/AddVideoAnimation";
import { EditVideoAnimation } from "./pages/EditVideoAnimation";

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
            <Route exact path="/slider" component={Slider} />
            <Route exact path="/slider/add-slider" component={AddSlider} />
            <Route
              exact
              path="/slider/edit-slider/:id"
              component={EditSlider}
            />
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
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/settings/add-setting" component={AddSetting} />
            <Route
              exact
              path="/settings/edit-setting/:id"
              component={EditSetting}
            />
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
            <Route exact path="/videoanimations" component={VideoAnimations} />
            <Route
              exact
              path="/videoanimations/add"
              component={AddVideoAnimation}
            />
            <Route
              exact
              path="/videoanimations/edit/:id"
              component={EditVideoAnimation}
            />
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
            <Route exact path="/about" component={About} />
            <Route exact path="/about/add-about" component={AddAbout} />
            <Route exact path="/about/edit-about/:id" component={EditAbout} />
            <Route exact path="/footer-menu" component={FooterMenu} />
            <Route
              exact
              path="/footer-menu/add-footer-menu"
              component={AddFooterMenu}
            />
            <Route
              exact
              path="/footer-menu/edit-footer-menu/:id"
              component={EditFooterMenu}
            />
            <Route exact path="/notification" component={Notification} />
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
