import { AppBar, Box, Drawer, Toolbar, Typography } from "@mui/material";
import { useDrawer } from "../providers/use-drawer";
import PlayerCard from "./player-card";
import { useSocket } from "../providers/use-socket";

export default function CustomDrawer() {
  const { drawerWidth, mobileOpen, handleDrawerClose, handleDrawerTransitionEnd } = useDrawer();
  const { players } = useSocket();

  const drawerContent = (
    <Box bgcolor="white" height="100%">
      <AppBar position="sticky" color="transparent" elevation={1}>
        <Toolbar>
          <Typography variant="h5">Players</Typography>
        </Toolbar>
      </AppBar>
      <Box px={2} py={2}>
        {players.map((player, index) => (
          <PlayerCard key={index} player={player} />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        open={mobileOpen}
        anchor="right"
        variant="temporary"
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        open
        anchor="right"
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
