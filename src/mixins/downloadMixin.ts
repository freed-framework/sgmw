/* eslint-disable */
import { Watch } from 'vue-property-decorator'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DownloadMixin extends Vue {
  /**
   * 将对象格式化成get请求所需格式
   * @param params 
   */
  parse(params) {
    let result = '?'
    const keys = Object.keys(params)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = params[key]

      if (value) {
        result += `${key}=${value}&`
      }
    }
    return encodeURI(result.slice(0, result.length - 1))
  }

  /**
   * 通过iframe下载excel
   * @param url 
   * @param params 
   */
  download(url, params) {
    Vue.nextTick(() => {
      const container: any = document.body
      let iframe = null
      const target = document.getElementById('download_iframe')
      if (target) {
        container.removeChild(target)

      }
      iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.id = 'download_iframe'
      // console.log(`${url}${this.parse(params)}`)
      iframe.src = `${url}${this.parse(params)}`
      container.appendChild(iframe)
    })
  }
}
