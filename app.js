import express from "express"
import sqlite3 from "sqlite3"

const app = express()
const PORT = process.env.PORT || 3000

// Initialize SQLite database
const db = new sqlite3.Database("./books.db", (err) => {
	if (err) {
		console.error("Error opening database:", err.message)
	} else {
		console.log("Connected to SQLite database")
		// Create books table if it doesn't exist
		db.run(`CREATE TABLE IF NOT EXISTS books (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			author TEXT NOT NULL,
			year INTEGER,
			isbn TEXT
		)`)
	}
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Sample route
app.get("/", (req, res) => {
	res.send("Hello, World!")
})

// Books routes
app.get("/api/books", (req, res) => {
	db.all("SELECT * FROM books", [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message })
			return
		}
		res.json({ books: rows })
	})
})

app.get("/api/books/:id", (req, res) => {
	db.get("SELECT * FROM books WHERE id = ?", [req.params.id], (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message })
			return
		}
		if (!row) {
			res.status(404).json({ message: "Book not found" })
			return
		}
		res.json({ book: row })
	})
})

app.post("/api/books", (req, res) => {
	const { title, author, year, isbn } = req.body
	db.run(
		"INSERT INTO books (title, author, year, isbn) VALUES (?, ?, ?, ?)",
		[title, author, year, isbn],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
				return
			}
			res.status(201).json({
				message: "Book created successfully",
				id: this.lastID,
			})
		}
	)
})

app.put("/api/books/:id", (req, res) => {
	const { title, author, year, isbn } = req.body
	db.run(
		"UPDATE books SET title = ?, author = ?, year = ?, isbn = ? WHERE id = ?",
		[title, author, year, isbn, req.params.id],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
				return
			}
			if (this.changes === 0) {
				res.status(404).json({ message: "Book not found" })
				return
			}
			res.json({ message: "Book updated successfully" })
		}
	)
})

app.delete("/api/books/:id", (req, res) => {
	db.run("DELETE FROM books WHERE id = ?", [req.params.id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message })
			return
		}
		if (this.changes === 0) {
			res.status(404).json({ message: "Book not found" })
			return
		}
		res.json({ message: "Book deleted successfully" })
	})
})

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})

// Close database connection on app termination
process.on("SIGINT", () => {
	db.close((err) => {
		if (err) {
			console.error(err.message)
		}
		console.log("Database connection closed")
		process.exit(0)
	})
})
