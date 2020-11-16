import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class BugsService {
  async getBugs() {
    try {
      const res = await api.get('/api/bugs')
      AppState.bugs = res.data
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async createBugs(data) {
    try {
      return await api.post('/api/bugs', data)
    } catch (error) {
      logger.error(error)
    }
  }

  async getActiveBug(bugId) {
    try {
      const res = await api.get('/api/bugs/' + bugId)
      AppState.activeBug = res.data
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const bugsService = new BugsService()
