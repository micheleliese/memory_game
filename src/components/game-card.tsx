import { Card, CardMedia, Grid } from "@mui/material";
import { MemoryCard } from "../interfaces/card";

interface GameCardProps {
  onClick: () => void;
  card: MemoryCard;
}

export default function GameCard({ card, onClick }: GameCardProps) {
  return (
    <Grid item xs={6} sm={6} md={4} lg={2} onClick={onClick}>
      <Card sx={{ borderRadius: 5 }}>
        {card.isFlipped ? (
          <CardMedia
            component="img"
            height="100%"
            image={`src/assets/cards/${card.imageId}.png`}
            alt={card.imageId}
          />
        ) : (
          <CardMedia
            component="img"
            height="100%"
            image={`src/assets/cards/backcard.jpg`}
            alt="backcard"
          />
        )}
      </Card>
    </Grid>
  );
}
