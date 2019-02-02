export default class Validator {
  constructor () {
    //
  }

  static async checkSchema (notValidated) {
    let errors = []

    let schema = {
      title: { type: 'string', message: 'Your title is empty or incorrect.' },
      description: { type: 'string', min: { key: 10, message: 'Description must have at least 10 letters.' }, message: 'Your description is empty or incorrect.' },
      image_id: { type: 'number', message: 'Your Image part is empty or incorrect.' }
    }

    Object.entries(notValidated).forEach(([key, value]) => {
      if (schema[key]) {
        if (!value || typeof value !== schema[key].type) {
          errors.push({ field: key, message: schema[key].message })
        } else if (schema[key].min && value.length < schema[key].min.key) {
          errors.push({ key, message: schema[key].min.message })
        }
      }
    })

    return errors
  }
}