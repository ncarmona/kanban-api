import { IDomain } from './IDomain';
import { ITag } from './ITag';

export interface ITask extends IDomain {
  title: string,
  description: string,
  column: string,
  author: string,
  tags: ITag[]
}