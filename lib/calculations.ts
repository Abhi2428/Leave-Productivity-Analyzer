import { format, parse, getDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export function getDayType(date: Date): 'weekday' | 'saturday' | 'sunday' {
  const day = getDay(date);
  if (day === 0) return 'sunday';
  if (day === 6) return 'saturday';
  return 'weekday';
}

export function getExpectedHours(dayType: 'weekday' | 'saturday' | 'sunday'): number {
  switch (dayType) {
    case 'weekday':
      return 8.5;
    case 'saturday':
      return 4;
    case 'sunday':
      return 0;
  }
}

export function calculateWorkedHours(inTime?: string, outTime?: string): number {
  if (!inTime || !outTime) return 0;

  try {
    const inDateTime = parse(inTime, 'HH:mm', new Date());
    const outDateTime = parse(outTime, 'HH:mm', new Date());
    
    const diffMs = outDateTime.getTime() - inDateTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    return Math.max(0, Math.round(diffHours * 100) / 100);
  } catch (error) {
    return 0;
  }
}

export function getWorkingDaysInMonth(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(new Date(year, month - 1));
  const allDays = eachDayOfInterval({ start, end });
  
  return allDays.filter(day => getDay(day) !== 0);
}

export function calculateExpectedHoursForMonth(year: number, month: number): number {
  const workingDays = getWorkingDaysInMonth(year, month);
  
  return workingDays.reduce((total, day) => {
    const dayType = getDayType(day);
    return total + getExpectedHours(dayType);
  }, 0);
}

export function formatTime(time?: string | number): string {
  if (!time) return '-';
  return String(time);
}

export function parseExcelDate(excelDate: string | number | Date): Date {
  if (excelDate instanceof Date) {
    return excelDate;
  }
  
  if (typeof excelDate === 'number') {
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + excelDate * 86400000);
  }
  
  return new Date(excelDate);
}

export function formatDateForDisplay(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getDayName(date: Date): string {
  return format(date, 'EEEE');
}