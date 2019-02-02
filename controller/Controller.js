import fs from 'fs'

export default class Controller {
  constructor () {
    //
  }

  static handleErrors (e) {
    console.log(e)
  }

  static unlinkImage (path) {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }
  }

  static checkImage (filename) {
    if (!['jpg', 'png', 'jpeg', 'gif'].includes(filename.split('.')[1].toLowerCase())) {
      Controller.unlinkImage(`storage/${filename}`)
      
      return { error: true, message: `Wrong file type. Please check jpg, jpeg, png, gif.` }
    }

    return { error: false }
  }
}