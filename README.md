# 一言每日邮件定时发送

基于一言 API 的每日定时邮件发送系统，使用 Neubrutalism 风格设计。

## 功能特点

- ⏰ 每天定时发送一言精选（默认北京时间 20:40）
- 🎨 Neubrutalism 风格 HTML 邮件（高对比度、粗边框、硬阴影）
- 🚀 使用 GitHub Actions 自动化运行
- ⚡ Bun 运行时，轻量高效
- 🔒 安全的环境变量配置

## 快速开始

### GitHub Secrets 配置

在 GitHub 仓库的 **Settings > Secrets and variables > Actions** 中添加以下 Secrets：

| Secret 名称 | 说明 | 示例值 |
|------------|------|--------|
| `SMTP_HOST` | SMTP 服务器地址 | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP 端口 | `465` |
| `SMTP_USER` | SMTP 用户名（邮箱地址） | `your-email@gmail.com` |
| `SMTP_PASS` | SMTP 密码或授权码 | `your-app-password` |
| `EMAIL_FROM` | 发件人地址 | `your-email@gmail.com` |
| `EMAIL_TO` | 收件人地址 | `recipient@example.com` |

### 常见 SMTP 配置

#### Gmail
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # 需要生成应用专用密码
```
**注意**：Gmail 需要启用两步验证并生成应用专用密码，不能使用账户密码。

#### QQ 邮箱
```
SMTP_HOST=smtp.qq.com
SMTP_PORT=465
SMTP_USER=your-email@qq.com
SMTP_PASS=your-authorization-code  # 需要使用授权码
```

#### 163 邮箱
```
SMTP_HOST=smtp.163.com
SMTP_PORT=465
SMTP_USER=your-email@163.com
SMTP_PASS=your-authorization-code  # 需要使用授权码
```

#### Outlook
```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

## 本地开发

### 前置要求

- 安装 [Bun](https://bun.sh/) 运行时

### 安装依赖

```bash
bun install
```

### 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，填入真实配置
```

### 运行测试

```bash
bun run src/send-email.ts
```

或使用开发模式（自动重载）：

```bash
bun run dev
```

## 部署到 GitHub

1. **推送代码到 GitHub**

```bash
git add .
git commit -m "Add daily email sender"
git push
```

2. **配置 GitHub Secrets**

在仓库设置中添加所有必需的 Secrets（见上方配置表）。

3. **验证 Actions 运行**

- 进入仓库的 **Actions** 标签页
- 手动触发 `Daily Email Sender` workflow（使用 `workflow_dispatch`）
- 检查 Actions 日志确认执行成功
- 验证邮件是否成功接收

4. **定时发送**

Actions 将每天北京时间 20:40 自动发送邮件。

## 定时任务说明

### Cron 表达式

```yaml
cron: '40 12 * * *'
```

- `40` - 第 40 分钟
- `12` - UTC 12 点（北京时间 20:40）
- `*` - 每天
- `*` - 每月
- `*` - 每周

### 时区说明

GitHub Actions 使用 UTC 时区，需要进行时区转换：

| 北京时间 | UTC 时间 | Cron 表达式 |
|---------|---------|------------|
| 08:00 | 00:00 | `0 0 * * *` |
| 12:00 | 04:00 | `0 4 * * *` |
| **20:40** | **12:40** | **`40 12 * * *`** |
| 22:00 | 14:00 | `0 14 * * *` |

## 邮件设计

### Neubrutalism 风格特征

- **粗边框**：3-4px 纯黑实线边框
- **硬阴影**：6-8px 无模糊的硬阴影（`box-shadow: 8px 8px 0px #000000`）
- **高对比度**：纯黑（#000000）和纯白（#FFFFFF）
- **大胆色彩**：珊瑚红（#FF6B6B）、青绿（#4ECDC4）、明黄（#FFE66D）
- **无圆角**：所有元素保持 90 度直角
- **无衬线字体**：使用系统默认无衬线字体

### 布局结构

1. **顶部标题栏**（珊瑚红背景）- "一言"
2. **日期栏**（青绿背景）- 当前日期
3. **主内容区**（白色背景）
   - 一言内容框（明黄背景，黑边框，硬阴影）
   - 出处信息框（白底黑框）
4. **底部装饰**（青绿背景）

## 项目结构

```
yxswy-email/
├── .github/
│   └── workflows/
│       └── daily-email.yml          # GitHub Actions 定时任务配置
├── src/
│   ├── send-email.ts                # 主发送脚本
│   ├── email-template.ts            # Neubrutalism HTML 模板生成器
│   ├── config.ts                    # 配置管理（环境变量）
│   └── types.ts                     # TypeScript 类型定义
├── .env.example                     # 环境变量配置示例
├── package.json                     # 项目依赖配置
├── tsconfig.json                    # TypeScript 配置
└── README.md                        # 项目说明文档
```

## 技术栈

- **运行时**: [Bun](https://bun.sh/) - 快速的 JavaScript 运行时
- **语言**: TypeScript
- **邮件库**: [Nodemailer](https://nodemailer.com/) - Node.js 邮件发送库
- **自动化**: GitHub Actions
- **API**: [一言](https://v1.hitokoto.cn/) - 一言 API

## 常见问题

### 1. 邮件发送失败

**问题**：Actions 日志显示认证失败

**解决方案**：
- 检查 SMTP_HOST、SMTP_PORT 是否正确
- 确认 SMTP_PASS 是正确的密码/授权码
- Gmail/Outlook 需要使用应用专用密码，非账户密码

### 2. 邮件样式异常

**问题**：收到邮件后样式显示不正确

**解决方案**：
- 某些邮件客户端对 CSS 支持有限
- 使用内联 CSS 确保兼容性
- 在不同邮件客户端测试显示效果

### 3. 定时任务未触发

**问题**：到了时间但没有收到邮件

**解决方案**：
- 检查 Actions 标签页，确认 workflow 是否运行
- 确认 GitHub Secrets 配置正确
- 尝试手动触发 `workflow_dispatch` 测试
- 检查 cron 表达式是否正确

### 4. 如何修改发送时间

编辑 [`.github/workflows/daily-email.yml`](.github/workflows/daily-email.yml) 中的 cron 表达式，记得进行时区转换。

## 许可证

MIT

## 相关链接

- [一言 API](https://v1.hitokoto.cn/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Bun 文档](https://bun.sh/docs)
- [Nodemailer 文档](https://nodemailer.com/)
