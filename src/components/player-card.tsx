import { Avatar, Box, Chip, Typography } from "@mui/material";
import { Player } from "../interfaces/player";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Box py={1}>
      <Chip
        key={player.id}
        sx={{
          width: "100%",
          padding: "0 8px",
          color: player.turn ? "deeppink" : "default",
          borderColor: player.turn ? "deeppink" : "default",
        }}
        variant="outlined"
        avatar={
          <Avatar
            sx={{
              backgroundColor: player.turn ? "deeppink" : "default",
            }}
          >
          <Typography color={"white"} fontWeight={player.turn ? "bold" : "w100"}>
            {player.name[0]}
          </Typography>
          </Avatar>
        }
        label={
          <Box
            px={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="body1" fontWeight={player.turn ? "bold" : "w100"}>{player.name}</Typography>
            <Box width={24} />
            <Typography variant="body1" fontWeight={"bold"}>
              {player.score}
            </Typography>
          </Box>
        }
      />
    </Box>
  );
}
