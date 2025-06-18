"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export interface TreeNode {
  id: string;
  label: string;
  value: string;
  children?: TreeNode[];
  disabled?: boolean;
}

interface TreeSelectProps {
  data: TreeNode[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  maxHeight?: number;
}

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  selectedValues: Set<string>;
  expandedNodes: Set<string>;
  onToggleExpand: (nodeId: string) => void;
  onSelect: (value: string) => void;
  multiple: boolean;
  searchTerm: string;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  level,
  selectedValues,
  expandedNodes,
  onToggleExpand,
  onSelect,
  multiple,
  searchTerm,
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedValues.has(node.value);

  // 搜索高亮匹配
  const isMatch =
    searchTerm === "" ||
    node.label.toLowerCase().includes(searchTerm.toLowerCase());

  // 递归检查子节点是否匹配搜索
  const hasMatchingChildren = React.useMemo(() => {
    if (!hasChildren || searchTerm === "") return false;

    const checkChildren = (nodes: TreeNode[]): boolean => {
      return nodes.some(
        child =>
          child.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (child.children && checkChildren(child.children))
      );
    };

    return checkChildren(node.children!);
  }, [hasChildren, node.children, searchTerm]);

  // 如果搜索时节点和子节点都不匹配，则隐藏
  if (searchTerm && !isMatch && !hasMatchingChildren) {
    return null;
  }

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggleExpand(node.id);
    }
  };

  const handleSelect = () => {
    if (!node.disabled) {
      onSelect(node.value);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm",
          isSelected && "bg-accent text-accent-foreground",
          node.disabled && "opacity-50 cursor-not-allowed",
          level > 0 && "ml-4"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleSelect}>
        <div
          className='flex items-center justify-center w-4 h-4'
          onClick={handleToggleExpand}>
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className='h-3 w-3' />
            ) : (
              <ChevronRight className='h-3 w-3' />
            )
          ) : (
            <div className='w-3 h-3' />
          )}
        </div>

        {multiple && (
          <div
            className={cn(
              "flex items-center justify-center w-4 h-4 border rounded-sm",
              isSelected && "bg-primary border-primary text-primary-foreground"
            )}>
            {isSelected && <Check className='h-3 w-3' />}
          </div>
        )}

        <span className='flex-1 truncate'>{node.label}</span>

        {!multiple && isSelected && <Check className='h-4 w-4 text-primary' />}
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.children!.map(child => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              selectedValues={selectedValues}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
              multiple={multiple}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeSelect: React.FC<TreeSelectProps> = ({
  data,
  value,
  onValueChange,
  placeholder = "请选择...",
  multiple = false,
  searchable = true,
  disabled = false,
  className,
  maxHeight = 300,
}) => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [expandedNodes, setExpandedNodes] = React.useState<Set<string>>(
    new Set()
  );

  // 处理选中值
  const selectedValues = React.useMemo(() => {
    if (multiple) {
      return new Set(Array.isArray(value) ? value : []);
    } else {
      return new Set(value ? [value as string] : []);
    }
  }, [value, multiple]);

  // 获取选中项的标签
  const getSelectedLabels = React.useCallback(() => {
    const labels: string[] = [];

    const findLabels = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        if (selectedValues.has(node.value)) {
          labels.push(node.label);
        }
        if (node.children) {
          findLabels(node.children);
        }
      });
    };

    findLabels(data);
    return labels;
  }, [data, selectedValues]);

  const selectedLabels = getSelectedLabels();

  // 展开/折叠节点
  const handleToggleExpand = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // 选择处理
  const handleSelect = (nodeValue: string) => {
    if (multiple) {
      const newValues = new Set(selectedValues);
      if (newValues.has(nodeValue)) {
        newValues.delete(nodeValue);
      } else {
        newValues.add(nodeValue);
      }
      onValueChange?.(Array.from(newValues));
    } else {
      onValueChange?.(nodeValue);
      setOpen(false);
    }
  };

  // 清除选择
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.(multiple ? [] : "");
  };

  // 移除单个选中项（多选模式）
  const handleRemoveItem = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple) {
      const newValues = Array.isArray(value)
        ? value.filter(v => v !== valueToRemove)
        : [];
      onValueChange?.(newValues);
    }
  };

  // 搜索时自动展开匹配的节点
  React.useEffect(() => {
    if (searchTerm) {
      const newExpanded = new Set<string>();

      const expandMatchingNodes = (nodes: TreeNode[], parentId?: string) => {
        nodes.forEach(node => {
          const isMatch = node.label
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          if (node.children) {
            const hasMatchingChild = expandMatchingNodes(
              node.children,
              node.id
            );
            if (isMatch || hasMatchingChild) {
              newExpanded.add(node.id);
              if (parentId) newExpanded.add(parentId);
            }
          } else if (isMatch && parentId) {
            newExpanded.add(parentId);
          }

          return (
            isMatch ||
            (node.children &&
              node.children.some(child =>
                child.label.toLowerCase().includes(searchTerm.toLowerCase())
              ))
          );
        });

        return nodes.some(
          node =>
            node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (node.children &&
              node.children.some(child =>
                child.label.toLowerCase().includes(searchTerm.toLowerCase())
              ))
        );
      };

      expandMatchingNodes(data);
      setExpandedNodes(newExpanded);
    }
  }, [searchTerm, data]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn("justify-between", className)}
          disabled={disabled}>
          <div className='flex items-center gap-1 flex-1 min-w-0'>
            {selectedLabels.length === 0 ? (
              <span className='text-muted-foreground'>{placeholder}</span>
            ) : multiple ? (
              <div className='flex items-center gap-1 flex-wrap'>
                {selectedLabels.slice(0, 2).map((label, index) => {
                  const valueForLabel = Array.isArray(value)
                    ? value[selectedLabels.indexOf(label)]
                    : "";
                  return (
                    <Badge
                      key={index}
                      variant='secondary'
                      className='text-xs px-1.5 py-0.5'>
                      {label}
                      <X
                        className='ml-1 h-3 w-3 cursor-pointer hover:text-destructive'
                        onClick={e => handleRemoveItem(valueForLabel, e)}
                      />
                    </Badge>
                  );
                })}
                {selectedLabels.length > 2 && (
                  <Badge variant='secondary' className='text-xs px-1.5 py-0.5'>
                    +{selectedLabels.length - 2}
                  </Badge>
                )}
              </div>
            ) : (
              <span className='truncate'>{selectedLabels[0]}</span>
            )}
          </div>

          <div className='flex items-center gap-1'>
            {selectedLabels.length > 0 && (
              <X
                className='h-4 w-4 opacity-50 hover:opacity-100 cursor-pointer'
                onClick={handleClear}
              />
            )}
            <ChevronDown className='h-4 w-4 opacity-50' />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-full p-0' align='start'>
        <div className='flex flex-col'>
          {searchable && (
            <div className='flex items-center border-b px-3 py-2'>
              <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
              <Input
                placeholder='搜索...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0'
              />
            </div>
          )}

          <ScrollArea className='flex-1' style={{ maxHeight }}>
            <div className='p-1'>
              {data.map(node => (
                <TreeNodeComponent
                  key={node.id}
                  node={node}
                  level={0}
                  selectedValues={selectedValues}
                  expandedNodes={expandedNodes}
                  onToggleExpand={handleToggleExpand}
                  onSelect={handleSelect}
                  multiple={multiple}
                  searchTerm={searchTerm}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};
