declare type ObsVersion = '2.0' | '3.0';
declare type ObsUploaderOptions = {
    /**
     * Access Key Id
     */
    ak: string | Promise<string>;
    /**
     * Secret Access Key
     */
    sk: string | Promise<string>;
    /**
     * 存储桶名称
     */
    bucket: string | Promise<string>;
    /**
     * OBS为每个区域提供Endpoint，用于处理各自区域的访问请求。
     */
    endpoint: string | Promise<string>;
    /**
     * 请求协议头，默认值 https
     */
    protocol?: 'http' | 'https';
};
declare type UploadOptions = {
    /**
     * 打印日志
     */
    log?: (type: string, msg: any) => void;
    /**
     * 自定义获取上传的文件目录，默认值：/${2022-09-22}/${crypto.randomUUID()}.${suffix}
     */
    resource?: (file: File, suffix?: string) => string;
    progress?: (ev: ProgressEvent) => void;
};
/**
 * 上传器
 */
interface IUploader {
    /**
     * 上传文件
     * @param file
     * @returns 上传成功后的文件访问路径
     */
    upload(file: File, opts?: UploadOptions): Promise<string>;
}
/**
 * 华为云 obs 上传器
 */
export declare class ObsUploader implements IUploader {
    #private;
    version: ObsVersion;
    constructor(options: ObsUploaderOptions);
    /**
     * 克隆当前上传对象实例
     * @param options 覆盖配置选项
     * @returns
     */
    clone(options?: ObsUploaderOptions): ObsUploader;
    upload(file: File, opts?: UploadOptions): Promise<string>;
}
export default ObsUploader;
