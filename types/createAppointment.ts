
import { Ionicons } from '@expo/vector-icons';
export interface createAppointmentPayload {
  startDate: string;
  startDateTime: string;
  endDateTime: string;
  appUserId: number | string;
  clientId: number | string;
  title: string;
  description: string;
  appointmentType: number;
  contactMethod: number;
  appointmentStatus: number;
  createdBy: string;
  createdOn: string;
  recordedBy: string;
  recordedOn: string;
}

export interface Provider {
  id: number;
  displayName: string;
}

export interface Client {
  id: number;
  description: string;
}




export interface SelectionState {
  label: string;
  id?: number;
  index?: number;
}


export type IconName = keyof typeof Ionicons.glyphMap;