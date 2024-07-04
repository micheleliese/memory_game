import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSocket } from "../providers/use-socket";

export default function Login() {
  const { setPlayerName, joinGame } = useSocket();

  return (
    <Box
      sx={{
        backgroundImage: `url("src/assets/background.jpeg")`,
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: 'violet', mt: 9}}>
            <CardContent>
              <Grid
                container
                direction="column"
                spacing={2}
                justifyContent="center"
              >
                <Grid item>
                  <Typography variant="h4" textAlign="center" color={'white'} fontWeight={'bold'}>
                    Entrar no jogo
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    label="Nome do jogador"
                    onChange={(e) => setPlayerName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={joinGame}
                    fullWidth
                  >
                    Entrar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
