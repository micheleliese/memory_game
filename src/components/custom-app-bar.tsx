import useMediaQuery from '@mui/material/useMediaQuery';
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
  const matches = useMediaQuery('(max-width:600px)');
  const { myUser, isMyTurn, currentUser, gameStarted } = useSocket();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        mr: { sm: `${drawerWidth}px` },
        backgroundColor: "deeppink"
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
          <Typography variant={matches ? "body1" : "h6"} fontWeight='bold'>Jogo da Memória </Typography>
          <Typography variant={matches ? "body1" : "h6"} fontWeight='bold' color='white'>{myUser()?.name}</Typography>
          {gameStarted ? (
            <Card sx={{
              backgroundColor: isMyTurn() ? "lightgreen" : "white"
            }}>
              <Box px={3} py={1}>
                <Typography
                  variant={matches ? "body1" : "h6"}
                  fontWeight="bold"
                  color={isMyTurn() ? "green" : "inherit"}
                >
                  {isMyTurn() ? "Sua vez!" : `Vez de ${currentUser()?.name}`}
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
