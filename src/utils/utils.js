import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const useGetCampusName = () => {
  const campuses = useSelector((state) => state.campuses.list);

  return (campusId) => {
    const campus = campuses.find((campus) => campus.id === campusId);
    return campus ? campus.name : "No Campus";
  };
};

export const useHandleCardClick = () => {
  const navigate = useNavigate();

  return (id) => {
    navigate(`/students/${id}`);
  };
};
