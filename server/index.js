import express from "express";
import axios from "axios";
import team from "./team.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Proxy API
app.get("/api/blogs", async (req, res) => {
  try {
    const response = await axios.get("https://lms.studyjam.in/api/common/blogs/");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching blogs from external API:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    res.status(500).json({ error: "Failed to fetch blogs", details: error.message });
  }
});

app.get("/api/team", (req, res) => {
  res.json(team);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
