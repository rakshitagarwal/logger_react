import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header/Header";
import Login from "./pages/Login/Login";

import ProjectPage from "./pages/ProjectPage/ProjectPage";
import AddProject from "./pages/AddProject/AddProject";

import ProtectedRoute from "./pages/protectedRoutes/ProtectedRoute";
import ErrorLog from "./pages/errorLog/errorLog";

import ProjectView from "./pages/projectViews/ProjectView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { tokenAction } from "./redux/actions/userAction";
// import "./assets/module.css";
function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tokenAction());
  }, []);
  return (
    <Router>
      {isAuthenticated && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/projectpage" element={<ProjectPage />} />
          <Route path="/projectpage/:id" element={<ProjectPage />} />

          <Route path="/errorLog" element={<ErrorLog />} />
          <Route path="/projectPage/createproject" element={<AddProject />} />
          <Route path="/projectPage/updateProject" element={<AddProject />} />
          <Route path="/projectView" element={<ProjectView />} />
        </Route>

        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </Router>
  );
}

export default App;
