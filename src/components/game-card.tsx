import { Card, CardMedia, Grid } from "@mui/material";
import { MemoryCard } from "../interfaces/card";
import ReactCardFlip from "react-card-flip";

interface GameCardProps {
  onClick: () => void;
  card: MemoryCard;
}

export default function GameCard({ card, onClick }: GameCardProps) {
  return (
    <Grid item xs={6} sm={6} md={4} lg={2} onClick={onClick}>
      <ReactCardFlip isFlipped={!card.isFlipped} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
        <Card sx={{ borderRadius: 5 }}>
          <CardMedia
            component="img"
            height="100%"
            image={`src/assets/cards/${card.imageId}.png`}
            alt={card.imageId}
          />
        </Card>
        <Card sx={{ borderRadius: 5 }}>
          <CardMedia
            component="img"
            height="100%"
            image={`src/assets/cards/backcard.jpg`}
            alt="backcard"
          />
          {card.imageId}
        </Card>
      </ReactCardFlip>
    </Grid>
  );
}
