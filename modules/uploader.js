import fs from 'fs'
import path from 'path'
import mime from 'mime'
import crypto from 'crypto'
import multer from 'multer'

export default function (destination) {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        let dest = path.join('storage', destination)
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest)
        }
                
        cb(null, dest)
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, raw) => {
          if (err) { cb(null, err) }
          cb(null, `${raw.toString('hex')}${Date.now()}.${mime.getExtension(file.mimetype)}`)
        })
      }
    })
  })
}
