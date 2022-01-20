import React from "react";
import { ViewingGroupContext } from "../../App";
import HuddleDetails from "../Huddle/HuddleDetails";
import UserProfile from "../UserProfile/UserProfile";
import HuddlesFeed from "./HuddlesFeed";
import { ProfileContext } from "../../common/contexts/profile.context";
import SecondarySection from "./SecondarySection";

function RightSection() {
  const { viewingGroup } = React.useContext(ViewingGroupContext);
  const { isProfileOpen } = React.useContext(ProfileContext);

  return (
    <div style={{ flex: 3 }} className="flex w-full h-screen">
      <div className="flex flex-col w-full p-3 items-center">
        {!viewingGroup && <HuddlesFeed />}
        {viewingGroup && <HuddleDetails />}
      </div>
      {isProfileOpen && (
        <SecondarySection>
          <UserProfile />
        </SecondarySection>
      )}{" "}
    </div>
  );
}

export default RightSection;
