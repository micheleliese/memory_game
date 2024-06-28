import { Box, Card, Grid } from "@mui/material";
import CustomAppBar from "./custom-app-bar";
import { useDrawer } from "../providers/use-drawer";
import { MemoryCard } from "../interfaces/card";

interface BoardProps {
  gameBoard: Array<MemoryCard>;
}

export default function Board({ gameBoard }: BoardProps) {
  const { drawerWidth } = useDrawer();

  return (
    <Box
      px={2}
      component={"main"}
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <CustomAppBar />
      <Box height={64} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems={"center"}
        spacing={2}
      >
        {gameBoard.map((card, index) => (
          <Grid key={index} item md={2}>
            <Card sx={{ background: "black" }}>
              <img src={card.image} alt="card" height={160} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
