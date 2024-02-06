import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export function Layout() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
      {/* <Container> */}
        <Outlet />
      {/* </Container> */}
    </Box>
  );
}
