"use client";
import React, { useState } from "react";

export const Register = () => {
  const [data, setData] = useState({});
  const handleChange = (eve: any) => {
    // eve: any - because of typescript we have to give type to each and every parameter, for now we have used common type called any
    const { name, value } = eve.target;
    setData({ ...data, [name]: value });
  };
  const fnRegister = async () => {
    try {
      var dataObj = {
        data: data,
      };

      // sending request to the server.
      // first time fetch returns the response class obj. In the response class object, if we want to get the response in text format then we can call text method or if we want to get the response in json format then we can call json method.
      const res = await fetch("http://localhost:2020/std/register", {
        method: "post",
        headers: {
          // if we send the data using fetch or XMLHTTPRequest for request body they will always send in the format of string.
          // here we are having data in JSON format. so convert it into string format and then pass it.
          // we have to specify which type of data we are sending to the server. so client can communicate with server side by using request header. the below line tells the server to use the data which is passed as JSON format.
          "Content-Type": "application/json", // Sending Json
          // we can add any other headers we need
        },
        body: JSON.stringify(dataObj), // fetch and XMLHTTPRequest for request body they will always send in the format of string. hence converting the data to string format.
      });
      const result = await res.json();
      console.log(result);
    } catch (ex) {
      console.log(ex);
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
