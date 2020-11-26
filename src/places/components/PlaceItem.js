import React from "react";

import "./PlaceItem.css";
const PlaceItem = (props) => {
  return (
    <li className="place-item">
      <div className="place-item__image">
        <img src={props.image} alt={props.title} />
          </div>
          <div>
              
          </div>
    </li>
  );
};

export default PlaceItem;
