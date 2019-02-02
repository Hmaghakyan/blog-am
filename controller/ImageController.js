import db from 'knex'
import Controller from './Controller'
import { development } from '../knexfile'

const knex = db(development)

export default class ImageController extends Controller {
  constructor () {
    super()
  }

  static async add (req, res) {
    try {
      let check = super.checkImage(req.files.image[0].filename)

      if (check.error) {
        return res.json(check)
      }

      await knex('images').insert({
        path: req.files.image[0].path,
        alt: req.body.alt,
        created_at: new Date(),
        updated_at: new Date()
      })

      return res.json({
        success: true
      })
    } catch (e) {
      super.unlinkImage(`storage/${req.files.image[0].filename}`)
      super.handleErrors(e)
    }
  }

  static async delete (req, res) {
    try {
      const image = await knex('images').where({ id: req.params.id })

      if (!image.length) {
        return res.json({ success: false })
      }

      await knex('images').where({ id: image[0].id }).del()

      super.unlinkImage(image[0].path)

      return res.json({
        success: true
      })
    } catch (e) {
      super.handleErrors(e)
    }
  }
}