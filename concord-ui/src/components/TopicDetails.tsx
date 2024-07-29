import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Auth from "../api/Auth";
import { useEffect } from "react";

const TopicDetails = () => {
  const [searchParams] = useSearchParams();

  const RoomQuery = useQuery({
    queryKey: ["room"],
    queryFn: async () => {
      return axios({
        url: `${Auth.room}/${searchParams.get("room_id")}`,
        method: "GET",
      });
    },
  });

  useEffect(() => {
    RoomQuery.refetch()
  },[RoomQuery]);

  return (
    <div className="w-full flex justify-center">
      {RoomQuery.isLoading ? <div>Loading....</div> : null}
      {RoomQuery.isFetched ? (
        <div className="w-full flex flex-col items-center gap-3 px-4">
          <h1 className="text-[20px] text-[#7a417c]">{RoomQuery.data?.data.data?.topic}</h1>
          <h1 className="text-[14px] text-[#403e41] font-thin">{RoomQuery.data?.data?.data?.description}</h1>
          <div className="mt-10 flex flex-col gap-3">
            <h1 className="text-center text-[18px] text-[#443444]">Connected users</h1>
            {RoomQuery.data?.data?.data?.users?.length === 0 && (
              <h1 className="text-center text-[13px] text-[#020202]">No users joined</h1>
            )}
            {
             //@ts-ignore
             [...new Set(RoomQuery.data?.data?.data?.users || [])].map((user,index)=> (
                <div className="flex gap-2 items-center justify-center px-10 py-2 rounded-md bg-[#a7a1a159]">
                  <img src={require('../assets/user.png')} alt="user" width={20} height={20} />
                  <div>{user} {index === 0 && <span className="px-1 py-1 text-[12px] text-[#48d643] bg-[#0c0b0b] rounded-md">admin</span>}</div>
                </div>
             ))
            }
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TopicDetails;
