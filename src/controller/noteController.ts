import { Request, Response } from "express";
import { Note } from "../entity/note.entity";

export const createNote = async (req: Request, res: Response) => {
    const { title, content, userId } = req.body;

    try {
        const note = await Note.create({
            title,
            content,
            userId,
            createdAt: new Date(),
        }).save();
        res.json({
            message: "Note created",
            note: note,
        });
    } catch (err) {
        res.send({
            error: err,
            message: "An error occurred while creating the note",
        })
    }
}
