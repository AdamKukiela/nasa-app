import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addFavourite } from "../redux/favouriteSlice";
import { styled } from "@mui/system";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getNasaMedia } from "../utils/apiUtils";
import { Favourite } from "../redux/favouriteSlice/types";

const StyledCard = styled(Card)`
  max-width: 600px;
  margin: 20px auto;
`;

const Media: React.FC = () => {
  const [mediaList, setMediaList] = useState<Favourite[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [duplicateAlertOpen, setDuplicateAlertOpen] = useState(false);
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.items);

  useEffect(() => {
    fetchMediaList();
  }, []);

  const fetchMediaList = async () => {
    setLoading(true);
    try {
      const data = await getNasaMedia();
      setMediaList(data);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Error fetching the media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaList.length);
    setLoading(false);
  };

  const handleSave = () => {
    const currentMedia = mediaList[currentIndex];
    if (currentMedia) {
      const isDuplicate = favourites.some(
        (fav) => fav.date === currentMedia.date
      );

      if (isDuplicate) {
        setDuplicateAlertOpen(true);
      } else {
        dispatch(addFavourite(currentMedia));
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDuplicateAlertClose = () => {
    setDuplicateAlertOpen(false);
  };

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading APOD data...
        </Typography>
      </Stack>
    );
  }

  if (mediaList.length === 0) {
    return <Typography>No media available.</Typography>;
  }

  const currentMedia = mediaList[currentIndex];

  return (
    <StyledCard>
      {currentMedia.media_type === "image" ? (
        <CardMedia
          component="img"
          height="500"
          src={currentMedia.url}
          title={currentMedia.title}
        />
      ) : (
        <CardMedia
          component="iframe"
          height="500"
          src={currentMedia.url}
          title={currentMedia.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <CardContent>
        <Typography variant="h5">{currentMedia.title}</Typography>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleNext}>
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

      <Snackbar
        open={duplicateAlertOpen}
        autoHideDuration={4000}
        onClose={handleDuplicateAlertClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleDuplicateAlertClose}
          severity="warning"
        >
          You have already saved this media.
        </MuiAlert>
      </Snackbar>
    </StyledCard>
  );
};

export default Media;
