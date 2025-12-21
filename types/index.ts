export interface AttendanceRecord {
  employeeName: string;
  date: Date;
  inTime?: string;
  outTime?: string;
  workedHours: number;
  isLeave: boolean;
  dayType: 'weekday' | 'saturday' | 'sunday';
}

export interface MonthlyAnalytics {
  employeeName: string;
  month: string;
  year: number;
  totalExpectedHours: number;
  totalWorkedHours: number;
  leavesUsed: number;
  leavesAllowed: number;
  productivityPercentage: number;
  dailyBreakdown: DailyAttendance[];
}

export interface DailyAttendance {
  date: string;
  dayOfWeek: string;
  inTime: string;
  outTime: string;
  workedHours: number;
  expectedHours: number;
  isLeave: boolean;
  dayType: string;
}

export interface ExcelRow {
  'Employee Name'?: string;
  'Date'?: string | number | Date;
  'In-Time'?: string | number;
  'Out-Time'?: string | number;
}