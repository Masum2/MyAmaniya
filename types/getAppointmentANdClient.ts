// src/types/index.ts

export interface Appointment {
  id: number | string;
  recordType: 'Next Appointment' | 'Past Appointment'; // নির্দিষ্ট মান
  appointmentType: number;
  appointmentDate: string; // ISO string
  appointmentTime: string; // ISO string
}

export interface Client {
  id: number | string;
  description: string; 
}