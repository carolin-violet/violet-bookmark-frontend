# 项目说明

- violet-bookmark 是一个站点收藏网站，可查看一些公共的导航，也可以自己添加私人的书签收藏
- 演示环境：[http://bookmark.carolin-violet.cn:8000/](http://bookmark.carolin-violet.cn:8000/)
- 账户 user 12345678

# 运行环境

node >= 18.20.5

# 项目启动

- 先运行 git clone https://github.com/carolin-violet/violet-bookmark-frontend.git 命令拉取前端代码
- 进入项目根目录运行 pnpm install 命令安装依赖
- 运行 npm run dev 命令启动

# 待办事项

- [ ] 添加权限控制
- [ ] 导航目前只支持手动添加功能，需要添加根据网站地址自动解析功能
- [ ] 导航站点图标目前是用谷歌 api 解析的，最好能自动解析并保存起来
- [ ] token 一直没过期
- [ ] 添加导航链接点击统计
- [ ] 添加前端埋点 (一些点击次数,导航点击次数)
- [ ] 添加图表分析统计（拥有分类数目包含大分类小分类，各自分类拥有导航站点数，总共收纳分类数和导航站点数目，点击打开数量排行）
- [ ] 词云图
- [ ] 美化页面,添加拖拽支持
