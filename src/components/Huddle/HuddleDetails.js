import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { BarLoader } from "react-spinners";
import { ViewingGroupContext } from "../../App";
import { HUDDLE_COLORS } from "../../common/colors";
import { addMeToHuddle, getHuddle } from "../../common/queries";
import { gql } from "@apollo/client";
import { getDownloadURL, ref, getStorage } from "@firebase/storage";
import { MeContext } from "../../common/contexts/me.context";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function HuddleDetails() {
  const { viewingGroup, setViewingGroup } =
    React.useContext(ViewingGroupContext);
  const { data, loading, error } = useQuery(gql(getHuddle), {
    variables: { id: viewingGroup },
  });
  const [addMeToHuddleFunc, resAdd] = useMutation(gql(addMeToHuddle));
  const { me } = React.useContext(MeContext);

  const [coverURL, setCoverURL] = React.useState("");

  React.useEffect(() => {
    if (data && data.groups[0].cover_art_key) {
      getDownloadURL(
        ref(getStorage(), `images/${data.groups[0].cover_art_key}.JPG`)
      ).then((url) => {
        setCoverURL(url);
      });
    }
  }, [data]);

  if (loading || !data) return <BarLoader />;

  return (
    <div className="w-full h-full flex space-x-2 justify-center items-center">
      <BsFillArrowLeftCircleFill
        style={{ color: HUDDLE_COLORS.darkBrown }}
        className="text-4xl hover:scale-125 cursor-pointer font-bold transition transform"
        onClick={() => {
          setViewingGroup(null);
        }}
      />
      <div className="flex w-2/3 h-1/2 bg-white rounded-lg">
        <div
          style={{
            flex: 3,
            backgroundImage: `url(${coverURL})`,
            backgroundSize: "cover",
          }}
          className="h-full rounded-l-lg"
        />
        <div style={{ flex: 5 }} className="space-y-2 p-3">
          <div className="font-semibold text-4xl">{data.groups[0].name}</div>
          <div className="text-xl">{data.groups[0].description}</div>
          <div className="text-xl" style={{ color: HUDDLE_COLORS.kaleGreen }}>
            There {data.groups[0].members.length > 1 ? "are" : "is"}{" "}
            {data.groups[0].members.length}{" "}
            {data.groups[0].members.length > 1 ? "people" : "person"} waiting
            for this Huddle
          </div>
          <button
            className="p-2 rounded-lg text-white"
            style={{ backgroundColor: HUDDLE_COLORS.kaleGreen }}
            onClick={async (e) => {
              e.preventDefault();
              await addMeToHuddleFunc({
                variables: {
                  newArray: `{${[...data.groups[0].members, me.id].join(",")}}`,
                  groupId: viewingGroup,
                },
              });
            }}
          >
            Join the waitlist!
          </button>
        </div>
      </div>
    </div>
  );
}

export default HuddleDetails;
