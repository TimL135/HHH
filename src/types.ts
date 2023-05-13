export type Id = string;
export type ShoppingKey = string;
export type ShoppingAmount = string;
export type Errors = { [key: string]: any };
export interface Group {
  id: Id;
  name: string;
  users: Id[];
  tasks: Tasks;
  isPublic: boolean;
  shoppingList: ShoppingList;
}
export interface ShoppingItem {
  amount: ShoppingAmount
  done: boolean
  description: string
  creator: Id
}
export interface ShoppingList {
  shoppingItems: { [key: ShoppingKey]: ShoppingItem };
  allShoppingItems: ShoppingKey[];
}

export type Tasks = { [key: Id]: Task };
export interface User extends GroupUser {
  groups: Group[];
}
export interface GroupUser {
  id: Id;
  name: string;
}
export interface Task {
  title: string;
  notes: string;
  done: boolean;
  creator: Id;
  worker?: Id;
  appointment: string;
  createAt: string;
  doneAt?: string;
  repeat: 0 | 1 | 7 | 14 | 31;
}
