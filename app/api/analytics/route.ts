import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  calculateExpectedHoursForMonth,
  formatDateForDisplay,
  getDayName,
  getExpectedHours,
} from '@/lib/calculations';
import { MonthlyAnalytics } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const employeeName = searchParams.get('employee');
    const month = parseInt(searchParams.get('month') || '0');
    const year = parseInt(searchParams.get('year') || '0');

    if (!employeeName || !month || !year) {
      return NextResponse.json(
        { error: 'Missing required parameters: employee, month, year' },
        { status: 400 }
      );
    }

    const employee = await prisma.employee.findUnique({
      where: { name: employeeName },
      include: {
        attendance: {
          where: {
            date: {
              gte: new Date(year, month - 1, 1),
              lt: new Date(year, month, 1),
            },
          },
          orderBy: { date: 'asc' },
        },
      },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    const totalExpectedHours = calculateExpectedHoursForMonth(year, month);

    const totalWorkedHours = employee.attendance.reduce(
      (total: number, record: { workedHours: number }) => total + record.workedHours,
      0
    );

    const leavesUsed = employee.attendance.filter(
      (record: { isLeave: boolean }) => record.isLeave
    ).length;

    const leavesAllowed = 2;

    const productivityPercentage =
      totalExpectedHours > 0
        ? Math.round((totalWorkedHours / totalExpectedHours) * 100 * 100) / 100
        : 0;

    const dailyBreakdown = employee.attendance.map((record: any) => ({
      date: formatDateForDisplay(new Date(record.date)),
      dayOfWeek: getDayName(new Date(record.date)),
      inTime: record.inTime || '-',
      outTime: record.outTime || '-',
      workedHours: record.workedHours,
      expectedHours: getExpectedHours(record.dayType as 'weekday' | 'saturday' | 'sunday'),
      isLeave: record.isLeave,
      dayType: record.dayType,
    }));

    const analytics: MonthlyAnalytics = {
      employeeName: employee.name,
      month: new Date(year, month - 1).toLocaleString('default', { month: 'long' }),
      year,
      totalExpectedHours: Math.round(totalExpectedHours * 100) / 100,
      totalWorkedHours: Math.round(totalWorkedHours * 100) / 100,
      leavesUsed,
      leavesAllowed,
      productivityPercentage,
      dailyBreakdown,
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics', details: String(error) },
      { status: 500 }
    );
  }
}