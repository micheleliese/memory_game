import { Avatar, Box, Chip, Typography } from "@mui/material";
import { Player } from "../interfaces/player";

interface PlayerCardProps {
  player: Player
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Box py={1}>
      <Chip
        key={player.id}
        variant="outlined"
        color={
          player.color as
            | "success"
            | "primary"
            | "default"
            | "secondary"
            | "error"
            | "info"
            | "warning"
        }
        avatar={<Avatar>{player.name[0]}</Avatar>}
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
            <Typography variant="body1">{player.name}</Typography>
            <Box width={24} />
            <Typography variant="body1" fontWeight={"bold"}>
              {player.score}
            </Typography>
          </Box>
        }
        sx={{ width: "100%", padding: "0 8px" }}
      />
    </Box>
  );
}
