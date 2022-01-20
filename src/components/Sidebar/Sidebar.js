import React from "react";
import MyHuddles from "../Huddle/MyHuddles";
import TopNav from "./TopNav";

function Sidebar() {
  return (
    <div className="max-h-screen border-r-2" style={{ flex: 1 }}>
      <div>
        <TopNav />
      </div>
      <div className="overflow-y-auto max-h-full">
        <MyHuddles />
      </div>
    </div>
  );
}

export default Sidebar;
