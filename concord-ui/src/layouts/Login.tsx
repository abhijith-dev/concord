"use client";
import { useState } from "react";
import AuthHeader from "../components/AuthHeader";
import classNames from "classnames";
import axios from "axios";
import { useMutation } from '@tanstack/react-query';
import Spinner from "../components/Spinner";
import Auth  from "../api/Auth";
import useCookies from "../hooks/useCookies";
import { useNavigate,useSearchParams } from 'react-router-dom';

const EmailForm = ({ setTabs }: any) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn : (body:any) => {
       return axios.post(Auth.onboard,body)
    }
  });

  if(mutation.isSuccess){
     navigate(`?user=${mutation.data.data.emailAddress}&verified=false`)
     setTabs(1);
  }

  const verifyEmail = () => {
    mutation.mutate({
       emailAddress:email
    });
  };

  return (
    <>
      <input
        type="text"
        className="w-[60%] h-14 pl-2 placeholder:font-thin rounded-md outline-none mt-4"
        placeholder="Email Address"
        name="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoFocus
        required
      />
      {mutation.isError && <span className="text-red-700">{mutation.error.message}</span>}
      <div className="w-full flex justify-end mr-64 mt-10">
        <button
          onClick={verifyEmail}
          type="submit"
          className="px-3 py-2 bg-[#c2b7e7] rounded-sm shadow-2xl font-medium text-[#222]"
        >
          {
            mutation.isPending ? <Spinner /> : (
              <span className="inline-block text-[14px]">
              NEXT
              <img
                src={require("../assets/right-arrow.png")}
                alt="arrow"
                className="inline-block ml-2"
                width={20}
                height={20}
              />
            </span>
            )
          }
        </button>
      </div>
    </>
  );
};

const VerifyOTP = ({ setTabs }: any) => {
  const [otp, setOTP] = useState("");
  const { setCookies } = useCookies();
  const [ searchParams ] = useSearchParams(); 
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn : (body:any) => {
       return axios.post(Auth.verify,body)
    }
  });

  if(mutation.isSuccess && mutation.data.data!.username === null){
    navigate(`?user=${mutation.data.data.id}&verified=true`)
     setTabs(2);
  }

  if(mutation.isSuccess && mutation.data.data!.username !== null){
    setCookies({
      ac_tkn : mutation.data.data!.access_token
    },{ exp : 60*60*24});
    window.location.href = "/home?user="+mutation.data.data.id
  }
  
  const verifyOTP = () => {
    mutation.mutate({
      emailAddress:searchParams.get("user"),
      otp:otp
   });
  };

  return (
    <>
      <input
        type="text"
        className="w-[60%] h-14 pl-2 placeholder:font-thin rounded-md outline-none mt-4"
        placeholder="One Time Password"
        value={otp}
        onChange={(event) => setOTP(event.target.value)}
        autoFocus
        required
      />
      {mutation.isError &&  <div className="text-[13px] text-red-600">{'invalid otp'}</div>}
      <div className="w-full flex justify-end mr-64 mt-10">
        <button
          onClick={verifyOTP}
          className="px-3 py-2 bg-[#c2b7e7] rounded-sm shadow-2xl font-medium text-[#222]"
        >
        <span className="inline-block text-[14px]">
            VERIFY
            <img
              src={require("../assets/right-arrow.png")}
              alt="arrow"
              className="inline-block ml-2"
              width={20}
              height={20}
            />
          </span>
        </button>
      </div>
    </>
  );
};

const DisplayName = ({ setTabs }: any) => {
  const [name, setName] = useState("");
  const { setCookies } = useCookies();
  const [ searchParams ] = useSearchParams();

  const mutation = useMutation({
    mutationFn : (body:any) => {
       return axios.patch(Auth.displayName,body)
    }
  });

  if(mutation.isSuccess){
    setCookies({
      ac_tkn : mutation.data.data!.access_token
    },{ exp : 60*60*24});
    window.location.href = "/home?user="+mutation.data.data.id
  }

  const setUserName = (skip=0) => {
    let body:any = {}
    if(!skip) body.username = name;
    body.id = searchParams.get('user')
    mutation.mutate(body)
  };

  return (
    <>
      <input
        type="text"
        className="w-[60%] h-14 pl-2 placeholder:font-thin rounded-md outline-none mt-4"
        placeholder="Display Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoFocus
        required
      />
      <div className="w-full flex justify-end gap-2 mr-64 mt-10">
      <button
          onClick={()=>setUserName(1)}
          className="px-4 py-2 bg-[#c2b7e7] rounded-sm shadow-2xl font-medium text-[#222]"
        >
          <span className="inline-block text-[14px]">
            SKIP
          </span>
        </button>

        <button
          onClick={()=>setUserName(0)}
          className="px-3 py-2 bg-[#c2b7e7] rounded-sm shadow-2xl font-medium text-[#222]"
        >
          <span className="inline-block text-[14px]">
            FINISH
            <img
              src={require("../assets/right-arrow.png")}
              alt="arrow"
              className="inline-block ml-2"
              width={20}
              height={20}
            />
          </span>
        </button>
      </div>
    </>
  );
};

const Login = () => {
  const [tab, setTabs] = useState(0);
  return (
    <main className="w-screen h-screen">
    <section className="w-full h-full flex justify-center items-center login-from">
      <video
        className="fixed top-0 bottom-0 min-h-full w-full -z-20"
        autoPlay
        muted
        loop
        id="bg-video"
      >
        <source src={require("../assets/auth-bg.mp4")} type="video/mp4" />
      </video>
      <AuthHeader />
      <div
        className={
          "w-2/6 h-[40%] bg-[#0009] flex flex-col justify-center items-center rounded-md relative"
        }
      >
        <div
          className="w-24 h-24 rounded-full"
          role="form"
          onClick={() => setTabs(0)}
        >
          <img
            src={require("../assets/white-logo.png")}
            alt="arrow"
            className="object-fill rounded-full"
            width={100}
            height={100}
          />
        </div>
        <div
          className={classNames(
            "w-full flex flex-col justify-center items-center rounded-md relative"
          )}
        >
          {tab === 0 ? <EmailForm setTabs={setTabs} /> : null}
          {tab === 1 ? <VerifyOTP setTabs={setTabs} /> : null}
          {tab === 2 ? <DisplayName setTabs={setTabs} /> : null}
        </div>
      </div>
    </section>
    </main>
  );
};

export default Login;
