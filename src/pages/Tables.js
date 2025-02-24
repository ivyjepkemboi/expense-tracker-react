import React from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

const tableData = [
  { name: "Marketplace", status: "Approved", date: "24.Jan.2021", progress: 75 },
  { name: "Venus DB PRO", status: "Disable", date: "30.Dec.2021", progress: 40 },
  { name: "Venus DS", status: "Error", date: "20.May.2021", progress: 20 },
  { name: "Marketplace", status: "Approved", date: "12.Jul.2021", progress: 90 },
];

const columns = [
  {
    Header: "NAME",
    accessor: "name",
    Cell: ({ value }) => <p className="text-gray-800 font-medium">{value}</p>,
  },
  {
    Header: "STATUS",
    accessor: "status",
    Cell: ({ value }) => (
      <div className="flex items-center">
        {value === "Approved" ? (
          <MdCheckCircle className="text-green-500 me-2" />
        ) : value === "Disable" ? (
          <MdCancel className="text-red-500 me-2" />
        ) : (
          <MdOutlineError className="text-yellow-500 me-2" />
        )}
        <span className="text-gray-700">{value}</span>
      </div>
    ),
  },
  {
    Header: "DATE",
    accessor: "date",
    Cell: ({ value }) => <p className="text-gray-700">{value}</p>,
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
    Cell: ({ value }) => (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    ),
  },
];

const Tables = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Tables</h1>
      <Card extra="p-5">
        <h3 className="text-lg font-bold mb-3">Complex Table</h3>
        <Table columns={columns} data={tableData} />
      </Card>
    </div>
  );
};

export default Tables;
