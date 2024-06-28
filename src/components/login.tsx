import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

interface LoginProps {
  setPlayerName: (name: string) => void;
  joinGame: () => void;
}

export default function Login({ setPlayerName, joinGame }: LoginProps) {
  return (
    <>
      <Box
        component={"img"}
        src="src/assets/background.jpeg"
        position="absolute"
        width={"100%"}
        height={"100%"}
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Grid
                container
                direction="column"
                spacing={2}
                justifyContent="center"
              >
                <Grid item>
                  <Typography variant="h4" textAlign="center">
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
    </>
  );
}
