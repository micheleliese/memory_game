import { Avatar, Box, Chip, Drawer, Typography } from "@mui/material";
import { useDrawer } from "../providers/use-drawer";
import { Player } from "../interfaces/player";

interface CustomDrawerProps {
  players: Array<Player>;
}

export default function CustomDrawer({ players }: CustomDrawerProps) {
  const { drawerWidth, mobileOpen, handleDrawerClose, handleDrawerTransitionEnd } = useDrawer();

  // const users = [...Array(10)].map((_, i) => ({
  //   id: i,
  //   name: `User ${i}`,
  //   score: Math.floor(Math.random() * 100),
  //   color: i === 2 ? "success" : "primary",
  // }));

  const users = players;

  const drawerContent = (
    <Box bgcolor="white" height="100%" px={3} py={3}>
      <Typography variant="h6">Players</Typography>
      {users.map((user, index) => (
        <Box key={index} py={1}>
          <Chip
            key={user.id}
            variant="outlined"
            color={
              user.color as
                | "success"
                | "primary"
                | "default"
                | "secondary"
                | "error"
                | "info"
                | "warning"
            }
            avatar={<Avatar>{user.name[0]}</Avatar>}
            label={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography variant="body1">{user.name}</Typography>
                <Typography variant="body2">{user.score}</Typography>
              </Box>
            }
            sx={{ width: "100%", padding: "0 8px" }}
          />
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        anchor="right"
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
