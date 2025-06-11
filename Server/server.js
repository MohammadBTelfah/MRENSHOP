require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
app.use(cors({
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT || 5000, () => console.log("🚀 Server running"));
}).catch(err => console.error("❌ DB error:", err));
