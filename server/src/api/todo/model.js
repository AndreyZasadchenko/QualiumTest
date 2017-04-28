import mongoose, { Schema } from 'mongoose'

const todoSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  descrpition: {
    type: String
  },
  done: {
    type: String
  }
}, {
  timestamps: true
})

todoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      descrpition: this.descrpition,
      done: this.done,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Todo', todoSchema)

export const schema = model.schema
export default model
