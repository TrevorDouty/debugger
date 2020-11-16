import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import ProfileSchema from '../models/Profile'
import NoteSchema from '../models/Note'
import BugSchema from '../models/Bug'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Profile = mongoose.model('Profile', ProfileSchema);

  Notes = mongoose.model('Note', NoteSchema);

  Bugs = mongoose.model('Bug', BugSchema);
}

export const dbContext = new DbContext()
