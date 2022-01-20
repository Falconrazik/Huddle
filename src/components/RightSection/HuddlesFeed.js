import { useQuery, gql } from "@apollo/client";
import React from "react";
import toast from "react-hot-toast";
import { getFeedHuddles } from "../../common/queries";
import HuddleCard from "../Huddle/HuddleCard";
import { BarLoader } from "react-spinners";
import { useGroupsFeed } from "../../common/stores/groups";
import { getDownloadURL, ref, getStorage } from "@firebase/storage";
import { map } from "@firebase/util";

function HuddlesFeed() {
  const { setGroupsFeed, groupsFeed } = useGroupsFeed((state) => state);
  const { data, loading, error } = useQuery(gql(getFeedHuddles));

  React.useEffect(() => {
    if (data) {
      let mapDataGroups = {};
      data.groups.forEach((group) => {
        let groupTmp = group;
        mapDataGroups[group.id] = groupTmp;
        if (group.cover_art_key) {
          getDownloadURL(
            ref(getStorage(), `images/${group.cover_art_key}.JPG`)
          ).then((coverURL) => {
            mapDataGroups[group.id] = { ...group, coverURL };
          });
        }
      });

      setGroupsFeed(mapDataGroups);
    }
  }, [data]);

  if (error)
    toast.error(
      "Oh no! Something happened to our feed. Please reload the page again"
    );

  return (
    <div className="h-screen flex flex-wrap justify-center overflow-y-scroll">
      {!loading ? (
        Object.keys(groupsFeed).map((id) => (
          <div className="m-2">
            <HuddleCard {...groupsFeed[id]} />
          </div>
        ))
      ) : (
        <BarLoader />
      )}
    </div>
  );
}

export default HuddlesFeed;
