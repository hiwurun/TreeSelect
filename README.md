# TreeSelect 组件

基于 shadcn/ui 构建的 React 树形选择器组件，提供丰富的交互功能和优雅的用户体验。

## ✨ 功能特性

- 🌲 **树形结构** - 支持无限层级的树形数据展示
- 🔍 **实时搜索** - 支持搜索过滤，自动展开匹配节点
- ✅ **灵活选择** - 支持单选和多选模式
- 📁 **展开折叠** - 可展开/折叠树节点，记住展开状态
- 🚫 **禁用控制** - 支持禁用特定节点或整个组件
- 🏷️ **标签显示** - 多选模式下以标签形式展示选中项
- 🎨 **主题适配** - 完全兼容 shadcn/ui 主题系统
- ♿ **无障碍** - 支持键盘导航和屏幕阅读器
- 📱 **响应式** - 适配移动端和桌面端
- 🔧 **TypeScript** - 完整的 TypeScript 类型支持

## 📦 安装

确保你的项目已经安装了 shadcn/ui 的基础组件：

```bash
# 安装必需的 shadcn/ui 组件
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add popover
npx shadcn@latest add scroll-area
npx shadcn@latest add badge
```

然后将 TreeSelect 组件文件复制到你的项目中：

```
src/
  components/
    tree-select.tsx
```

## 🚀 快速开始

### 基础用法

```tsx
import { TreeSelect, type TreeNode } from "@/components/tree-select"
import { useState } from "react"

const treeData: TreeNode[] = [
  {
    id: "1",
    label: "前端开发",
    value: "frontend",
    children: [
      { id: "1-1", label: "React", value: "react" },
      { id: "1-2", label: "Vue", value: "vue" },
      { id: "1-3", label: "Angular", value: "angular" },
    ],
  },
  {
    id: "2",
    label: "后端开发",
    value: "backend",
    children: [
      { id: "2-1", label: "Node.js", value: "nodejs" },
      { id: "2-2", label: "Python", value: "python" },
      { id: "2-3", label: "Java", value: "java" },
    ],
  },
]

function App() {
  const [value, setValue] = useState<string>("")

  return (
    <TreeSelect
      data={treeData}
      value={value}
      onValueChange={setValue}
      placeholder="请选择技术栈"
    />
  )
}
```

### 多选模式

```tsx
function MultiSelectExample() {
  const [values, setValues] = useState<string[]>([])

  return (
    <TreeSelect
      data={treeData}
      value={values}
      onValueChange={setValues}
      multiple
      placeholder="请选择多个技术栈"
    />
  )
}
```

## 📚 API 文档

### TreeSelect Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `data` | `TreeNode[]` | `[]` | 树形数据源 |
| `value` | `string \| string[]` | `undefined` | 选中的值 |
| `onValueChange` | `(value: string \| string[]) => void` | `undefined` | 值变化时的回调函数 |
| `placeholder` | `string` | `"请选择..."` | 占位符文本 |
| `multiple` | `boolean` | `false` | 是否支持多选 |
| `searchable` | `boolean` | `true` | 是否支持搜索 |
| `disabled` | `boolean` | `false` | 是否禁用组件 |
| `className` | `string` | `undefined` | 自定义 CSS 类名 |
| `maxHeight` | `number` | `300` | 下拉框最大高度（px） |

### TreeNode 数据结构

```typescript
interface TreeNode {
  id: string                 // 节点唯一标识符
  label: string             // 节点显示文本
  value: string             // 节点值（用于选择）
  children?: TreeNode[]     // 子节点数组
  disabled?: boolean        // 是否禁用此节点
}
```

## 🎯 使用示例

### 1. 部门组织架构选择

```tsx
const departmentData: TreeNode[] = [
  {
    id: "company",
    label: "公司总部",
    value: "headquarters",
    children: [
      {
        id: "tech",
        label: "技术部",
        value: "technology",
        children: [
          { id: "frontend", label: "前端组", value: "frontend-team" },
          { id: "backend", label: "后端组", value: "backend-team" },
          { id: "mobile", label: "移动端组", value: "mobile-team" },
        ],
      },
      {
        id: "product",
        label: "产品部",
        value: "product",
        children: [
          { id: "pm", label: "产品经理", value: "product-manager" },
          { id: "ui", label: "UI设计师", value: "ui-designer" },
        ],
      },
    ],
  },
]

<TreeSelect
  data={departmentData}
  value={selectedDepartment}
  onValueChange={setSelectedDepartment}
  placeholder="选择部门"
/>
```

### 2. 地区选择器

```tsx
const regionData: TreeNode[] = [
  {
    id: "china",
    label: "中国",
    value: "CN",
    children: [
      {
        id: "beijing",
        label: "北京市",
        value: "BJ",
        children: [
          { id: "chaoyang", label: "朝阳区", value: "BJ-CY" },
          { id: "haidian", label: "海淀区", value: "BJ-HD" },
        ],
      },
      {
        id: "shanghai",
        label: "上海市",
        value: "SH",
        children: [
          { id: "huangpu", label: "黄浦区", value: "SH-HP" },
          { id: "pudong", label: "浦东新区", value: "SH-PD" },
        ],
      },
    ],
  },
]
```

### 3. 权限管理

```tsx
const permissionData: TreeNode[] = [
  {
    id: "user-mgmt",
    label: "用户管理",
    value: "user-management",
    children: [
      { id: "user-create", label: "创建用户", value: "user:create" },
      { id: "user-edit", label: "编辑用户", value: "user:edit" },
      { id: "user-delete", label: "删除用户", value: "user:delete", disabled: true },
    ],
  },
  {
    id: "content-mgmt",
    label: "内容管理",
    value: "content-management",
    children: [
      { id: "post-create", label: "发布文章", value: "post:create" },
      { id: "post-edit", label: "编辑文章", value: "post:edit" },
    ],
  },
]

<TreeSelect
  data={permissionData}
  value={selectedPermissions}
  onValueChange={setSelectedPermissions}
  multiple
  placeholder="选择权限"
/>
```

## 🎨 自定义样式

### 使用 CSS 变量

TreeSelect 组件使用 shadcn/ui 的设计令牌，你可以通过 CSS 变量来自定义样式：

```css
.tree-select-custom {
  --radius: 0.5rem;
}

.tree-select-custom .tree-node {
  --node-padding: 0.75rem;
  --node-hover-bg: hsl(var(--accent));
}
```

### 自定义主题

```tsx
<TreeSelect
  data={treeData}
  value={value}
  onValueChange={setValue}
  className="w-full max-w-md"
  maxHeight={400}
/>
```

## 🔧 高级用法

### 受控组件

```tsx
function ControlledTreeSelect() {
  const [value, setValue] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleValueChange = (newValue: string | string[]) => {
    setValue(newValue as string[])
    // 执行其他逻辑，如数据验证、API 调用等
    console.log("Selected values:", newValue)
  }

  return (
    <div>
      <TreeSelect
        data={treeData}
        value={value}
        onValueChange={handleValueChange}
        multiple
        searchable
      />
      
      <div className="mt-4">
        <p>已选择: {value.join(", ")}</p>
      </div>
    </div>
  )
}
```

### 动态数据加载

```tsx
function DynamicTreeSelect() {
  const [treeData, setTreeData] = useState<TreeNode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟 API 调用
    fetchTreeData().then((data) => {
      setTreeData(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <TreeSelect
      data={treeData}
      value={value}
      onValueChange={setValue}
      placeholder="请选择..."
    />
  )
}
```

## 🐛 常见问题

### Q: 如何设置默认展开的节点？

A: 目前组件会在搜索时自动展开匹配的节点。如需设置默认展开，可以修改组件内部的 `expandedNodes` 初始状态。

### Q: 如何自定义节点的渲染内容？

A: 可以通过修改 `TreeNodeComponent` 组件来自定义节点渲染，例如添加图标、状态指示器等。

### Q: 支持异步加载子节点吗？

A: 当前版本不直接支持异步加载。你可以在父组件中处理异步逻辑，然后更新 `data` 属性。

### Q: 如何限制选择的数量？

A: 可以在 `onValueChange` 回调中添加数量限制逻辑：

```tsx
const handleValueChange = (newValue: string | string[]) => {
  if (Array.isArray(newValue) && newValue.length <= 5) {
    setValue(newValue)
  }
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个组件！

### 开发环境设置

1. 克隆仓库
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run dev`

### 提交规范

- 使用语义化的提交信息
- 确保代码通过 ESLint 检查
- 添加必要的测试用例

## 📄 许可证

MIT License

## 🙏 致谢

- [shadcn/ui](https://ui.shadcn.com/) - 提供了优秀的基础组件
- [Radix UI](https://www.radix-ui.com/) - 提供了无障碍的原始组件
- [Lucide React](https://lucide.dev/) - 提供了美观的图标

---

如果这个组件对你有帮助，请给个 ⭐️ 支持一下！
```

我为 TreeSelect 组件创建了一个详细的 README 文档，包含了：

## 📋 文档内容

1. **项目介绍** - 简洁明了的组件描述
2. **功能特性** - 用图标和简短描述展示主要功能
3. **安装指南** - 详细的安装步骤和依赖说明
4. **快速开始** - 基础用法和多选示例
5. **API 文档** - 完整的属性说明和类型定义
6. **使用示例** - 多个实际场景的代码示例
7. **自定义样式** - 样式定制方法
8. **高级用法** - 受控组件和动态数据加载
9. **常见问题** - FAQ 解答常见使用问题
10. **贡献指南** - 开发和贡献说明

## 🎯 文档特点

- **结构清晰** - 使用标题层级和表格组织内容
- **代码示例丰富** - 提供多种使用场景的完整代码
- **类型安全** - 详细的 TypeScript 类型说明
- **实用性强** - 包含实际项目中的使用案例
- **易于维护** - 模块化的文档结构便于更新

这个 README 文档可以帮助开发者快速理解和使用 TreeSelect 组件，同时也为项目的维护和协作提供了良好的基础。