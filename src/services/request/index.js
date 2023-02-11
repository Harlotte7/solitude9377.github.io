import axios from 'axios';
import { BASE_URL, TIMEOUT } from './config'
import useMainstore from "@/stores/modules/main.js"

const mainstore = useMainstore();

class HYRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    this.instance.interceptors.request.use(config => {
      mainstore.isLoading = true
      return config
    },err => {
      return err
    })
    this.instance.interceptors.response.use(res =>{
      mainstore.isLoading=false
      return res
    },err => {
      mainstore.isLoading = false
      return err
    })
  }
  request(config) {
    // mainstore.isLoading = true
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
        // mainstore.isLoading = false
      }).catch(err => {
        reject(err)
        // mainstore.isLoading = false
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)

