import { Router } from 'express'
import upload from '../modules/uploader'
import {
  ImageController,
  NewsController
} from '../controller'

const router = new Router()

// image controller
router.post('/image/create', upload('/').fields([ { name: 'image' } ]), ImageController.add)
router.delete('/image/delete/:id', ImageController.delete)

// news controller 
router.post('/news/create', NewsController.add)
router.put('/news/update', NewsController.update)
router.delete('/news/delete/:id', NewsController.delete)
router.get('/news/single/:id', NewsController.singleNews)
router.post('/news/all', NewsController.allNews)

export default router