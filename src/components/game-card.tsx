import { Box, Card, Grid } from "@mui/material";
import { MemoryCard } from "../interfaces/card";

interface GameCardProps {
  onClick: () => void;
  card: MemoryCard;
}

export default function GameCard({ card, onClick }: GameCardProps) {
  return (
    <Grid item md={2} xs={6} onClick={onClick}>
      <Card sx={{ background: "black" }}>
        {card.isFlipped ? (
          <img
            src={`src/assets/cards/${card.imageId}.png`}
            alt="card"
            height={256}
          />
        ) : (
          <Box height={256} minWidth={20} />
        )}
      </Card>
    </Grid>
  );
}
