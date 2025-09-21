export default async function handler(req, res) {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  const city = req.query.city || "Mumbai";

  if (!WEATHER_API_KEY) {
    return res.status(500).json({ error: "Missing WEATHER_API_KEY" });
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&lang=en`;

  try {
    const response = await fetch(url); // Node 18+ has fetch built-in
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
