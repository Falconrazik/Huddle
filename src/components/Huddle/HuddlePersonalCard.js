import React from "react";
import { HUDDLE_COLORS } from "../../common/colors";
import { useGroupsFeed } from "../../common/stores/groups";

function HuddlePersonalCard({ id, name, members, hasNotif }) {
  const groupsFeed = useGroupsFeed(state => state.groupsFeed)

  return (
    <div
      className={`flex rounded-lg h-32 w-full bg-white ${hasNotif}`}
      style={{ border: hasNotif ? `3px solid ${HUDDLE_COLORS.kaleGreen}` : 0 }}
      key={id}
    >
      <div style={{ flex: 1 }} />
      <div style={{ flex: 3 }} className="flex flex-col p-2">
        <div className="font-bold text-xl">{groupsFeed.name}</div>
        <div className="text-lg text-gray-400">{groupsFeed.members.length} members</div>
        <button className=""></button>
      </div>
    </div>
  );
}

export default HuddlePersonalCard;
