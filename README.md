# blog-base-nuxt

## 环境

- Node.js  v14.17.6

- MongoDB  v5.0.3

  **MongoDB需要配置副本集**

## 项目部署

### 部署后端接口服务器

进入项目目录，将**./my.config.js** 文件更改为 **./config.js**,并根据内容提示对服务器需要的配置项进行配置。

```bash
#安装进程管理工具pm2
npm install pm2 -g

# 安装依赖
npm install

#启动后端服务器
pm2 start  'npm run server' --name backServer
```



### 部署前端项目服务器

```bash

# 创建项目和启动服务器
npm run build
pm2 start 'npm run start' --name frontServer

```

### 打开项目

项目路径为`localhost:`或计算机的ip地址加上前端项目服务器占用的端口号，
