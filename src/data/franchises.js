import { Grid, Paper, Typography, Button } from "@mui/material";
import { useRef } from "react";
import Layout from "./components/Layout";
import Map from "./components/Map";
import AsideIndex from "./components/AsideIndex";
import {
  FranchiseCinemasList,
  NearbyCinemasList,
} from "./components/CinemaList";
import { Switch, Route } from "react-router-dom";
import Provider from "./components/Provider";
import loadable from "@loadable/component";

// Minimal react component for page not found aside.
const NotFound = () => (
  <Typography variant="h6">404, Page Not Found!</Typography>
);

const CinemaMarkers = loadable(() => import("./components/CinemaMarkers"));
const NearbyCinemaMarkers = loadable(() =>
  import("./components/NearbyCinemaMarkers")
);

const App = () => {
  // Ref to interact with the Map component
  const mapRef = useRef();

  // Function to handle button click and set a specific location
  const snapToLocation = () => {
    const location = { lat: 37.7749, lng: -122.4194 }; // Example: San Francisco coordinates
    if (mapRef.current) {
      mapRef.current.setCenter(location); // Example method; adapt based on your Map component API
      mapRef.current.setZoom(12); // Optional: Adjust zoom level
    }
  };

  return (
    <Provider>
      <Layout>
        <Grid item xs={12} md={8} sx={{ minHeight: 400 }}>
          <Map ref={mapRef}>
            <Switch>
              <Route exact path="/">
                <CinemaMarkers />
              </Route>
              <Route path="/nearby" component={NearbyCinemaMarkers} />
              <Route
                path="/:franchiseId/:countryCode"
                component={CinemaMarkers}
              />
            </Switch>
          </Map>
          <Button
            variant="contained"
            color="primary"
            onClick={snapToLocation}
            sx={{ marginTop: 2 }}
          >
            Snap to San Francisco
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 1 }}>
            <Switch>
              <Route exact path="/" component={AsideIndex} />
              <Route path="/nearby" component={NearbyCinemasList} />
              <Route
                path="/:franchiseId/:countryCode"
                component={FranchiseCinemasList}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </Paper>
        </Grid>
      </Layout>
    </Provider>
  );
};

export default App;
