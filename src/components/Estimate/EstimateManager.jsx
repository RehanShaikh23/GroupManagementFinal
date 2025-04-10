import React, { useEffect, useState } from "react"
import EstimateForm from "./EstimateForm"
import EstimateTable from "./EstimateTable"
import styles from "./EstimateManager.module.css"

const EstimateManager = () => {
  const [estimates, setEstimates] = useState([])
  const [selectedEstimate, setSelectedEstimate] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("estimates")) || []
    setEstimates(stored)
  }, [])

  const saveEstimate = (data) => {
    let updatedList
    if (selectedEstimate) {
      updatedList = estimates.map((e) => (e === selectedEstimate ? data : e))
    } else {
      updatedList = [...estimates, data]
    }
    setEstimates(updatedList)
    localStorage.setItem("estimates", JSON.stringify(updatedList))
    setSelectedEstimate(null)
  }

  const deleteEstimate = (data) => {
    const updatedList = estimates.filter((e) => e !== data)
    setEstimates(updatedList)
    localStorage.setItem("estimates", JSON.stringify(updatedList))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Estimates</h1>

      <div className={styles.formSection}>
        <EstimateForm
          onSave={saveEstimate}
          selected={selectedEstimate}
          clearSelection={() => setSelectedEstimate(null)}
        />
      </div>

      <div className={styles.tableSection}>
        <EstimateTable
          estimates={estimates}
          onEdit={setSelectedEstimate}
          onDelete={deleteEstimate}
        />
      </div>
    </div>
  )
}

export default EstimateManager
