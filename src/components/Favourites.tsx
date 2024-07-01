import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { removeFavourite } from "../redux/favouriteSlice";

const Favourites: React.FC = () => {
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const dispatch = useDispatch();

  const handleRemove = (url: string) => {
    dispatch(removeFavourite(url));
  };

  return (
    <Grid container spacing={2}>
      {favourites.map((fav, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            {fav.media_type === "image" ? (
              <CardMedia
                component="img"
                height="200"
                alt={fav.title}
                image={fav.url}
                title={fav.title}
              />
            ) : (
              <CardMedia
                component="iframe"
                height="200"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={fav.title}
                src={fav.url}
              />
            )}
            <CardContent>
              <Typography variant="h5">{fav.title}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemove(fav.url)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Favourites;
