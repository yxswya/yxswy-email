import type { EmailTemplateData } from './types.ts';

export function generateEmailTemplate(data: EmailTemplateData): string {
  const date = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>一言 - ${date}</title>
</head>
<body style="
  margin: 0;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #FFFFFF;
  color: #000000;
">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
    <!-- 主容器 -->
    <tr>
      <td style="
        background-color: #FFFFFF;
        border: 4px solid #000000;
        box-shadow: 8px 8px 0px #000000;
        padding: 0;
      ">
        <!-- 顶部标题栏 -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="
              background-color: #FF6B6B;
              border-bottom: 4px solid #000000;
              padding: 24px;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                font-size: 32px;
                font-weight: 800;
                color: #000000;
                letter-spacing: 2px;
                text-transform: uppercase;
              ">一言</h1>
            </td>
          </tr>
        </table>

        <!-- 日期栏 -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="
              background-color: #4ECDC4;
              border-bottom: 4px solid #000000;
              padding: 16px 24px;
              text-align: center;
            ">
              <p style="
                margin: 0;
                font-size: 16px;
                font-weight: 700;
                color: #000000;
              ">${date}</p>
            </td>
          </tr>
        </table>

        <!-- 主要内容区 -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="
              padding: 40px 24px;
              background-color: #FFFFFF;
            ">
              <!-- 一言内容框 -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    border: 3px solid #000000;
                    padding: 32px;
                    background-color: #FFE66D;
                    box-shadow: 6px 6px 0px #000000;
                  ">
                    <blockquote style="
                      margin: 0;
                      font-size: 24px;
                      font-weight: 600;
                      line-height: 1.6;
                      color: #000000;
                      text-align: center;
                      font-style: normal;
                    ">${data.hitokoto}</blockquote>
                  </td>
                </tr>
              </table>

              <!-- 出处信息 -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px;">
                <tr>
                  <td style="
                    border: 3px solid #000000;
                    padding: 20px;
                    background-color: #FFFFFF;
                    text-align: center;
                  ">
                    ${data.fromWho ? `
                      <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #000000;">
                        ${data.fromWho}
                      </p>
                    ` : ''}
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #333333;">
                      出自：${data.from}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- 底部装饰 -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="
              background-color: #4ECDC4;
              border-top: 4px solid #000000;
              padding: 20px;
              text-align: center;
            ">
              <p style="
                margin: 0;
                font-size: 12px;
                font-weight: 600;
                color: #000000;
              ">
                每日一言 · 照亮生活
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- 页脚 -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px;">
    <tr>
      <td style="text-align: center; padding: 0;">
        <p style="
          margin: 0;
          font-size: 12px;
          color: #666666;
          font-weight: 500;
        ">
          Powered by <a href="https://v1.hitokoto.cn/" style="color: #000000; font-weight: 700; text-decoration: underline;">一言 API</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
