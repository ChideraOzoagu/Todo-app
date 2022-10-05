import React, { useState } from "react";
import { useGlobalContext } from "../context/context";

const Form = () => {
  const {name, setName, handleSubmit} = useGlobalContext()

  return (
    <section>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Create a new todo..."
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <div className="circle"></div>
      </form>
    </section>
  );
};

export default Form;
