巢律：多囊健康助手 - PCOS健康管理应用

巢律是一款专为多囊卵巢综合征(PCOS)患者设计的健康管理小程序，提供个性化的饮食建议、运动方案和健康追踪工具。

🚀 功能特点
• 个性化饮食建议：根据用户年龄、身高、体重、BMI和健康目标生成定制食谱
• 科学运动方案：提供适合PCOS患者的运动计划和时长建议
• 健康数据追踪：记录月经周期、体重变化和症状表现
• BMI计算器：实时计算身体质量指数并给出健康评估
• AI智能建议：基于腾讯云AI技术生成专业健康建议
• 多囊知识库：提供PCOS相关健康知识和注意事项


🛠️ 技术栈
• 前端框架：微信小程序原生开发
• 后端服务：腾讯云开发(CloudBase)
• AI能力：腾讯云AI智能对话
• 数据存储：云数据库
• UI设计：清新简洁的粉色主题，专注女性健康

📁 项目结构
.
├── cloudfunctions/      # 云函数目录
├── miniprogram/          # 小程序前端代码
│   ├── pages/            # 页面组件
│   │   ├── index/        # 首页
│   │   ├── result/       # 结果页
│   │   ├── sport/        # 运动建议页
│   │   └── about/        # 关于页面
│   ├── components/       # 公共组件
│   ├── images/           # 图片资源
│   ├── app.js            # 小程序入口文件
│   ├── app.json          # 全局配置
│   └── app.wxss          # 全局样式
├── README.md             # 项目说明
└── LICENSE               # 开源协议


🚦 快速开始
前置条件
• 微信开发者工具
• 腾讯云账号
• Node.js (v14+)

安装步骤
1. 克隆仓库
   git clone https://github.com/your-username/pcos-health-assistant.git
   cd pcos-health-assistant
2. 安装依赖
   cd miniprogram
   npm install
3. 配置云开发
   • 在腾讯云控制台创建新环境
   • 将环境ID添加到 miniprogram/app.js
   wx.cloud.init({
     env: 'your-env-id', // 替换为你的环境ID
     traceUser: true,
   });   
4. 部署云函数
   • 在微信开发者工具中，右键点击 cloudfunctions 文件夹
   • 选择"上传并部署：云端安装依赖"
5. 运行项目
   • 打开微信开发者工具
   • 导入 miniprogram 文件夹
   • 点击"预览"或"真机调试"

让科技守护女性健康，让健康触手可及 🌸
