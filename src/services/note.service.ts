
import { CONFLICT, NOT_FOUND } from "../constants/http";
import { Note } from "../entity/note.entity";
import { User } from "../entity/user.entity";
import appAssert from "../util/app.assert";

interface createNoteType {
    title: string,
    description: string,
}

export const creatNewNote = async (params: createNoteType, userId: number) => {
    try {
        const user = await User.findOne({where: {id: userId}})
        appAssert(user, NOT_FOUND, "User not found")
        //validate note
        const validateNote = await Note.findOne({where: {title: params.title}})

        appAssert(!validateNote, CONFLICT, "Title can't be duplicated")

        const creatingNote = await Note.create({
            userId: user?.id,
            title: params.title,
            description: params.description
        }).save()

        console.log(creatNewNote)
        return creatingNote
    } catch (error) {
        throw new Error("Error creating")
    }
}