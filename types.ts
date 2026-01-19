export interface GuestMessage {
  name: string;
  message: string;
  date: string;
}

export enum AttendanceStatus {
  ATTENDING = 'ATTENDING',
  NOT_ATTENDING = 'NOT_ATTENDING',
  MAYBE = 'MAYBE'
}

export interface RsvpData {
  name: string;
  phone: string;
  count: number;
  status: AttendanceStatus;
  note: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  name: string;
}

export interface ContactInfo {
  role: string;
  name: string;
  phone: string;
}
