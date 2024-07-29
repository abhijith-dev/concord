import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import Auth from "../api/Auth";
import Loader from "../components/Loader";
import useCookies from "../hooks/useCookies";
import Header from "../components/Header";
import { setUserToStore } from "../utils";

const Home = () => {
  const { getCookies } = useCookies();
  const [roomData, setRoomData] = useState({
    topic: "",
    description: "",
  });

  const [createRoomButton, showCreateRoomButton] = useState(false);

  const navigate = useNavigate();

  const roomQuery = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      return axios({
        url: Auth.rooms,
        method: "GET",
      });
    },
  });
  const mutation = useMutation({
    mutationFn: () => {
      return axios({
        url: Auth.verifyUser,
        method: "POST",
        headers: {
          Authorization: getCookies("ac_tkn"),
        },
      });
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  if (mutation.isPending) {
    return <Loader />;
  }
  if (mutation.isError) {
    navigate("/");
  }

  if (mutation.isSuccess) {
    setUserToStore({
      name: mutation.data.data.username,
      user_id: mutation.data.data._id,
    });
  }

  const createRoom = (e: any) => {
    e.preventDefault();
    const room_id = uuid();
    navigate(`/room?room_id=${room_id}&topic=${roomData.topic}&desc=${roomData.description}&type=create`);
  };

  const joinRoom = (room_id: any) => {
    navigate(`/room?room_id=${room_id}&type=join`);
  };

  return (
    <>
      <Header />
      <main className="w-screen h-screen px-40 py-24 chat-box">
        <section className="w-full h-full border border-[#dfe0e0] bg-[#e2eaeb] rounded-md flex justify-around">
          <article className="w-1/2 h-full px-10 py-10 flex flex-col items-center gap-2">
            <div className="px-2">
              <img
                src={require("../assets/logo.png")}
                alt="logo"
                width={150}
                height={150}
              />
              <div className="py-6">
                <h1 className="text-[16px] text-[#7a417c]">
                  "Shaping the Future: Exploring Ideas That Change Our World"
                </h1>
                <h2 className="text-[14px] text-[#403e41] font-thin mt-10">
                  Join our interactive chat platform to explore and debate a
                  wide range of subjects with a global community of passionate
                  individuals
                </h2>
                <div className="w-full flex justify-center mt-16">
                  <button
                    type="button"
                    className="px-3 py-2 bg-[#e9e8f0] rounded-md shadow-2xl font-medium text-[#222]"
                    onClick={() => showCreateRoomButton((prev) => !prev)}
                  >
                    {createRoomButton ? "Join Room ?" : "Create Room"}
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              {createRoomButton ? (
                <form
                  onSubmit={createRoom}
                  className="w-full flex flex-col gap-6"
                >
                  <input
                    type="text"
                    className="w-full h-14 pl-2 placeholder:font-thin rounded-md outline-none"
                    placeholder="Topic Name"
                    required={true}
                    onChange={(e) => {
                      setRoomData((prev: any): any => {
                        return {
                          ...prev,
                          topic: e.target.value,
                        };
                      });
                    }}
                  />
                  <input
                    type="text"
                    className="w-full h-14 pl-2 placeholder:font-thin rounded-md outline-none"
                    placeholder="Topic Description"
                    required={true}
                    onChange={(e) => {
                      setRoomData((prev: any): any => {
                        return {
                          ...prev,
                          description: e.target.value,
                        };
                      });
                    }}
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#e9e8f0] rounded-md shadow-2xl font-medium text-[#222]"
                  >
                    Create Room
                  </button>
                </form>
              ) : null}
            </div>
          </article>
          <article className="w-full h-full flex px-10 py-4 justify-center bg-[#e2eaeb] border-l-[1px] border-l-grey-light shadow-md">
            {roomQuery.isPending ? <div>Loading ....</div> : null}
            {roomQuery.isFetched ? (
              <div className="flex flex-col gap-10 items-center">
                <h1 className="text-center text-[#613463] text-[22px]">
                  Navigate the World of Ideas with Explore Topics Here
                </h1>
                {roomQuery.data?.data?.data?.length > 0 ? (
                  <>
                    {roomQuery.data?.data?.data?.map((room: any) => (
                      <div
                        key={room._id}
                        onClick={() => {
                          joinRoom(room.room_id);
                        }}
                        className="cursor-pointer px-6 py-3 text-[#7a417c] justify-center items-center rounded-2xl bg-[#55555518] max-w-[400px] chips"
                      >
                        <p className="font-bold text-16">{room.topic}</p>
                        <p className="text-[13px]">{room.description}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center text-[#3a3939] font-thin italic">
                    {" "}
                    No Topics Available yet 😥{" "}
                  </div>
                )}
              </div>
            ) : null}
          </article>
        </section>
      </main>
    </>
  );
};

export default Home;
