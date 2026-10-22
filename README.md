# 王腾扬 · Project Lab

用于实习投递的静态作品集，展示四个项目的背景、技术方案、实验记录、原系统图片及可交互的算法原理。

在线访问：[Project Lab](https://vviolass-project-lab.y2138525048.chatgpt.site)。

此公开仓库仅保存展示端；Future Forcing 与无人艇原始源码不上传，RISC 和医学影像继续使用原有私有仓库。

## 本地预览

如果目录中有 `dist/`，运行 `python -m http.server 4173 --directory dist`；如果使用 GitHub 展示仓库（网页文件在根目录），运行 `python -m http.server 4173`。访问 `http://localhost:4173/`。

## 展示范围

- Future Forcing：原始实验表与独立的缓存保留原理示意。
- 医学影像：核型分析、胸片报告两条流程的交互导览；不包含患者数据或推理服务。
- 无人艇：单障碍、60 扇区的简化 VFH 原理演示；不连接原 ROS 仿真。
- RISC：编译流水线解释性示例与原仓库入口。

网站没有 GPU 后端。手工演示和真实结果均在页面中明确区分。已有模型、参考代码和个人工作边界依据当前项目文档记录，不新增获奖或性能声明。

## 材料来源与展示边界

- Future Forcing 的实验指标参考 full-cache 输出。缓存方块使用示例重要度解释保留与淘汰机制。
- 医学影像展示模型设计、实验结果和业务流程，不接入患者数据。
- 无人艇介绍来自本地导航代码和项目文档；浏览器只展示单障碍角区膨胀与安全扇区选择。
- RISC 编译流水线依据原仓库入口；手写 IR 和汇编只用于解释编译阶段。
- 四个项目合计 42 张展示页面，其中编译器 22 张，完整包含中端、后端优化及设计总结。支持前后翻页、页码选择、左右方向键、手机滑动、自动播放与大图查看。

## 原项目仓库

- [RISC](https://github.com/vviolass/RISC)（私有，需要仓库访问权限）。
- [医学影像智能分析](https://github.com/vviolass/tiaozhanbei2026)（私有，需要仓库访问权限）。
- Future Forcing、无人艇源码不在此仓库分发。

## 验证

展示端为无依赖的 HTML/CSS/JavaScript。使用 `node --check app.js`（本地目录版本为 `node --check dist/app.js`）检查语法，通过浏览器核对交互。没有在公开站点运行 GPU 推理、ROS、Java 编译器或重新评测模型。
