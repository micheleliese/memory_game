import { Box } from "@mui/material";
import CustomDrawer from "./components/custom-drawer";
import Board from "./components/board";

export default function App() {
  return (
    <Box width="100vw" height={window.innerHeight} bgcolor="lightgray">
      <Box sx={{ display: "flex" }}>
        <Board/>
        <CustomDrawer/>
      </Box>
    </Box>
  );
}
