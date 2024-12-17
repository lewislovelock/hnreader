// 从 clsx 库导入类型 ClassValue 和函数 clsx
// clsx 是一个用于构建类名字符串的工具
import { type ClassValue, clsx } from "clsx"

// 导入 tailwind-merge 库的 twMerge 函数
// twMerge 用于解决 Tailwind CSS 类名冲突
import { twMerge } from "tailwind-merge"

// 导出一个名为 cn 的工具函数
// 函数接受任意数量的 ClassValue 类型参数
export function cn(...inputs: ClassValue[]) {
  // 1. 使用 clsx 合并所有输入的类名
  // 2. 使用 twMerge 处理可能的 Tailwind 类名冲突
  return twMerge(clsx(inputs))
}