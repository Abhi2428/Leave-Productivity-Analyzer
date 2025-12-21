import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { prisma } from '@/lib/prisma';
import {
  parseExcelDate,
  getDayType,
  calculateWorkedHours,
  formatTime,
} from '@/lib/calculations';
import { ExcelRow } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);

    if (data.length === 0) {
      return NextResponse.json({ error: 'Excel file is empty' }, { status: 400 });
    }

    const processedRecords = [];

    for (const row of data) {
      const employeeName = row['Employee Name'];
      const dateValue = row['Date'];
      const inTime = row['In-Time'];
      const outTime = row['Out-Time'];

      if (!employeeName || !dateValue) continue;

      const date = parseExcelDate(dateValue);
      const dayType = getDayType(date);

      const employee = await prisma.employee.upsert({
        where: { name: String(employeeName) },
        update: {},
        create: { name: String(employeeName) },
      });

      const isWorkingDay = dayType !== 'sunday';
      const isLeave = isWorkingDay && (!inTime || !outTime);

      const workedHours = isLeave ? 0 : calculateWorkedHours(
        formatTime(inTime),
        formatTime(outTime)
      );

      const attendance = await prisma.attendance.upsert({
        where: {
          employeeId_date: {
            employeeId: employee.id,
            date: date,
          },
        },
        update: {
          inTime: inTime ? formatTime(inTime) : null,
          outTime: outTime ? formatTime(outTime) : null,
          workedHours,
          isLeave,
          dayType,
        },
        create: {
          employeeId: employee.id,
          date: date,
          inTime: inTime ? formatTime(inTime) : null,
          outTime: outTime ? formatTime(outTime) : null,
          workedHours,
          isLeave,
          dayType,
        },
      });

      processedRecords.push(attendance);
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${processedRecords.length} attendance records`,
      recordsProcessed: processedRecords.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process file', details: String(error) },
      { status: 500 }
    );
  }
}