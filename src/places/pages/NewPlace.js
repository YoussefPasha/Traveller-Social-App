import React from "react";
import Input from "../../shared/components/FormElements/Input";

import "./NewPlace.css";
const NewPlace = () => {
  return (
    <div>
      <form className="place-form">
        <Input
          type="text"
          label="Title"
          element="input"
          validators={[]}
          errorText="Please enter a valid title. "
        />
      </form>
    </div>
  );
};

export default NewPlace;
