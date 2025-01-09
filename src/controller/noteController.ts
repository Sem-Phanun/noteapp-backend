import { Request, Response } from "express";
import { noteSchema } from "../schema/note.schema";
import { creatNewNote } from "../services/note.service";
import { CREATED, INTERNAL_SERVER_ERROR } from "../constants/http";

export const createNote = async (req: Request, res: Response) => {
    const userId:number = req.body.userId
    const request = noteSchema.parse({...req.body})
    try {
        const newNote = await creatNewNote(request, userId)

        res.status(CREATED).json({
            message: "Note created successfully",
            note: newNote,
        })
    } catch (err:any) {
        res.status(INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while creating the note",
            error: err.message
        })
    }
}
