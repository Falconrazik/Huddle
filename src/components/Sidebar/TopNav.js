import React, { useState, useContext } from "react";
import { Modal } from '../Modal';
import { HUDDLE_COLORS } from "../../common/colors";
import PillProfile from "./PillProfile";
import { ModalContext } from "../../index"
import { ProfileContext } from "../../common/contexts/profile.context";


function TopNav() {
  const {setIsModalOpen: onButtonClick} = useContext(ModalContext);
  const { setIsProfileOpen, i } = React.useContext(ProfileContext);
  

  return (
    <div
      className="flex justify-around p-3 h-16 w-full"
      style={{ backgroundColor: HUDDLE_COLORS.darkRedCandy }}
    >
      < img onClick={() => setIsProfileOpen(false)} src="/logo.svg" alt="logo" className="cursor-pointer"/>
      <PillProfile username={"Vincent"} pfpURL={"as"} />
      <button className=" hover:text-red-600 text-white font-bold py-0 px-4 text-3xl transition" onClick={() => onButtonClick(true)}>+</button>
    </div>
  );
}

export default TopNav