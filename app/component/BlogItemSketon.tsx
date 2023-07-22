import React from "react";
import Skeleton from "@mui/material/Skeleton";
const BlogItemSketon = () => {
  return (
    <div>
      <Skeleton
        animation="wave"
        variant="rounded"
        className="w-full "
        height={200}
      />
      <Skeleton
        animation="wave"
        className="w-[80%]"
        variant="text"
        sx={{ fontSize: "1.25rem" }}
      />

      <div>
        <Skeleton variant="rectangular" className="w-full" height={88} />
      </div>
      <div className="flex justify-end">
        <Skeleton
          animation="wave"
          className="w-[100px]"
          variant="text"
          sx={{ fontSize: "1rem" }}
        />
      </div>
    </div>
  );
};

export default BlogItemSketon;
