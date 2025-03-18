import { Vimeo } from 'vimeo';

let Client = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_TOKEN)

const PromisifiedVimeoClient = (url) => {
  return new Promise((resolve, reject) => {
    Client.request({ method: 'GET', path: url }, (error, result) => error ? reject(error) : resolve(result))
  })
}

export default PromisifiedVimeoClient