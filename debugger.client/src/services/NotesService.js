import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class NotesService {
  async getNotes(bugId) {
    try {
      const res = await api.get('/api/bugs/' + bugId + '/notes')
      AppState.notes = res.data
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async createNote(data, bugId) {
    try {
      const newNote = {
        description: data,
        bug: bugId
      }
      return await api.post('/api/notes', newNote)
    } catch (error) {
      logger.error(error)
    }
  }
}
export const notesService = new NotesService()
