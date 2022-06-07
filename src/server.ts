import app from './app';
import { config } from 'dotenv';

config();

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.info("Listening on port: ", PORT);
});