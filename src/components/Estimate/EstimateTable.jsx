import React from 'react';

const EstimateTable = ({ estimates, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Total Estimate: <span className="bg-red-500 text-white px-3 py-1 rounded">{estimates.length}</span></h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Sr.No</th>
            <th>Group</th>
            <th>Chain ID</th>
            <th>Brand</th>
            <th>Zone</th>
            <th>Service Details</th>
            <th>Total Units</th>
            <th>Price Per Unit</th>
            <th>Total</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {estimates.map((e, i) => (
            <tr key={i} className="text-center border-b">
              <td>{i + 1}</td>
              <td>{e.group}</td>
              <td>{e.chain}</td>
              <td>{e.brand}</td>
              <td>{e.zone}</td>
              <td>{e.service}</td>
              <td>{e.quantity}</td>
              <td>{e.costPerUnit}</td>
              <td>{e.total}</td>
              <td><button onClick={() => onEdit(e)} className="bg-yellow-400 px-3 py-1 rounded">Edit</button></td>
              <td><button onClick={() => {
                if (window.confirm("Are you sure you want to delete this estimate?")) {
                  onDelete(e)
                }
              }} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstimateTable;
