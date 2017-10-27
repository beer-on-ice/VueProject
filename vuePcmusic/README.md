# 网易云音乐web版（vue)

## 状态： 进行中

### 运用到的技术：
jQuery+axios+vue-router+webpack2+vue-cli

### 已实现功能：
1. 发现音乐pageFind
	-	banner轮播图，推荐音乐，推荐歌单等功能
2. 用户登录功能login
3. 登录后用户歌单列表的展示
4. 歌单歌曲列表，歌单评价，歌单信息
5. 搜索功能，搜索候选
6. 音乐播放，暂停，切换
7. 音乐详情
	- 歌词滚动
	- 歌曲信息展示
	- 歌曲评论
	- 相似歌曲
	- 最近听的人
8. 所有id都有预留，可进行下一步开发

### 问题：
1. 获取歌曲信息时间过长，如果多次快速切换歌曲，会导致乱序
2. 歌曲在播放时，点击其他歌曲，浏览小窗和详情信息都会变成点击的歌曲的相关信息


### 安装
#### 项目部分
$ npm i

$ npm run dev

#### 网易云api部分
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ npm install

$ node app.js 