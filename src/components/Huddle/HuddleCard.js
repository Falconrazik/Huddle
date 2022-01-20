import React from "react";
import { ViewingGroupContext } from "../../App";
import { HUDDLE_COLORS } from "../../common/colors";
import { useGroupsFeed } from "../../common/stores/groups";

function HuddleCard({ id, coverURL, name, members, min }) {
  const { setViewingGroup } = React.useContext(ViewingGroupContext);

  return (
    <div
      style={{
        backgroundImage: `url(${coverURL})`,
        backgroundSize: "cover",
        borderColor: HUDDLE_COLORS.kaleGreen,
      }}
      className="w-72 h-96 border-2 rounded-2xl text-white cursor-pointer hover:scale-105 transform transition"
      key={id}
      onClick={() => {
        setViewingGroup(id);
      }}
    >
      <div className="flex flex-col w-full h-full p-2 rounded-xl bg-black bg-opacity-30">
        <div style={{ flex: 4 }} />
        <div style={{ flex: 1 }}>
          <div className="flex flex-col text-2xl font-bold">{name}</div>
          {members && <div>Needs {min - members?.length} more members!</div>}
        </div>
      </div>
    </div>
  );
}

export default HuddleCard;
