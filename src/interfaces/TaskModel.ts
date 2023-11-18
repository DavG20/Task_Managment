export enum TaskCategory {
  Work = "Work",
  Home = "Home",
  Personal = "Personal",
  Shopping = "Shopping",
  Others = "Others",
}
export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  deadLine: string;
  category: TaskCategory;
}
