import { IDomain } from './IDomain';
import { ITask } from './ITask';

export interface IBoardColumn extends IDomain {
  name: string,
  default: boolean,
  position: number,
  board: string,
  tasks: ITask[]
}