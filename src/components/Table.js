import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {columns.map((col, index) => (
              <th key={index} className="p-3 text-left font-semibold">
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b hover:bg-gray-50 transition-all"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="p-3">
                  {col.Cell ? col.Cell({ value: row[col.accessor] }) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
