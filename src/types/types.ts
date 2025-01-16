export interface Dropdown {
  name: string;
  description: string;
}

export interface Team extends Dropdown {
  teamId: string;
}

export interface Pos extends Dropdown {
  positionId: string;
}

export interface Pagi {
  pageIndex: number;
  pageSize: number;
  search: {};
}

export interface PagiData {
  pageRow: number;
  pageIndex: number;
  pageSize: string;
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
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: Gender;
  age: number;
  team_id: number;
  position_id: number;
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

interface MemberDetail extends Member {
  team_name: string;
  position_name: string;
}

// let mem1:Member = {

// }

// let mem2:MemberDetail = {

// }

// mem2 = mem1
