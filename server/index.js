const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
app.use(cors());
app.use(express.json());

// Create a pool
const db = mysql.createPool({
  host: "dpg-d71c08v5r7bs73dpm9fg-a",
  user: "root",
  password: "m1mSbRl6P7sOdKK7VSLZGiQkNxpeUOLJ",
  database: "crud_contact_mzr9",
  port: 5432,
});

app.get("/api/get", (req, res) => {
  const json=[
  {
    "id": 1,
    "name": "Alex",
    "email": "alex@samplemail.com",
    "contact": "99876543210"
  },
  {
    "id": 2,
    "name": "Raj Thosani",
    "email": "raj.thosani@samplemail.com",
    "contact": "9988776651"
  },
  {
    "id": 3,
    "name": "amit singh",
    "email": "amit.singh@samplemail.com",
    "contact": "9876598765"
  },
  {
    "id": 4,
    "name": "Vicky Sharma",
    "email": "vicky.sharma@samplemail.com",
    "contact": "9876556789"
  },
  {
    "id": 5,
    "name": "John Doe",
    "email": "johndoe12@samplemail.com",
    "contact": "99876543210"
  },
  {
    "id": 6,
    "name": "Vishal Dasvate",
    "email": "vishal.dasvate@gmail.com",
    "contact": "9876556789"
  },
  {
    "id": 7,
    "name": "Tushar Sonawane",
    "email": "tushar.sonawane@gmail.com",
    "contact": "9876556789"
  },
  {
    "id": 8,
    "name": "Anay Maurya",
    "email": "anay.maurya@gmail.com",
    "contact": "7897897890"
  }
]
  const sqlGet = "SELECT * FROM contact_db";
  console.log("aaa", sqlGet);
  // db.query(sqlGet, (error, results) => {
  //   res.send(results);
  // });
  res.send(json)
});

app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
  db.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM contact_db WHERE id = ?";

  db.query(sqlRemove, [id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete record" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully" });
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
  db.query(sqlGet, id, (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send(results);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlUpdate =
    "UPDATE contact_db SET name=?, email=?, contact=? WHERE id = ?";
  db.query(sqlUpdate, [name, email, contact, id], (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send(results);
  });
});

app.get("/insert-static", (req, res) => {
  // Static values
  const sqlInsert =
    "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
  const values = ["raj", "raj@gmail.com", "9876543210"];

  db.query(sqlInsert, values, (err, results) => {
    if (err) {
      console.error("Error inserting static data:", err);
      return res.status(500).send("Database error");
    }

    console.log("Static insert result:", results);
    res.send("Static data inserted successfully!");
  });
});

const PORT = process.env.PORT || 5000;

app.listen("0.0.0.0", () => {
  console.log(`Server running on port`);
});
