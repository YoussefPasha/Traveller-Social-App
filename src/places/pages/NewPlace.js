import React, { useCallback } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./NewPlace.css";
const NewPlace = () => {
  const titleInputHandler = useCallback((id, value, isValid) => {}, []);
  const descriptionInputHandler = useCallback((id, value, isValid) => {}, []);
  return (
    <div>
      <form className="place-form">
        <Input
          type="text"
          label="Title"
          id="title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={titleInputHandler}
          errorText="Please enter a valid title. "
        />
        <Input
          type="text"
          element="textarea"
          label="Description"
          id="description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={descriptionInputHandler}
          errorText="Please enter a valid description (at least 5 characters). "
        />
      </form>
    </div>
  );
};

export default NewPlace;
