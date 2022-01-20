import React from "react";
import HuddlePersonalCard from "./HuddlePersonalCard";
import {useQuery, gql, useLazyQuery} from '@apollo/client'
import {getMyHuddles} from '../../common/queries'
import {MeContext} from '../../common/contexts/me.context'

function MyHuddles() {
  const {me} = React.useContext(MeContext)

  return (
    <div className="flex flex-col pt-2 space-y-3 flex-wrap items-center min-h-full overflow-y-scroll">
      {me.member_of.map((record) => (
        <div className="w-11/12" key={record.id}>
          <HuddlePersonalCard {...record} />
        </div>
      ))}
    </div>
  );
}

export default MyHuddles;
