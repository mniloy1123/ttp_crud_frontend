import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleCampus } from "./campusesSlice";

const SingleCampusPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleCampus(id));
  }, [dispatch, id]);

  const campus = useSelector((state) => state.campuses.singleCampus);

  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt={campus.name} />
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <h2>Students on campus</h2>
    </div>
  );
};

export default SingleCampusPage;
