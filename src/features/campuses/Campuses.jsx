import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampuses } from "./campusesSlice";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

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
        <Card key={campus.id} sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={campus.imageUrl}
              alt={campus.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {campus.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Button size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="secondary">
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default Campuses;
