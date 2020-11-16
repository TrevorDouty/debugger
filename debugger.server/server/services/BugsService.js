import { dbContext } from '../db/DbContext'
class BugsService {
  async editBug(bugId, body) {
    return await dbContext.Bugs.findByIdAndUpdate(bugId, body)
  }

  async getBugs(query = {}) {
    return await dbContext.Bugs.find(query).populate('creatorId')
  }

  async createBugs(body) {
    return await dbContext.Bugs.create(body)
  }

  async getBugById(bugId) {
    return await dbContext.Bugs.findById(bugId)
  }
}

export const bugsService = new BugsService()
