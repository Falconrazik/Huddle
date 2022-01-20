import React, { useState } from "react";
import { HUDDLE_COLORS } from "../common/colors";
import Sidebar from "../components/Sidebar/Sidebar";
import RightSection from "../components/RightSection/RightSection";
import { getAuth } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { ModalContext } from "..";
import { gql, useLazyQuery } from "@apollo/client";
import { getMeBrief } from "../common/queries";
import { MeContext } from "../common/contexts/me.context";

function AppPage() {
  const { isModalOpen } = React.useContext(ModalContext);
  const { me, setMe } = React.useContext(MeContext);
  const { setIsModalOpen, i } = React.useContext(ModalContext);
  const [getMeQuery, { data, loading, error }] = useLazyQuery(gql(getMeBrief));

  const [photoURL, setPhotoURL] = React.useState("");

  const { currentUser } = getAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) navigate("/login");
    else {
      getMeQuery({ variables: { email: currentUser.email } });
    }
  }, [currentUser, data]);

  React.useEffect(() => {
    if (data && data.users.length === 0) {
      navigate("/login");
    } else if (!loading && data) {
      setMe((prev) => ({
        ...prev,
        email: currentUser.email,
        ...data.users[0],
      }));
    }
  }, [loading, data]);

  return (
    <div
      className="relative flex w-screen max-h-screen"
      style={{ backgroundColor: HUDDLE_COLORS.paleCandyPink }}
    >
      <Sidebar />
      <RightSection />

      {isModalOpen && (
        <div
          className="fixed flex items-center justify-center inset-0 bg-opacity-40 bg-black"
          onClick={() => setIsModalOpen(false)}
        >
          <Modal />
        </div>
      )}
    </div>
  );
}

export default AppPage;
