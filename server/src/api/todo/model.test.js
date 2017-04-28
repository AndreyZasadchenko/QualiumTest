import { Todo } from '.'
import { User } from '../user'

let user, todo

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  todo = await Todo.create({ user, descrpition: 'test', done: 'test', date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = todo.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(todo.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.descrpition).toBe(todo.descrpition)
    expect(view.done).toBe(todo.done)
    expect(view.date).toBe(todo.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = todo.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(todo.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.descrpition).toBe(todo.descrpition)
    expect(view.done).toBe(todo.done)
    expect(view.date).toBe(todo.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
