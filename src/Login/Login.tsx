import React, { useState } from "react";
import { Ajax } from "@/services/Ajax";
import { useDispatch, UseDispatch } from "react-redux";

export const Login = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (eve: any) => {
    const { id, value } = eve.target;
    setData({ ...data, [id]: value });
  };
  const handleClick = async () => {
    try {
      const res = await Ajax.sendPostReq("std/login", data); // it connects with the login page on server side and if uid and pwd are correct then it sends the data back otherwsie it wont send any data.
      // console.log(res);
      if (res?.data?.length > 0) {
        // checking if res has some data or not if data is received that means login is successful so we can dispatch the data to the reducer now. reducer will store the data in the store.
        if (typeof window !== "undefined") {
          sessionStorage.user = res?.data?.[0]?.uid;
          sessionStorage.token = res?.data?.[0]?.token;
        }
        dispatch({
          type: "LOGIN",
          payload: { isLoggedIn: true, user: res?.data?.[0]?.uid },
        });
      } else {
        alert("check uid and pwd");
      }
    } catch (ex) {
      // console.log(ex);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <p>
        uid: <input id="uid" type="text" onChange={handleChange} />
      </p>
      <p>
        pwd: <input id="pwd" type="password" onChange={handleChange} />
      </p>
      <p>
        <button onClick={handleClick}>Login</button>
      </p>
    </div>
  );
};
