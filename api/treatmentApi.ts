export const getTreatmentDetails = async () => {
  return {
    planName: "Mental Health Wellness Plan - 2026",
    goals: [
      { id: "1", goal: "Daily walk outside", date: "Jun-15-2026", targetDate: "Jun-30-2026", outcome: "In Progress", activity: "Successfully Completed" },
      { id: "2", goal: "Practice deep breathing", date: "Jun-18-2026", targetDate: "Jul-05-2026", outcome: "On Track", activity: "Partially Done" },
      { id: "3", goal: "Read 10 pages daily", date: "Jun-20-2026", targetDate: "Jul-10-2026", outcome: "Stalled", activity: "Pending" }
    ],
    notes: [
      { id: "n1", date: "Jun-15-2026", cptCode: "90837", intervention: "Relapse prevention", modality: "Medication Management RN", isNonBillable: false },
      { id: "n2", date: "Jun-18-2026", cptCode: "90791", intervention: "Cognitive Processing", modality: "Individual Therapy", isNonBillable: false }
    ]
  };
};