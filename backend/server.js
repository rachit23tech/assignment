import express from 'express';
import database from './db.js';
import ChargingStation from './models/ChargingStation.js';
import authRoutes from './routes/auth.route.js';
import authMiddleware from './middleware/auth.middleware.js';
import cors from 'cors';
export const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get("/api/stations", (req, res) => {
  ChargingStation.find()
    .then(stations => {
      res.json(stations);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.post("/api/stations", authMiddleware, async (req, res) => {
  try {
    const newStation = new ChargingStation(req.body);
    const savedStation = await newStation.save();
    res.status(201).json(savedStation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/stations/:id", authMiddleware, async (req, res) => {
  try {
    const updatedStation = await ChargingStation.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedStation) {
      return res.status(404).json({ error: "Charging station not found" });
    }
    res.json(updatedStation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/stations/:id", authMiddleware, async (req, res) => {
  try {
    const deletedStation = await ChargingStation.findByIdAndDelete(req.params.id);
    if (!deletedStation) {
      return res.status(404).json({ error: "Charging station not found" });
    }
    res.json({ message: "Charging station deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})
export default app;