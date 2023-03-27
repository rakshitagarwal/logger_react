import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header/Header";
import Login from "./pages/Login/Login";
import Registration from "./component/Registration/Registration";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import AddProject from "./pages/AddProject/AddProject";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import ProtectedRoute from "./pages/protectedRoutes/ProtectedRoute";
import ErrorLog from "./pages/errorLog/errorLog";
import ProjectView from "./pages/projectViews/ProjectView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { tokenAction } from "./redux/actions/userAction";
import Layout from "./layout/outlet/Layout";
// import "./assets/module.css";
function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tokenAction());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="projectpage" element={<Layout />}>
          <Route
            index
            element={<ProjectPage />}
          />
           <Route
            path="projectpage"
            element={<ProjectPage />}
          />
          <Route
            path="updateProject"
            element={<AddProject />}
          />
          <Route
            path="createproject"
            element={<AddProject />}
          />
           <Route
            path="errorLog"
            element={<ErrorLog />}
          />
          {/*<Route
            path="/createproject/"
            element={<AddProject />}
          />
          <Route
            path="/projectView"
            element={<ProjectView />
            }
          /> */}

        </Route>
        {/* <Route path="/registration" element={<Registration />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
      
        {/* /> */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
