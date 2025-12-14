import { defineConfig } from 'astro/config';

// 按 Astro 部署文档要求，配置 GitHub Pages 必需的参数
export default defineConfig({
  // 填写你的 GitHub Pages 站点地址（如：https://<你的用户名>.github.io）
  site: 'https://sq422.github.io',
  // 若仓库名不是 <用户名>.github.io，需填写仓库名（如：/blog2）；否则注释掉这一行
  base: '/blog2',
});