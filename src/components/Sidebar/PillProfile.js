import React, { useState, useContext } from "react";
import { HUDDLE_COLORS } from "../../common/colors";
import { ProfileContext } from "../../common/contexts/profile.context";

function PillProfile({ username, pfpURL }) {
  const { setIsProfileOpen, i } = React.useContext(ProfileContext);

  return (
    <div
      className="flex p-2 rounded-3xl"
      style={{ backgroundColor: HUDDLE_COLORS.candyPink }}
    >
      {pfpURL !== null && (
        <button onClick={() => setIsProfileOpen(true)}> 
          {pfpURL && <img
            src={pfpURL}
            alt={`Profile picture ${username}`}
            className="rounded-full"
          />} 
        </button>
      )}
      <p>
        <button className="text-white font-bold" onClick={() => setIsProfileOpen(true)} style={{ color: HUDDLE_COLORS.darkBrown }}>{username}</button>
      </p>
    </div>
  );
}

export default PillProfile;
