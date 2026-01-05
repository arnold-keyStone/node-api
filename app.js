import express from "express"
import sqlite3 from "sqlite3"

const app = express()
const db = new sqlite3.Database("./books.db")

app.use(express.json())

// VULNERABLE: String concatenation
app.get("/api/search", (req, res) => {
	const searchTerm = req.query.term
	db.all("SELECT * FROM books WHERE title = '" + searchTerm + "'", (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message })
			return
		}
		res.json({ books: rows })
	})
})

// VULNERABLE: Template literal with variable
app.get("/api/author/:name", (req, res) => {
	const authorName = req.params.name
	db.get(`SELECT * FROM books WHERE author = '${authorName}'`, (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message })
			return
		}
		res.json({ book: row })
	})
})

// SECURE: Parameterized query (for comparison)
app.get("/api/books/:id", (req, res) => {
	db.get("SELECT * FROM books WHERE id = ?", [req.params.id], (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message })
			return
		}
		res.json({ book: row })
	})
})

// VULNERABLE: Hardcoded secret
const API_KEY = "sk_live_1234567890abcdefghijk"

app.listen(3000)
