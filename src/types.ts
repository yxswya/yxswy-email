// 一言 API 响应接口
export interface HitokotoResponse {
  id: number;
  uuid: string;
  hitokoto: string;      // 一言内容
  type: string;
  from: string;          // 出处
  from_who: string | null;  // 作者
  creator: string;
  creator_uid: number;
  reviewer: number;
  commit_from: string;
  created_at: string;
  length: number;
}

// 邮件配置接口
export interface EmailConfig {
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  mailOptions: {
    from: string;
    to: string;
    subject: string;
  };
}

// 邮件模板数据接口
export interface EmailTemplateData {
  hitokoto: string;
  from: string;
  fromWho?: string;
  date: string;
}
