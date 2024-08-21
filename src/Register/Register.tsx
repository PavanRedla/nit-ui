"use client";
import React, { useState } from "react";
import { Ajax } from "@/services/Ajax";
import { useDispatch, UseDispatch } from "react-redux";

export const Register = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const handleChange = (eve: any) => {
    // eve: any - because of typescript we have to give type to each and every parameter, for now we have used common type called any for event
    const { name, value } = eve.target;
    setData({ ...data, [name]: value });
  };
  // const fnRegister = async () => {
  // try {
  //   var dataObj = {
  //     data: data,
  //   };

  // sending request to the server.
  // first time fetch returns the response class obj. In the response class object, if we want to get the response in text format then we can call text method or if we want to get the response in json format then we can call json method.
  // const res = await fetch("https://nit-server.vercel.app/std/register", {
  // method: "post",
  // headers: {
  // if we send the data using fetch or XMLHTTPRequest for request body they will always send in the format of string.
  // here we are having data in JSON format. so convert it into string format and then pass it.
  // we have to specify which type of data we are sending to the server. so client can communicate with server side by using request header. the below line tells the server to use the data which is passed as JSON format.
  // "Content-Type": "application/json", // Sending Json
  // we can add any other headers we need
  //   },
  //   body: JSON.stringify(dataObj), // fetch and XMLHTTPRequest for request body they will always send in the format of string. hence converting the data to string format.
  // });
  // const result = await res.json();
  // console.log(result);
  const fnRegister = async () => {
    try {
      var dataObj = {
        data: data,
      };
      dispatch({ type: "LOADER", payload: true });
      const res = await Ajax.sendPostReq("std/register", dataObj);
      const { acknowledged, insertedId } = res?.data;
      if (acknowledged && insertedId) {
        dispatch({ type: "GET_STUDENTS" });
        alert("success");
      } else {
        alert("fail");
      }
    } catch (ex: any) {
      console.log(ex);
      alert(ex.message);
    } finally {
      dispatch({ type: "LOADER", payload: false });
    }
  };
  return (
    <div>
      <h3>Registeration Form</h3>
      <p>
        <b>Name:</b>
        <input name="name" type="text" onChange={handleChange} />
      </p>
      <p>
        <b>Roll No:</b>
        <input name="rno" type="text" onChange={handleChange} />
      </p>
      <p>
        <b>Location:</b>
        <textarea name="loc" onChange={handleChange} />
      </p>
      <p>
        <button onClick={fnRegister}>Register</button>
      </p>
    </div>
  );
};
