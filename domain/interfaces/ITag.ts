import { IDomain } from './IDomain';

export interface ITag extends IDomain {
  id?:string,
  name: string,
  color: string,
  board: string
}