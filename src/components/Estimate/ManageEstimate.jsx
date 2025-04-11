"use client"

import { useState } from "react"
import "./ManageEstimate.css"

const ManageEstimate = () => {
  const [view, setView] = useState("list")
  const [date, setDate] = useState("")
  const [estimates, setEstimates] = useState([
    {
      id: 1,
      group: "Persian Darbar",
      chainId: 2,
      brand: "Panaya",
      zone: "Kurla",
      serviceDetails: "Shaft Maintenance",
      totalUnits: 2,
      pricePerUnit: 4000,
      total: 8000,
    },
    {
      id: 2,
      group: "Mumbai Darbar",
      chainId: 2,
      brand: "Panaya",
      zone: "Marol",
      serviceDetails: "Battery Maintenance",
      totalUnits: 6,
      pricePerUnit: 1000,
      total: 6000,
    },
    {
      id: 3,
      group: "Delhi Darbar",
      chainId: 3,
      brand: "Delta Equinox",
      zone: "Thane",
      serviceDetails: "Engine Servicing",
      totalUnits: 4,
      pricePerUnit: 12,
      total: 4800,
    },
    {
      id: 4,
      group: "Deccan Punjab",
      chainId: 5,
      brand: "Skava",
      zone: "Vashi",
      serviceDetails: "Differential Servicing",
      totalUnits: 3,
      pricePerUnit: 1100,
      total: 3300,
    },
    {
      id: 5,
      group: "Persian Darbar",
      chainId: 6,
      brand: "Panaya",
      zone: "Borivali",
      serviceDetails: "Engine Maintenance",
      totalUnits: 5,
      pricePerUnit: 7500,
      total: 6000,
    },
    {
      id: 6,
      group: "Main Khemf",
      chainId: 4,
      brand: "Skava",
      zone: "Neelinfo",
      serviceDetails: "Radiator Service",
      totalUnits: 1,
      pricePerUnit: 2500,
      total: 2500,
    },
  ])
  const [formData, setFormData] = useState({
    group: "",
    chainId: "",
    brand: "",
    zone: "",
    serviceDetails: "",
    totalUnits: "",
    pricePerUnit: "",
    total: "",
  })

  const [editId, setEditId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const total = parseInt(formData.totalUnits) * parseInt(formData.pricePerUnit)

    if (editId) {
      const updated = estimates.map((item) =>
        item.id === editId ? { ...formData, id: editId, total: total } : item
      )
      setEstimates(updated)
      setEditId(null)
    } else {
      const newEstimate = {
        ...formData,
        id: estimates.length + 1,
        total: total,
      }
      setEstimates([...estimates, newEstimate])
    }

    setFormData({
      group: "",
      chainId: "",
      brand: "",
      zone: "",
      serviceDetails: "",
      totalUnits: "",
      pricePerUnit: "",
      total: "",
    })
    setDate("")
    setView("list")
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this estimate?")) {
      const updated = estimates.filter((item) => item.id !== id)
      setEstimates(updated)
    }
  }

  const handleEdit = (item) => {
    setFormData({
      group: item.group,
      chainId: item.chainId,
      brand: item.brand,
      zone: item.zone,
      serviceDetails: item.serviceDetails,
      totalUnits: item.totalUnits,
      pricePerUnit: item.pricePerUnit,
      total: item.total,
    })
    setDate("")
    setEditId(item.id)
    setView("create")
  }

  return (
    <div className="manage-estimate-container">
      {view === "list" ? (
        <div className="estimate-list-view">
          <div className="estimate-summary">
            <div className="total-estimate-card">
              <h3>Total Estimate</h3>
              <p>{estimates.length}</p>
            </div>
            <button className="create-estimate-btn" onClick={() => setView("create")}>
              Create Estimate
            </button>
          </div>

          <div className="estimate-table-container">
            <table className="estimate-table">
              <thead>
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
                {estimates.map((estimate) => (
                  <tr key={estimate.id}>
                    <td>{estimate.id}</td>
                    <td>{estimate.group}</td>
                    <td>{estimate.chainId}</td>
                    <td>{estimate.brand}</td>
                    <td>{estimate.zone}</td>
                    <td>{estimate.serviceDetails}</td>
                    <td>{estimate.totalUnits}</td>
                    <td>{estimate.pricePerUnit}</td>
                    <td>{estimate.total}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(estimate)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(estimate.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="create-estimate-view">
          <form onSubmit={handleSubmit} className="estimate-form">
            <div className="form-row">
              <div className="form-group">
                <label>Select Group:</label>
                <div className="select-wrapper">
                  <select name="group" value={formData.group} onChange={handleChange}>
                    <option value="">Select Group</option>
                    <option value="Persian Darbar">Persian Darbar</option>
                    <option value="Mumbai Darbar">Mumbai Darbar</option>
                    <option value="Delhi Darbar">Delhi Darbar</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Total Quantity:</label>
                <input
                  type="number"
                  name="totalUnits"
                  value={formData.totalUnits}
                  onChange={handleChange}
                  placeholder="Enter Total Qty"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Select Chain ID or Company Name:</label>
                <div className="select-wrapper">
                  <select name="chainId" value={formData.chainId} onChange={handleChange}>
                    <option value="">Select Chain ID</option>
                    <option value="1">Chain ID 1</option>
                    <option value="2">Chain ID 2</option>
                    <option value="3">Chain ID 3</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Cost Per Quantity:</label>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                  placeholder="Enter Cost Per Qty"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Select Brand:</label>
                <div className="select-wrapper">
                  <select name="brand" value={formData.brand} onChange={handleChange}>
                    <option value="">Select Brand</option>
                    <option value="Panaya">Panaya</option>
                    <option value="Skava">Skava</option>
                    <option value="Delta Equinox">Delta Equinox</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Estimated Amount in Rs:</label>
                <input
                  type="text"
                  name="total"
                  value={formData.total}
                  disabled
                  placeholder="Calculated Automatically"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Select Zone:</label>
                <div className="select-wrapper">
                  <select name="zone" value={formData.zone} onChange={handleChange}>
                    <option value="">Select Zone</option>
                    <option value="Kurla">Kurla</option>
                    <option value="Marol">Marol</option>
                    <option value="Thane">Thane</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Expected Delivery Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Service Provided:</label>
                <input
                  type="text"
                  name="serviceDetails"
                  value={formData.serviceDetails}
                  onChange={handleChange}
                  placeholder="Enter Service"
                />
              </div>
              <div className="form-group">
                <label>Other Delivery Details:</label>
                <textarea placeholder="Enter details"></textarea>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-estimate-btn">
                {editId ? "Update Estimate" : "Create and Save Estimate"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ManageEstimate
