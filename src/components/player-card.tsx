import { Avatar, Box, ListItem, Typography } from "@mui/material";
import { Player } from "../interfaces/player";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {

  const getBackgroundColor = () => {
    if (player.turn) {
      return "rgba(255, 0, 0, 0.1)"
    } else if (player.isHost) {
      return "rgba(0, 0, 255, 0.1)"
    } else if (!player.isActive) {
      return "rgba(0, 0, 0, 0.1)"
    } else {
      return "transparent";
    }
  }

  const getColor = () => {
    if (player.turn) {
      return "deeppink"
    } else if (player.isHost) {
      return "blue"
    } else if (!player.isActive) {
      return "gray"
    } else {
      return "black";
    }
  }

  return (
    <Box py={1}>
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: getBackgroundColor(),
          color: getColor() 
        }}
      >
        <Avatar
          sx={{
            backgroundColor: getColor(),
          }}
        >
          <Typography color={"white"} fontWeight={player.turn ? "bold" : "w100"}>
            {player.name[0]}
          </Typography>
        </Avatar>
        <Typography variant="body1" fontWeight={player.turn ? "bold" : "w100"}>
          {player.name}
        </Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          {player.score}
        </Typography>
      </ListItem>
    </Box>
  );
}
