import React, { useEffect, useState } from 'react';
import styles from './EstimateForm.module.css';

const EstimateForm = ({ onSave, selected, clearSelection }) => {
  const [form, setForm] = useState({
    group: '',
    chain: '',
    brand: '',
    subzone: '',
    service: '',
    quantity: '',
    cost: '',
    total: '',
    deliveryDate: '',
    details: ''
  });

  // Load dropdown options from localStorage
  const [groups, setGroups] = useState([]);
  const [chains, setChains] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subzones, setSubzones] = useState([]);

  useEffect(() => {
    setGroups(JSON.parse(localStorage.getItem('groups')) || []);
    setChains(JSON.parse(localStorage.getItem('chains')) || []);
    setBrands(JSON.parse(localStorage.getItem('brands')) || []);
    setSubzones(JSON.parse(localStorage.getItem('subzones')) || []);
  }, []);

  // Pre-fill if editing
  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      group: '',
      chain: '',
      brand: '',
      subzone: '',
      service: '',
      quantity: '',
      cost: '',
      total: '',
      deliveryDate: '',
      details: ''
    });
    clearSelection();
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label>Select Group:</label>
        <select name="group" value={form.group} onChange={handleChange}>
          <option value="">Select...</option>
          {groups.map((g, i) => (
            <option key={i} value={g.name}>{g.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label>Total Quantity:</label>
        <input name="quantity" value={form.quantity} onChange={handleChange} type="number" placeholder="Enter Total Qty" />
      </div>

      <div className={styles.inputGroup}>
        <label>Select Chain ID or Company Name:</label>
        <select name="chain" value={form.chain} onChange={handleChange}>
          <option value="">Select...</option>
          {chains.map((c, i) => (
            <option key={i} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label>Cost Per Quantity:</label>
        <input name="cost" value={form.cost} onChange={handleChange} type="number" placeholder="Enter Cost Per Qty" />
      </div>

      <div className={styles.inputGroup}>
        <label>Select Brand:</label>
        <select name="brand" value={form.brand} onChange={handleChange}>
          <option value="">Select...</option>
          {brands.map((b, i) => (
            <option key={i} value={b.name}>{b.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label>Estimated Amount in Rs:</label>
        <input name="total" value={form.total} onChange={handleChange} type="number" placeholder="Enter Amount" />
      </div>

      <div className={styles.inputGroup}>
        <label>Select Zone:</label>
        <select name="subzone" value={form.subzone} onChange={handleChange}>
          <option value="">Select...</option>
          {subzones.map((s, i) => (
            <option key={i} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label>Expected Delivery Date:</label>
        <input name="deliveryDate" value={form.deliveryDate} onChange={handleChange} type="date" />
      </div>

      <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
        <label>Service Provided:</label>
        <input name="service" value={form.service} onChange={handleChange} type="text" placeholder="Enter Service" />
      </div>

      <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
        <label>Other Delivery Details:</label>
        <textarea name="details" value={form.details} onChange={handleChange} placeholder="Enter details here..." />
      </div>

      <div className={styles.buttonWrapper}>
        <button type="submit">{selected ? 'Update Estimate' : 'Create and Save Estimate'}</button>
      </div>
    </form>
  );
};

export default EstimateForm;
