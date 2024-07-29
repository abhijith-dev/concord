import axios from "axios";
import { Link, useNavigate, useLocation,useSearchParams } from "react-router-dom";
import { getUserFromStore } from "../utils";
import Auth from "../api/Auth";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [etext,setEtext] = useState('Exit Group')
  const disconnectFromRoom = async() =>{
     const room_id = searchParams.get('room_id')
     const user = getUserFromStore().name
     await axios({
        url:Auth.removeRoom,
        method:"POST",
        data:{
            room_id,
            user
        }
     });
     navigate('/home')
  }

  const logout = () => {
    document.cookie = "";
    sessionStorage.clear();
    navigate("/");
  };

  const emojiConcatination = (f:boolean) => {
    if(f) setEtext('Exit Group 😢?')
    else setEtext('Exit Group')
  }

  return (
    <header className="fixed w-full h-20 flex justify-between items-center px-6 ">
      <Link to={"/home"}>
        <img
          src={require("../assets/logo.png")}
          alt="logo"
          width={150}
          height={150}
          className="cursor-pointer"
        />
      </Link>
      {location.pathname === "/room" ? (
        <div className="">
        <button className="flex justify-center gap-2 cursor-pointer px-2 py-2 bg-[#b0bde9be] rounded-md text-[#7a417c]" 
        onClick={disconnectFromRoom}
        onMouseOver={()=>{emojiConcatination(true)}}
        onMouseOut={()=>{emojiConcatination(false)}}
        >
            {etext}
         </button>
      </div>
      ) : (
        <div role="button" onClick={logout} className="flex justify-center gap-2 cursor-pointer px-2 py-2 bg-[#f3eeee11]">
          <img
          src={require("../assets/logout.png")}
          alt="logo"
          width={20}
          height={20}
        />
         <div>Logout</div>
        </div>
      )}
    </header>
  );
};

export default Header;
