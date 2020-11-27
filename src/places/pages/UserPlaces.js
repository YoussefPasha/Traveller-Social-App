import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

export const DUMMY_PLACES = [
  {
    id: "p1",
    title: "pyramids",
    description: "One Of the Most Famous Places in the world ",
    imageUrl:
      "https://images.memphistours.com/large/34d5b5a3fbaa4b3b5d9487bf924b0145.jpg",
    address: "Al Haram, Nazlet El-Semman, Al Giza Desert, Giza Governorate",
    location: {
      lng: 31.1015702,
      lat: 30.0548794,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State",
    description: "One Of the Most Famous Sky Scrappers in the world ",
    imageUrl: "https://images.app.goo.gl/qnTNhaq4cKaiZgus5",
    address: "20 w 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
