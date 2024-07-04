import { Card, CardMedia, Grid } from "@mui/material";
import { MemoryCard } from "../interfaces/card";

interface GameCardProps {
  onClick: () => void;
  card: MemoryCard;
}

export default function GameCard({ card, onClick }: GameCardProps) {
  return (
    <Grid item md={2} xs={6} onClick={onClick}>
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
                alt='backcard'
            />
        )}
      </Card>
    </Grid>
  );
}
