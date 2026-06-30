export interface Goal {
  id: string;
  goal: string;
  date: string;
  targetDate: string;
  outcome: string; // e.g., "In Progress"
  activity: string; // e.g., "Successfully Completed"
}

export interface ProgressNote {
  id: string;
  date: string;
  cptCode: string;
  intervention: string;
  modality: string;
  isNonBillable: boolean;
}

export interface TreatmentData {
  planName: string;
  goals: Goal[];
  notes: ProgressNote[];
}