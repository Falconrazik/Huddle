import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Login from "./components/Form/Login";
import AppPage from "./pages/AppPage";
import { getAuth } from "firebase/auth";
import React from "react";
import { MeContext } from "./common/contexts/me.context";
import { ModalContext } from "./index";
import { ProfileContext } from "./common/contexts/profile.context";

export const ViewingGroupContext = React.createContext();

function App() {
  const [me, setMe] = React.useState({
    id: "",
    created_at: "",
    updated_at: "",
    first_name: "",
    last_name: "",
    gender: "",
    interests: [],
    major: "",
    university: "",
    vintage: "",
    member_of: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingGroup, setViewingGroup] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <Routes>
      <Route path="/register" element={<Form />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/app"
        element={
          <MeContext.Provider value={{ me, setMe }}>
            <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
              <ViewingGroupContext.Provider
                value={{ viewingGroup, setViewingGroup }}
              >
                <ProfileContext.Provider
                  value={{ isProfileOpen, setIsProfileOpen }}
                >
                  <AppPage />
                </ProfileContext.Provider>
              </ViewingGroupContext.Provider>
            </ModalContext.Provider>
          </MeContext.Provider>
        }
      />
    </Routes>
  );
}

export default App;
