export interface Dropdown<T> {
  teamId?: T;
  positionId?: T;

  text: string;
  value: string;
}

export interface Dropdown2 {  
  text: string;
  value: string;
}

export interface Team<T> extends Dropdown2 {
  teamId: T;
}

export interface Pos<T> extends Dropdown2 {
  positionId: T;
}

export interface TP{
  teamId?: string;
  positionId?: string;

  name: string;
  description: string;
}

export interface Pagi {
  pageIndex: number;
  pageSize: number;
  search: {};
}

export interface PagiData {
  pageRow: number;
  pageIndex: number;
  pageSize: number;
}

export interface ImpData {
  data: [];
  rowCount: number;
  pageIndex: number;
  pageSize: number;
}

export type Gender =
  | "Male"
  | "Female"
  | "Polygender"
  | "Agender"
  | "Genderqueer"
  | "Bigender"
  | "Genderfluid"
  | "Non-binary";

export interface Employ1 {
  employeeIdId: string;
  dateOfBirth: string;
  email: string;
  firstname: string;
  lastname: string;
  phones: Phone[];
  positionId: string;
  teamId: string;
}
export interface Phone {
  phoneId: string;
  phoneNumber: string;
}
export interface Employ1Details extends Employ1 {
  team_name: string;
  position_name: string;
}

export interface pos2 {
  id: number;
  name: string;
}

export interface employ2 {
  team_id: number;
  team: string;

  member: Member[];
}

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  team_id?: number;
  position_id: number;
}

// interface MemberDetail extends Member {
//   team_name: string;
//   position_name: string;
// }

// let mem1:Member = {

// }

// let mem2:MemberDetail = {

// }

// mem2 = mem1
