import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Card,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDrawer } from "../providers/use-drawer";
import { useSocket } from "../providers/use-socket";

export default function CustomAppBar() {
  const { handleDrawerToggle, drawerWidth } = useDrawer();
  const { myUser, isMyTurn, currentUser, gameStarted } = useSocket();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        mr: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h5" fontWeight='bold'>Memory Game</Typography>
          <Typography variant="h6" fontWeight='bold'>{myUser()?.name}</Typography>
          {gameStarted ? (
            <Card>
              <Box px={3} py={1}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={isMyTurn() ? "green" : "inherit"}
                >
                  {isMyTurn() ? "Your turn" : currentUser()?.name + "'s turn"}
                </Typography>
              </Box>
            </Card>
          ) : <CircularProgress sx={{ color: 'white'}}/>}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
