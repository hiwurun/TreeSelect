"use client";

import * as React from "react";
import { TreeSelect, type TreeNode } from "./components/tree-select";

// 示例数据
const treeData: TreeNode[] = [
  {
    id: "1",
    label: "前端开发",
    value: "frontend",
    children: [
      {
        id: "1-1",
        label: "React",
        value: "react",
        children: [
          { id: "1-1-1", label: "React Hooks", value: "react-hooks" },
          { id: "1-1-2", label: "React Router", value: "react-router" },
          { id: "1-1-3", label: "Redux", value: "redux" },
        ],
      },
      {
        id: "1-2",
        label: "Vue",
        value: "vue",
        children: [
          { id: "1-2-1", label: "Vue 3", value: "vue3" },
          { id: "1-2-2", label: "Vuex", value: "vuex" },
          { id: "1-2-3", label: "Vue Router", value: "vue-router" },
        ],
      },
      {
        id: "1-3",
        label: "Angular",
        value: "angular",
        disabled: true,
      },
    ],
  },
  {
    id: "2",
    label: "后端开发",
    value: "backend",
    children: [
      {
        id: "2-1",
        label: "Node.js",
        value: "nodejs",
        children: [
          { id: "2-1-1", label: "Express", value: "express" },
          { id: "2-1-2", label: "Koa", value: "koa" },
          { id: "2-1-3", label: "NestJS", value: "nestjs" },
        ],
      },
      {
        id: "2-2",
        label: "Python",
        value: "python",
        children: [
          { id: "2-2-1", label: "Django", value: "django" },
          { id: "2-2-2", label: "Flask", value: "flask" },
          { id: "2-2-3", label: "FastAPI", value: "fastapi" },
        ],
      },
      {
        id: "2-3",
        label: "Java",
        value: "java",
        children: [
          { id: "2-3-1", label: "Spring Boot", value: "spring-boot" },
          { id: "2-3-2", label: "Spring Cloud", value: "spring-cloud" },
        ],
      },
    ],
  },
  {
    id: "3",
    label: "数据库",
    value: "database",
    children: [
      { id: "3-1", label: "MySQL", value: "mysql" },
      { id: "3-2", label: "PostgreSQL", value: "postgresql" },
      { id: "3-3", label: "MongoDB", value: "mongodb" },
      { id: "3-4", label: "Redis", value: "redis" },
    ],
  },
  {
    id: "4",
    label: "DevOps",
    value: "devops",
    children: [
      { id: "4-1", label: "Docker", value: "docker" },
      { id: "4-2", label: "Kubernetes", value: "kubernetes" },
      { id: "4-3", label: "CI/CD", value: "cicd" },
    ],
  },
];

export default function TreeSelectDemo() {
  const [singleValue, setSingleValue] = React.useState<string>("");
  const [multipleValue, setMultipleValue] = React.useState<string[]>([]);

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold'>TreeSelect 组件示例</h1>
        <p className='text-muted-foreground'>
          基于 shadcn/ui 构建的树形选择器组件，支持单选、多选、搜索等功能。
        </p>
      </div>

      <div className='grid gap-8 md:grid-cols-2'>
        {/* 单选示例 */}
        <div className='space-y-4'>
          <div>
            <h2 className='text-xl font-semibold mb-2'>单选模式</h2>
            <p className='text-sm text-muted-foreground mb-4'>选择一个技术栈</p>
            <TreeSelect
              data={treeData}
              value={singleValue}
              onValueChange={value => setSingleValue(value as string)}
              placeholder='请选择技术栈'
              className='w-full'
            />
            <div className='mt-2 p-3 bg-muted rounded-md'>
              <p className='text-sm'>
                <strong>选中值:</strong> {singleValue || "未选择"}
              </p>
            </div>
          </div>
        </div>

        {/* 多选示例 */}
        <div className='space-y-4'>
          <div>
            <h2 className='text-xl font-semibold mb-2'>多选模式</h2>
            <p className='text-sm text-muted-foreground mb-4'>选择多个技术栈</p>
            <TreeSelect
              data={treeData}
              value={multipleValue}
              onValueChange={value => setMultipleValue(value as string[])}
              placeholder='请选择技术栈'
              multiple
              className='w-full'
            />
            <div className='mt-2 p-3 bg-muted rounded-md'>
              <p className='text-sm'>
                <strong>选中值:</strong>{" "}
                {multipleValue.length > 0 ? multipleValue.join(", ") : "未选择"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 功能特性 */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>功能特性</h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <div className='p-4 border rounded-lg'>
            <h3 className='font-medium mb-2'>🔍 搜索过滤</h3>
            <p className='text-sm text-muted-foreground'>
              支持实时搜索，自动展开匹配的节点
            </p>
          </div>
          <div className='p-4 border rounded-lg'>
            <h3 className='font-medium mb-2'>📁 树形结构</h3>
            <p className='text-sm text-muted-foreground'>
              支持无限层级的树形数据展示
            </p>
          </div>
          <div className='p-4 border rounded-lg'>
            <h3 className='font-medium mb-2'>✅ 单选/多选</h3>
            <p className='text-sm text-muted-foreground'>
              灵活的选择模式，支持单选和多选
            </p>
          </div>
          <div className='p-4 border rounded-lg'>
            <h3 className='font-medium mb-2'>🚫 禁用状态</h3>
            <p className='text-sm text-muted-foreground'>
              支持禁用特定节点或整个组件
            </p>
          </div>
          <div className='p-4 border rounded-lg'>
            <h3 className='font-medium mb-2'>🎨 主题适配</h3>
            <p className='text-sm text-muted-foreground'>
              完全兼容 shadcn/ui 主题系统
            </p>
          </div>
          <div className='p-4 border rounded-lg'>
            <h3 className='font-medium mb-2'>♿ 无障碍</h3>
            <p className='text-sm text-muted-foreground'>
              支持键盘导航和屏幕阅读器
            </p>
          </div>
        </div>
      </div>

      {/* 使用示例 */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>使用示例</h2>
        <div className='p-4 bg-muted rounded-lg'>
          <pre className='text-sm overflow-x-auto'>
            <code>{`import { TreeSelect } from "./components/tree-select"

// 单选
<TreeSelect
  data={treeData}
  value={value}
  onValueChange={setValue}
  placeholder="请选择..."
/>

// 多选
<TreeSelect
  data={treeData}
  value={values}
  onValueChange={setValues}
  multiple
  placeholder="请选择..."
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
