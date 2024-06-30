import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addFavourite } from "../redux/favouritesSlice";
import { styled } from "@mui/system";

const StyledCard = styled(Card)`
  max-width: 600px;
  margin: 20px auto;
`;

interface MediaData {
  url: string;
  title: string;
}

const Media: React.FC = () => {
  const [media, setMedia] = useState<MediaData>({
    url: "",
    title: "",
  });
  const dispatch = useDispatch();

  const fetchPicture = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`
      );
      setMedia({
        url: response.data.url,
        title: response.data.title,
      });
    } catch (error) {
      console.error("Error fetching the media:", error);
    }
  };

  useEffect(() => {
    fetchPicture();
  }, []);

  const handleSave = () => {
    dispatch(addFavourite(media));
  };

  return (
    <StyledCard>
      <CardMedia
        component="iframe"
        height="500"
        src={media.url}
        title={media.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <CardContent>
        <Typography variant="h5">{media.title}</Typography>
        <Button variant="contained" color="primary" onClick={fetchPicture}>
          Next
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSave}>
          Save
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default Media;
