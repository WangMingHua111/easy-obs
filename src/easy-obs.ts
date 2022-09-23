import HmacSha1 from 'crypto-js/hmac-sha1'
import EncBase64 from 'crypto-js/enc-base64'

type ObsVersion = '2.0' | '3.0'
type ObsUploaderOptions = {
  /**
   * Access Key Id
   */
  ak: string | Promise<string>
  /**
   * Secret Access Key
   */
  sk: string | Promise<string>
  /**
   * 存储桶名称
   */
  bucket: string | Promise<string>
  /**
   * OBS为每个区域提供Endpoint，用于处理各自区域的访问请求。
   */
  endpoint: string | Promise<string>

  /**
   * 请求协议头，默认值 https
   */
  protocol?: 'http' | 'https'
}

type UploadOptions = {
  /**
   * 打印日志
   */
  log?: (type: string, msg: any) => void
  /**
   * 自定义获取上传的文件目录，默认值：/${2022-09-22}/${crypto.randomUUID()}.${suffix}
   */
  resource?: (file: File, suffix?: string) => string
  progress?: (ev: ProgressEvent) => void
}
/**
 * 上传器
 */
interface IUploader {

  /**
   * 上传文件
   * @param file 
   * @returns 上传成功后的文件访问路径 
   */
  upload(file: File, opts?: UploadOptions): Promise<string>
}

/**
 * 生成指定位数的GUID，无【-】格式
 * @param digit 位数，默认值8
 * @returns
 */
function guid(digit = 16): string {
  return 'x'.repeat(digit).replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
/**
 * 华为云 obs 上传器
 */
export class ObsUploader implements IUploader {
  version: ObsVersion = '3.0'

  #options: ObsUploaderOptions

  constructor(options: ObsUploaderOptions) {

    if (typeof options === 'undefined') throw new Error('ObsUploaderOptions是必须的')
    if (typeof options.ak === 'undefined') throw new Error('Ak是必须的')
    if (typeof options.sk === 'undefined') throw new Error('Sk是必须的')
    if (typeof options.bucket === 'undefined') throw new Error('Bucket是必须的')
    if (typeof options.endpoint === 'undefined') throw new Error('Endpoint是必须的')

    this.#options = options
  }

  /**
   * 克隆当前上传对象实例
   * @param options 覆盖配置选项
   * @returns 
   */
  clone(options?: ObsUploaderOptions): ObsUploader {
    XMLHttpRequestUpload
    return new ObsUploader(Object.assign({}, this.#options, options))
  }
  async upload(file: File, opts?: UploadOptions): Promise<string> {
    const d = new Date()
    const { resource, log, progress } = {
      resource: (f: File, suffix = '') => `/${d.getFullYear()}-${d.getMonth().toString().padStart(2, '0')}-${d.getDay().toString().padStart(2, '0')}/${guid()}${suffix}`,
      ...opts,
    }
    const suffix = file.name.match(/\.\w+$/)?.[0]
    const objectURL = resource(file, suffix)
    const { ak, sk, bucket, endpoint, protocol = 'https' } = this.#options
    const AK = ak instanceof Promise ? await ak : ak
    const SK = sk instanceof Promise ? await sk : sk
    const BucketName = bucket instanceof Promise ? await bucket : bucket
    const Endpoint = endpoint instanceof Promise ? await endpoint : endpoint

    const { type } = file

    // 排序对象key的函数
    const sort_object = (obj: { [name: string]: string }) => {
      return Object.keys(obj).sort().reduce((result: { [name: string]: string }, key: string) => {
        result[key] = obj[key]
        return result
      }, {})
    }

    /**
     * 
     1. 计算StringToSign:
        	
    StringToSign = HTTP-Verb + "\n" + 
    Content-MD5 + "\n" + 
    Content-Type + "\n" + 
    Date + "\n" + 
    CanonicalizedHeaders + 
    CanonicalizedResource
     */
    const HTTPVerb = 'PUT'
    const ContentMD5 = ''
    const ContentType = type
    const DateStr = new Date().toUTCString()
    const CanonicalizedHeaders = sort_object([
      ['x-obs-date', DateStr],
    ].reduce((result: { [name: string]: string }, header: Array<string>) => {
      result[header[0]] = header[1]
      return result
    }, {}))
    const CanonicalizedResource = `/${bucket}/${objectURL}`.replace(/\/+/g, '/')
    const StringToSign = [
      HTTPVerb, ContentMD5, ContentType, '',
      Object.keys(CanonicalizedHeaders).map(key => `${key}:${CanonicalizedHeaders[key]}`).join('\n'),
      CanonicalizedResource
    ].join('\n')

    /**
     2. 计算Signature:
        	
    Signature = 
    Base64(Hmac-sha1(SK, StringToSign))
     */
    const Signature = HmacSha1(StringToSign, SK).toString(EncBase64)

    /**
     3. 计算Authorization
  
    Authorization = "OBS " + AK + ":" + Signature
     */
    const Authorization = `OBS ${AK}:${Signature}`

    log?.('AK', AK)
    log?.('BucketName', BucketName)
    log?.('Endpoint', Endpoint)

    log?.('HTTPVerb', HTTPVerb)
    log?.('ContentMD5', ContentMD5)
    log?.('ContentType', ContentType)
    log?.('CanonicalizedHeaders', CanonicalizedHeaders)
    log?.('CanonicalizedResource', CanonicalizedResource)

    log?.('StringToSign', StringToSign)
    log?.('Authorization', Authorization)

    // 执行文件上传
    const AccessPath = `${protocol}://${BucketName}.${Endpoint}${('/' + objectURL).replace(/\/+/g, '/')}`
    log?.('AccessPath', AccessPath)
    // await fetch(AccessPath, {
    //   method: HTTPVerb,
    //   headers: {
    //     Authorization,
    //     'Content-Type': ContentType,
    //     ...CanonicalizedHeaders
    //   },
    //   body: file,
    // })

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("put", AccessPath);
      xhr.setRequestHeader("Authorization", Authorization);
      xhr.setRequestHeader("Content-Type", ContentType);
      Object.keys(CanonicalizedHeaders).forEach(key => xhr.setRequestHeader(key, CanonicalizedHeaders[key]))
      xhr.upload.onprogress = (event) => {
        // 回调上传进度
        progress?.(event)
      };
      xhr.onerror = () => {
        reject("上传失败！");
      };
      xhr.onabort = () => {
        reject("已取消上传");
      };
      xhr.upload.onabort = () => {
        reject("已取消上传");
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve();
        }
      };
      xhr.send(file);
    }).catch((e) => {
      throw new Error(e);
    });

    return AccessPath
  }
}

export default ObsUploader