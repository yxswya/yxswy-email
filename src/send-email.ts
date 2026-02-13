import nodemailer from 'nodemailer';
import { getConfig } from './config.ts';
import { generateEmailTemplate } from './email-template.ts';
import type { HitokotoResponse } from './types.ts';

// 日志工具函数
function log(level: 'info' | 'error' | 'success', message: string, data?: any) {
  const timestamp = new Date().toISOString();
  const emoji = {
    info: 'ℹ️',
    error: '❌',
    success: '✅'
  };

  console.log(`[${timestamp}] ${emoji[level]} ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}

// 获取一言数据
async function fetchHitokoto(): Promise<HitokotoResponse> {
  log('info', 'Fetching hitokoto from API...');

  const response = await fetch('https://v1.hitokoto.cn/');

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as HitokotoResponse;
  log('success', 'Hitokoto fetched successfully', {
    id: data.id,
    hitokoto: data.hitokoto,
    from: data.from
  });

  return data;
}

// 发送邮件
async function sendEmail() {
  try {
    log('info', 'Starting email sending process...');

    // 获取配置
    const config = getConfig();
    log('info', 'Configuration loaded', {
      smtp: { host: config.smtp.host, port: config.smtp.port },
      from: config.mailOptions.from,
      to: config.mailOptions.to
    });

    // 获取一言数据
    const hitokotoData = await fetchHitokoto();

    // 生成邮件内容
    const htmlContent = generateEmailTemplate({
      hitokoto: hitokotoData.hitokoto,
      from: hitokotoData.from,
      fromWho: hitokotoData.from_who || undefined,
      date: new Date().toISOString()
    });

    // 创建邮件传输器
    const transporter = nodemailer.createTransport(config.smtp);

    // 发送邮件
    log('info', 'Sending email...');
    const info = await transporter.sendMail({
      ...config.mailOptions,
      html: htmlContent
    });

    log('success', 'Email sent successfully', {
      messageId: info.messageId,
      response: info.response
    });

  } catch (error) {
    log('error', 'Failed to send email', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

// 主函数
async function main() {
  try {
    await sendEmail();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

// 运行
main();
