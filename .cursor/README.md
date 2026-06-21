# Cursor 目录约定

本项目使用 Murphy Cloud 共用 Cursor 模板：

`/Users/murphy/work/projects/murphy-cloud/.cursor-template`

## 分类

- `rules/`：强制约束，保持短小。
- `skills/`：具体方法，按任务触发读取。
- `plans/`：阶段性计划，不作为当前规范。

## 当前结构

- `rules/`：从模板同步的共用规则。
- `skills/murphy-nextjs-ui-patterns`：共用 UI/表格/表单模式。
- `skills/murphy-nextjs-data-patterns`：共用 Drizzle、Server Actions、Hooks、权限、类型模式；Portal 仅在引入数据层时使用。
- `skills/murphy-deployment-ops`：共用 Podman、compose、备份恢复和部署排错。
- `skills/portal-product-patterns`：Portal 主站产品专属知识。

产品专属内容不要写进 `murphy-*` 通用 Skill；沉淀为多产品共用后再提升到 `.cursor-template`。
