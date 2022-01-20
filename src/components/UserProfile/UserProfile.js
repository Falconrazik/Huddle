import React from 'react'
import { HUDDLE_COLORS } from "../../common/colors";
import { getMeBrief } from '../../common/queries';
import { useQuery, gql } from "@apollo/client";
import { getAuth } from "@firebase/auth";
import { logout } from '../../firebase';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../common/contexts/profile.context";


function UserProfile() {
    const { currentUser } = getAuth();
    const { data, loading, error } = useQuery(gql(getMeBrief), { variables: { email: currentUser.email } });
    const navigate = useNavigate();
    const { setIsProfileOpen, i } = React.useContext(ProfileContext);

    async function logOut(values, actions) {
        // do api stuff here
        try {
          await logout();
          toast.success("Successfully log out");
          navigate("/login", { replace: true });
        } catch {
          toast.error("Log out failed!");
        }
      }

    if (loading) return null;
    if (error) return `Error! ${error}`;
    return (
        <div
            style={{
                borderColor: HUDDLE_COLORS.kaleGreen,
            }}
            className="w-full h-full border-2 rounded-2xl text-black"
            >
            <div className="flex flex-col w-full h-full content-center space-y-6 items-center p-2 rounded-xl bg-white bg-opacity-30">
                <div className="flex flex-row justify-betwee w-4/5" style={{ flex:1 }} > 
                    <button onClick={() => setIsProfileOpen(false)} className="float-right py-6 font-bold text-2xl hover:text-gray-600 transition"> X </button>
                </div>
                <div className="flex flex-col justify-center" style={{ flex: 3 }} />
                <div className="flex flex-col justify-center" style={{ flex: 1 }}>
                    <div className="text-3xl font-bold">{data.users[0].first_name} {data.users[0].last_name}</div>
                </div>
                <div className="flex flex-col justify-center w-full items-center border-b-1 font-bold text-xl" style={{flex: 1}, {color: '#53B5AF'}}>{data.users[0].university}</div>
                <div className="flex flex-row justify-between w-4/5 items-center rounded-2xl bg-green-400 text-white font-bold text-xl py-8" style={{flex: 1}, {backgroundColor: '#ADE0D5'}}>
                    <div className="float-left px-8">Year</div>
                    <div className="float-right px-8">{data.users[0].vintage}</div>
                </div>
                <div className="flex flex-row justify-between w-4/5 items-center bg-yellow-300 rounded-2xl text-white font-bold text-xl py-8" style={{flex: 1}, {backgroundColor: '#FFC39C'}}>
                    <div className="float-left px-8">Major</div>
                    <div className="float-right px-8">{data.users[0].major}</div>
                </div>
                <div className="flex flex-row justify-between w-4/5 items-center bg-pink-200 rounded-2xl text-white font-bold text-xl py-20" style={{flex: 3}, {backgroundColor: '#F6BEB3'}}>
                    <div className="float-left px-8">Interests</div>
                    <div className="float-right px-8">Gaming</div>
                </div>
                <div className="flex flex-col justify-center items-center w-full" style={{ flex: 6 }}>
                    <button className="flex flex-col w-1/3 items-center py-5 rounded-3xl border-2 border-black hover:bg-red-300 transition font-bold text-xl hover:text-white" onClick={logOut}>Sign Out</button>
                </div>
                
        </div>
    </div>
    )
}

export default UserProfile
