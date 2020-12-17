import React, { Fragment, useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

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
    imageUrl:
      "https://image.cnbcfm.com/api/v1/image/101081470-126451421.jpg?v=1532564623&w=1600&h=900",
    address: "20 w 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { clearError, sendRequest, error, isLoading } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlacesByUserId = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetchPlacesByUserId();
  }, [sendRequest, userId]);

  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && !error && loadedPlaces && (
        <PlaceList items={loadedPlaces} />
      )}
    </Fragment>
  );
};

export default UserPlaces;
