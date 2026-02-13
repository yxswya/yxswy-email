import type { EmailConfig } from './types.ts';

export function getConfig(): EmailConfig {
  const requiredEnvVars = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'EMAIL_FROM',
    'EMAIL_TO'
  ];

  // 验证必需的环境变量
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  const port = parseInt(process.env.SMTP_PORT!);
  if (isNaN(port)) {
    throw new Error(`SMTP_PORT must be a valid number, got: ${process.env.SMTP_PORT}`);
  }

  // 生成邮件主题
  const date = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return {
    smtp: {
      host: process.env.SMTP_HOST!,
      port: port,
      secure: port === 465, // 465 端口使用 SSL
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!
      }
    },
    mailOptions: {
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: `一言 · ${date}`
    }
  };
}
