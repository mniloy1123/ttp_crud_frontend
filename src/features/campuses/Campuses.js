import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampuses } from "./campusesSlice";

const Campuses = () => {
  const dispatch = useDispatch();
  const campuses = useSelector((state) => state.campuses);

  useEffect(() => {
    dispatch(fetchCampuses());
  }, [dispatch]);

  return (
    <div>
      <h1>Campus Listing</h1>
      {campuses.map((campus) => (
        <div key={campus.id}>
          <h3>{campus.name}</h3>
          <img src={campus.imageUrl} alt={campus.name} />
        </div>
      ))}
    </div>
  );
};

export default Campuses;
