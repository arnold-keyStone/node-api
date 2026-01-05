import express from "express"

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Sample route
app.get("/", (req, res) => {
	res.send("Hello, World!")
})

// Books routes
app.get("/api/books", (req, res) => {
	res.json({ message: "Get all books" })
})

app.get("/api/books/:id", (req, res) => {
	res.json({ message: `Get book with id: ${req.params.id}` })
})

app.post("/api/books", (req, res) => {
	res.status(201).json({ message: "Create a new book", body: req.body })
})

app.put("/api/books/:id", (req, res) => {
	res.json({ message: `Update book with id: ${req.params.id}`, body: req.body })
})

app.delete("/api/books/:id", (req, res) => {
	res.json({ message: `Delete book with id: ${req.params.id}` })
})

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
