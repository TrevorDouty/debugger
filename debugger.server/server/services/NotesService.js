import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class NotesService {
  async getNotes(query = {}) {
    return await dbContext.Notes.find(query).populate('creatorId')
  }

  async createNotes(body) {
    return await dbContext.Notes.create(body)
  }

  async deleteNote(noteId, userId) {
    const exists = await dbContext.Notes.findById(noteId)
    if (!exists) {
      throw new BadRequest('This note does not exist')
    } else if (exists._doc.creatorId == userId) {
      await dbContext.Notes.findByIdAndDelete(noteId)
      return 'The note has been deleted'
    }
  }

  async getNoteById(noteId) {
    return await dbContext.Notes.findById(noteId)
  }
}

export const notesService = new NotesService()
