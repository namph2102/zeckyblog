import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
const LoadingPage = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        {" "}
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default LoadingPage;
