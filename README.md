# easy-obs

华为云 OBS 文件上传库

## NPM

```
npm install easy-obs
```

[上传测试](https://wangminghua111.github.io/easy-obs/test)

![image](https://user-images.githubusercontent.com/51693922/191936700-788e84a2-2302-4ca2-9134-3634cc3487ae.png)

## 使用教程

### 示例1：
```
import { ObsUploader } from 'easy-obs'

export async function oss(file: File, progress: (ev: ProgressEvent) => void): Promise<string> {
  const uploader = new ObsUploader({
    ak: process.env.VUE_APP_OSS_OBS_AK || '',
    sk: process.env.VUE_APP_OSS_OBS_SK || '',
    bucket: process.env.VUE_APP_OSS_OBS_BUCKETNAME || '',
    endpoint: process.env.VUE_APP_OSS_OBS_ENDPOINT || '',
  })

  // 上传成功，返回访问url地址
  const url = await uploader.upload(file, {
    // 输出日志
    // log: (type: string, msg: string) => console.log(`${type} ${msg}`),
    // 自定义上传地址
    // resource(file, suffix) {
    //   return ''
    // },
    // 输出进度
    // progress: (ev) => console.log(ev),
  })
  return url
}
```

### 示例2：
```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>文件上传测试</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="../dist/easy-obs.umd.js"></script>
</head>

<body>
  <div id="app">
    EndPoint：<input v-model.trim="EndPoint" type="text" placeholder="obs.cn-southwest-2.myhuaweicloud.com">
    Bucket：<input v-model.trim="Bucket" type="text" placeholder="test">
    <br>
    <br>
    AK：<input v-model.trim="AK" type="text" placeholder="输入AK">
    <br>
    SK：<input v-model.trim="SK" type="text" placeholder="输入SK">
    <br>
    <br>
    <input type="file" @change="onUpload">

    <br>
    <template v-for="url in urls">
      <a :href="url" :key="url">{{url}}</a>
      <br>
    </template>

  </div>
</body>

<script>
  const { createApp, ref } = Vue

  createApp({
    data() {
      const AK = sessionStorage.getItem('AK') || ''
      const SK = sessionStorage.getItem('SK') || ''
      const Bucket = sessionStorage.getItem('Bucket') || ''
      const EndPoint = sessionStorage.getItem('EndPoint') || ''
      const urls = ref([])
      return {
        EndPoint,
        Bucket,
        AK,
        SK,
        urls
      }
    },
    watch: {
      SK: (val) => {
        sessionStorage.setItem('SK', val)
      },
      AK: (val) => {
        sessionStorage.setItem('AK', val)
      },
      EndPoint: (val) => {
        sessionStorage.setItem('EndPoint', val)
      },
      Bucket: (val) => {
        sessionStorage.setItem('Bucket', val)
      }
    },
    methods: {
      async onUpload(ev) {
        const file = ev.target.files[0]
        const uploader = new easyObs.ObsUploader({
          ak: this.AK,
          sk: this.SK,
          bucket: this.Bucket,
          endpoint: this.EndPoint
        })
        const url = await uploader.upload(file, { log: (type, msg) => console.log(type, msg) })
        this.urls.push(url)
        alert('上传成功：' + url)
      }
    }
  }).mount('#app')
</script>

</html>
```
