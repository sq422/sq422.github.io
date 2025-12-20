---
title: 我是如何创建我的博客网站的
tags:
    - 博客网站创建
    - 基本配置
categories:
    - 开始一门技术
description: 讲解了我是如何从零开始搭建了我的博客网站
date: 2025-12-16T11:00:00+08:00
updated: 2025-12-16T11:00:00+08:00
# 文章的永久链接
abbrlink: abc100
---

1. ## 前言
    - 静态博客网站的部署有很多种方案，比如说` Hexo/Hugo + Git Pages `，我一开始选择的是` Hexo + Git Pages `，
参考的视频与文档来自于B站视频：[跳转连接](https://www.bilibili.com/video/BV1Eg41157tL/?share_source=copy_web&vd_source=8ef4211266617db49bb673c8ff174546)。
2. ## Hexo的使用
    - 通过视频前半部分的学习之后我掌握了Hexo的基本使用方法：
        - 简单来说就是先通过git从github仓库中拉取Hexo的基本环境
        - 然后再从Hexo主题网站中挑选你喜欢的主题放到放到你的博客文件夹themes目录
        - 再修改根目录下的_config.yml文件的theme对应的值为主题名称
        - 最后再通过hexo g + hexo s命令启动hexo服务即可将博客部署到本地。
3. ## 主题网站的灵活选取 
    - 当我在Hexo的[主题网站](https://hexo.io/themes/)挑选了一段时间之后我找到了一个满意的[主题](https://github.com/xingwangzhe/stalux.git)，但是当我详细观察github中的介绍时发现这是一个Vue项目而非我前面学习到的Hexo项目，幸运的是我以前接触过Vue项目，所以看起来也并非那么陌生。
4. ## Vue项目的本地部署
    - 其实Vue项目相较于Hexo项目的本地部署更为简单，将项目拉取到本地的一个文件夹之中，然后npm install下载依赖，然后npm run dev即可执行项目，然后就可以在本地访问了。
        - 注意：*如果是通过git clone方式拉取的话需要重新创建一个属于自己的.git文件，原因是我们后面需要将项目上传到自己的github中*
5. ## Vue + Git Pages的联合使用
    - 在将我们调试好的博客项目上传到自己的github仓库后（**仓库名称需要固定为<账户名>.github.io**），github就会自动在actions中运行部署你的项目，这样后面我们直接访问accountname.github.io就可以看到自己的博客了。
6. ## 在部署到github上后再次上传更新文件时可能会出现权限不足的问题
    - 问题描述：你的 Git 凭证（Windows 凭证管理器里存的那个 token）没有 “workflow” 权限，所以每次推送提交都会被 GitHub 拒绝。
    - 一种可行的解决方案：
        - *1. 生成一个带 workflow 权限的 PAT*
            - 前往https://github.com/settings/tokens
            - 点击 Generate new token → 选择 Generate new token (classic)
            - Note: 填 “push workflow”
            - Expiration: 选 No expiration 或 90 days
            - Select scopes
                - repo （勾选整个 repo，包含所有子选项）
                - workflow 
                - 建议再勾 delete_repo、write:packages
            - Generate token → 立刻复制（别关页面）
        - *2. 替换 Windows 旧凭证*
            - Windows 搜索 “凭据管理器”
            - 点 “Windows 凭证”
            - 找到 “git:https://github.com” 的条目
            - 点击展开 → 编辑 → 把密码改成新复制的 token，然后保存
        - *3. 回到终端，再次 push即可成功*