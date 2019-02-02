import Controller from './Controller'
import { development } from '../knexfile'
import validator from '../services/Validator'
import db from 'knex'
const knex = db(development)

export default class NewsController extends Controller {
  constructor () {
    super()
  }

  static async allNews (req, res) {
    try {
      let page = isNaN(Number(req.body.page)) || req.body.page <= 0 ? 1 : req.body.page
      let limit = isNaN(Number(req.body.limit)) || req.body.limit <= 0 ? 10 : req.body.limit
      let offset = (page * limit) - limit

      let news = await knex.raw(
        `SELECT * FROM news ` +
        `LEFT JOIN images ` +
        `ON images.id=news.image_id ` +
        `ORDER BY news.created_at DESC ` +
        `LIMIT ${offset}, ${limit} `
      )

      res.json({
        news: news[0]
      })
    } catch (e) {
      super.handleErrors(e)
    }
  }

  static async singleNews (req, res) {
    try {
      let news = await knex.raw(
        `SELECT n.*, i.id AS img_id, i.alt, i.path ` + 
        `FROM news AS n ` +
        `LEFT JOIN images AS i ` +
        `ON n.image_id=i.id ` +
        `WHERE n.id=${isNaN(parseInt(req.params.id)) ? 0 : req.params.id}`
      )

      res.json({
        news: news[0]
      })
    } catch (e) {
      super.handleErrors(e)
    }
  }

  static async add (req, res) {
    try {
      let validated = await validator.checkSchema(req.body)

      if (validated.length) {
        return res.json({ success: false, message: validated })
      }

      await knex('news').insert({
        title: req.body.title,
        description: req.body.description,
        image_id: req.body.image_id,
        created_at: new Date(),
        updated_at: new Date()
      })

      return res.json({
        success: true
      })
    } catch (e) {
      super.handleErrors(e)
    }
  }

  static async update (req, res) {
    try {
      let validated = await validator.checkSchema(req.body)

      if (validated.length) {
        return res.json({ success: false, message: validated })
      }

      let news = await knex('news').where({ id: req.body.id })

      if (!news.length) {
        return res.json({ success: false })
      }

      news = {
        title: req.body.title,
        description: req.body.description,
        image_id: req.body.image_id,
        updated_at: new Date()
      }

      await knex('news').where({ id: req.body.id }).update(news)

      return res.json({
        ...news,
        id: req.body.id
      })
    } catch (e) {
      super.handleErrors(e)
    }
  }

  static async delete (req, res) {
    try {
      const newsData = await knex('news').where({ id: req.params.id })

      if (!newsData.length) {
        return res.json({ success: false })
      }

      await knex('news').where({ id: newsData[0].id }).del()

      return res.json({
        success: true
      })
    } catch (e) {
      super.handleErrors(e)
    }
  }
}