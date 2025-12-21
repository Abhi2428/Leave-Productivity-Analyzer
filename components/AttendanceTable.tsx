'use client';

import { DailyAttendance } from '@/types';

interface AttendanceTableProps {
  records: DailyAttendance[];
}

export default function AttendanceTable({ records }: AttendanceTableProps) {
  const getRowColor = (record: DailyAttendance) => {
    if (record.dayType === 'sunday') return 'bg-gray-50';
    if (record.isLeave) return 'bg-red-50';
    if (record.dayType === 'saturday') return 'bg-blue-50';
    return 'bg-white';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Day
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              In Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Out Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Worked Hours
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Expected Hours
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.map((record, idx) => (
            <tr key={idx} className={getRowColor(record)}>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {record.date}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                {record.dayOfWeek}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                {record.inTime}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                {record.outTime}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {record.workedHours.toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                {record.expectedHours.toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">
                {record.dayType === 'sunday' ? (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                    Sunday Off
                  </span>
                ) : record.isLeave ? (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-200 text-red-800">
                    Leave
                  </span>
                ) : record.dayType === 'saturday' ? (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
                    Half Day
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-200 text-green-800">
                    Present
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {records.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No attendance records found
        </div>
      )}
    </div>
  );
}