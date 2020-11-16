import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:bugId/notes', this.getNotesByBugId)
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.createBugs)
      .get('/:bugId', this.getBugById)
      .put('/:bugId', this.editBug)
  }

  async editBug(req, res, next) {
    try {
      return res.send(await bugsService.editBug(req.params.bugId, req.body))
    } catch (error) {

    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      return res.send(await notesService.getNotes({ bug: req.params.bugId }))
    } catch (error) {
      next(error)
    }
  }

  async getBugs(req, res, next) {
    try {
      return res.send(await bugsService.getBugs())
    } catch (error) {
      next(error)
    }
  }

  async createBugs(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creatorEmail = req.userInfo.email
      res.send(await bugsService.createBugs(req.body))
      console.log(req.body.creatorId)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      return res.send(await bugsService.getBugById(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }
}
