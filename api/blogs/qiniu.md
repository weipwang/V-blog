---
title: 七牛云存储
descript: qshell上传静态文件部署
tags: [涨知识,七牛,静态博客]
date: 2020-3-14
thumbnail: http://res.iemit.cn/FizTos_454BM98dxDCRI71Ti10xj
---
#七牛云上传静态文件

标签（空格分隔）： 七牛

---

 1. 下载qshell
 2. 将qshell放到环境变量中
    > mv qshell /usr/local/bin

    3.设置权限

    > chmod 755 qshell

    4.登录七牛云,name随意取


> qshell account <ak> <sk> <name>

5. 在上传目录创建配置文件

> touch upload-config.txt`


```
{
   "src_dir"            :   "./",
   "access_key"         :   "这里填写AK",
   "secret_key"         :   "这里填写SK",
   "bucket"             :   "这里填写七牛存储空间名，刚才我新建的叫做myblog",
   "zone"               :   "nb",
   "ignore_dir"         :   false,
   "overwrite"          :   true,
   "check_exists"       :   false,
   "rescan_local"       :   true,
   "check_hash"         :   true
}
```

6.执行上传命令,上传完成
> qshell qupload upload-config.txt




