import React from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

const StudentCard = ({ student, handleCardClick, getCampusName }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ ml: 2 }}>
      <Card onClick={() => handleCardClick(student.id)} sx={{ maxWidth: 250, minHeight: 265 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={student.imageUrl}
            alt={student.firstName + " " + student.lastName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {student.firstName + " " + student.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Campus: {getCampusName(student.campusId)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default StudentCard;
