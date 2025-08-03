import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/weather', async (req, res) => {
    const city = req.query.city ||'Mumbai';
    const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&lang=en`;

    try {
        const response = await fetch(url);
        const data =  await response.json()

        res.json(data);

    } catch(e) {
        res.writeHead(500, {'Content-Type': 'text/plain'})
        res.end("Server error");
    }
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})