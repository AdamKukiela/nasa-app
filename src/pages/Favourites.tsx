import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";

const Favourites: React.FC = () => {
  const favourites = useSelector((state: RootState) => state.favourites.items);

  return (
    <Grid container spacing={2}>
      {favourites.map((fav, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              component="iframe"
              height="200"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={fav.title}
              src={fav.url}
            />
            <CardContent>
              <Typography variant="h5">{fav.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Favourites;
