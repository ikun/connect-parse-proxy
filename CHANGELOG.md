# Changelog

## 0.0.2

- 创建项目，支持get型url的反向代理

## 1.0.2

- 支持 location 参数的取值类型为 String 和 RegExp
- 支持 pass 参数的取值为 String 和 Function

## 1.0.3

- 添加 readme 及 changelog

## 1.0.4

- 当反向代理当接口500时，向req写入了error对象，导致bug。fixbug: Fatal error: First argument must be a string or Buffer