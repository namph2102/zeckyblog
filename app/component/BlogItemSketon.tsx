import React from "react";
import Skeleton from "@mui/material/Skeleton";
const BlogItemSketon = () => {
  return (
    <div>
      <Skeleton
        animation="wave"
        variant="rounded"
        className="w-full "
        height={150}
      />
      <Skeleton
        animation="wave"
        className="w-[80%]"
        variant="text"
        sx={{ fontSize: "1.25rem" }}
      />

      <div>
        <Skeleton variant="rectangular" className="w-full" height={60} />
      </div>
    </div>
  );
};

export default BlogItemSketon;
