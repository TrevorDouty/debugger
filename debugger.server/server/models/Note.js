import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Note = new Schema(
  {
    description: { type: String, required: true },
    bug: { type: ObjectId, required: true, ref: 'Bug' },
    creatorId: { type: String, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Note
