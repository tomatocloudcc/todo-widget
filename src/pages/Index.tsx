import { MadeWithDyad } from "@/components/made-with-dyad";
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: '购买 groceries', completed: false },
    { id: '2', text: '回复邮件', completed: true },
    { id: '3', text: '准备会议材料', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      const newItem: TodoItem = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, newItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        {/* 顶部黄色标题栏 */}
        <div className="bg-yellow-400 px-4 py-3 rounded-t-lg">
          <h2 className="text-lg font-semibold text-gray-900">待办事项</h2>
        </div>
        
        {/* 白色内容区域 */}
        <CardContent className="p-4 bg-white rounded-b-lg">
          {/* 添加新待办事项输入框 */}
          <div className="flex gap-2 mb-4">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="添加新待办事项..."
              className="flex-1"
            />
            <Button onClick={addTodo} size="sm" className="bg-yellow-400 hover:bg-yellow-500">
              <Plus size={16} />
            </Button>
          </div>

          {/* 待办事项列表 */}
          <div className="space-y-2">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default Index;