import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Todo, { schema } from './model'

const router = new Router()
const { descrpition, done, date } = schema.tree

/**
 * @api {post} /todos Create todo
 * @apiName CreateTodo
 * @apiGroup Todo
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam descrpition Todo's descrpition.
 * @apiParam done Todo's done.
 * @apiParam date Todo's date.
 * @apiSuccess {Object} todo Todo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todo not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ descrpition, done, date }),
  create)

/**
 * @api {get} /todos Retrieve todos
 * @apiName RetrieveTodos
 * @apiGroup Todo
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} todos List of todos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /todos/:id Retrieve todo
 * @apiName RetrieveTodo
 * @apiGroup Todo
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} todo Todo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todo not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /todos/:id Update todo
 * @apiName UpdateTodo
 * @apiGroup Todo
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam descrpition Todo's descrpition.
 * @apiParam done Todo's done.
 * @apiParam date Todo's date.
 * @apiSuccess {Object} todo Todo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todo not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ descrpition, done, date }),
  update)

/**
 * @api {delete} /todos/:id Delete todo
 * @apiName DeleteTodo
 * @apiGroup Todo
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Todo not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
