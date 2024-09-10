import { Box, Skeleton } from "@mui/material";

export const SkeletonLoader = () => {
  return (
    <Box width="850px" margin="0 auto">
      {/* Skeleton para simular el texto */}
      <Skeleton variant="text" width="100%" height={80} />
      {/* Skeleton para simular una imagen */}
      <Skeleton variant="rectangular" width="100%" height={400} />
      {/* Skeleton para simular botones */}
      <Skeleton variant="text" width="60%" height={50} />
    </Box>
  );
};
