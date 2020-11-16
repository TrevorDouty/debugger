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

  async editBug(bugId, data) {
    try {
      const res = await api.put('/api/bugs/' + bugId, data)
      AppState.activeBug = res.data
      this.getActiveBug(bugId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteBug(bugId) {
    try {
      const res = await api.put('/api/bugs/' + bugId, { closed: true })
      AppState.activeBug = res.data
      logger.log('closed')
    } catch (error) {
      logger.error(error)
    }
  }
}

export const bugsService = new BugsService()
