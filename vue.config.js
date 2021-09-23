module.exports = {
  outputDir: 'dist',
  publicPath: './',
  devServer: {
    proxy: {
      //ssq跨域配置本地反向代理 githubPage不支持
      '/ssq': {
        target: 'http://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice?name=ssq&issueCount=100&issueStart=&issueEnd=&dayStart=&dayEnd=',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '/ssq': '/'
        }
      }
    }
  }
};
