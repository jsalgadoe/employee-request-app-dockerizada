import { CircularProgress, Grid2 } from "@mui/material";

function GradientCircularProgress() {
  return (
    <>
      <svg width={100} height={100}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        size="4rem"
      />
    </>
  );
}

export const CheckingAuth = () => {
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid2 container direction="row" justifyContent="center">
        <GradientCircularProgress />
      </Grid2>
    </Grid2>
  );
};
