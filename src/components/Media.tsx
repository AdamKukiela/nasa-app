import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addFavourite } from "../redux/favouriteSlice";
import { styled } from "@mui/system";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { fetchPicture } from "../utils/apiUtils";

const StyledCard = styled(Card)`
  max-width: 600px;
  margin: 20px auto;
`;

const Media: React.FC = () => {
  const [media, setMedia] = useState({
    url: "",
    title: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const data = await fetchPicture();
      setMedia({
        url: data.url,
        title: data.title,
      });
    } catch (error) {
      console.error("Error fetching the media:", error);
    }
  };

  const handleSave = () => {
    dispatch(addFavourite(media));
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        <Stack spacing={2} direction={"row"}>
          <Button variant="contained" color="primary" onClick={fetchMedia}>
            Next
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </CardContent>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          The media has been saved to favourites.
        </MuiAlert>
      </Snackbar>
    </StyledCard>
  );
};

export default Media;
