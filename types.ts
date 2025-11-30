export enum AppView {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  INSTITUTE = 'INSTITUTE',
  STUDENTS = 'STUDENTS',
  ACADEMIC = 'ACADEMIC',
  ISLAMIC = 'ISLAMIC',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}

export interface Student {
  id: number;
  name: string;
  fatherName: string;
  phone: string;
  class: string;
  roll: number;
  status: 'active' | 'inactive';
}

export interface InstituteProfile {
  name: string;
  address: string;
  phone: string;
  established: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface IslamicContent {
  type: 'hadith' | 'prayer';
  title: string;
  content: string;
  source?: string;
}