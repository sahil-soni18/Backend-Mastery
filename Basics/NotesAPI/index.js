import express from "express";
import notesRouter from "./notes.service.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/notes', notesRouter);

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});

