import Note from '../models/notes.js'

const createNotes = async(req,res) => {
    try{

        const {title,content,category} = req.body;
        const author = req.user.id;

        if (!title || !content || !category) {
            return res.status(400).json({ msg: "All fields are required" });
          }

        const newNote = await Note.create({
            title,
            content,
            category,
            author,
        })

        return res.status(201).json(newNote)
    }catch(err){
        return res.status(500).json({msg:`internal server error : ${err}`})
    }
}

// Get a note by ID
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findOne({ _id: id, author: req.user.id });

        if (!note) {
            return res.status(404).json({ message: 'Note not found or unauthorized' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch note", error });
    }
};

//get all notes
const getNotes = async (req,res) => {
    try {
        const author = req.user.id;
        const notes = await Note.find({ author });

        if (notes.length === 0) {
            return res.status(404).json({ message: 'No notes found' });
        }

        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notes", error });
    }
}
// Use ES Module syntax:
export { createNotes, getNoteById, getNotes };