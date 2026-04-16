const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Connection
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        db = client.db("eventdb");
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ DB Connection Error:", err);
    }
}
connectDB();


// ================== REGISTER ROUTE ==================
app.post('/register', async (req, res) => {
    try {
        const { regno, name, events } = req.body;

        // Handle no event selected
        if (!events) {
            return res.send("❌ Please select at least 1 event");
        }

        // Convert to array
        const eventList = Array.isArray(events) ? events : [events];

        // Validation: max 3 events
        if (eventList.length > 3) {
            return res.send("❌ You can select maximum 3 events only");
        }

        // Check duplicate
        const existing = await db.collection('registrations').findOne({ regno });

        if (existing) {
            return res.send("❌ Register Number already exists");
        }

        // Insert data
        await db.collection('registrations').insertOne({
            regno,
            name,
            events: eventList
        });

        res.send(`
            <h2>✅ Registration Successful</h2>
            <p><b>Register Number:</b> ${regno}</p>
            <p><b>Name:</b> ${name}</p>
            <p><b>Events:</b> ${eventList.join(", ")}</p>
            <br>
            <a href="/">Go Back</a>
        `);

    } catch (err) {
        console.error(err);
        res.send("❌ Server Error");
    }
});


// ================== SEARCH ROUTE ==================
app.get('/search', async (req, res) => {
    try {
        const { regno } = req.query;

        const result = await db.collection('registrations').findOne({ regno });

        if (!result) {
            return res.send(`
                <h2>❌ No registration found</h2>
                <a href="/admin.html">Go Back</a>
            `);
        }

        res.send(`
            <h2>📄 Registration Details</h2>
            <p><b>Register Number:</b> ${result.regno}</p>
            <p><b>Name:</b> ${result.name}</p>
            <p><b>Events:</b> ${result.events.join(", ")}</p>
            <br>
            <a href="/admin.html">Go Back</a>
        `);

    } catch (err) {
        console.error(err);
        res.send("❌ Server Error");
    }
});


// ================== START SERVER ==================
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
