import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ sender: "", receiver: "", amount: "" });

  // Fetch transactions from backend
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/transactions", {
        sender: form.sender,
        receiver: form.receiver,
        amount: parseFloat(form.amount),
      });
      setForm({ sender: "", receiver: "", amount: "" }); // reset form
      fetchTransactions(); // refresh table
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            SIH Blockchain
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <h2 className="mb-4 text-center text-primary">
          Blockchain Explorer
        </h2>

        {/* Form */}
        <div className="card shadow-lg p-4">
          <h5 className="card-title">Add New Transaction</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Sender</label>
              <input
                type="text"
                name="sender"
                value={form.sender}
                onChange={handleChange}
                className="form-control"
                placeholder="Alice"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Receiver</label>
              <input
                type="text"
                name="receiver"
                value={form.receiver}
                onChange={handleChange}
                className="form-control"
                placeholder="Bob"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="form-control"
                placeholder="10"
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit Transaction
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="mt-5">
          <h5>Recent Transactions</h5>
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((tx, idx) => (
                  <tr key={idx}>
                    <td>{tx.sender}</td>
                    <td>{tx.receiver}</td>
                    <td>{tx.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No transactions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
