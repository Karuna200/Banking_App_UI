import React, { useState, useContext } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  //const min_balance = 10000.0;
  const [currentBalance, setCurrentBalance] = useState(0.0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [intramountfd, setinteramountfd] = useState(0.0)
  const [interestamountloan, setinterestamountloan] = useState(0.0);
  const API_BASE_URL = "http://localhost:8088/customers";

  const depositMoney = async (event) => {
    event.preventDefault();

    try {
      const depositAmount = parseFloat(
        document.getElementById("depositAmount").value
      );

      if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Invalid deposit amount. Please enter a valid positive number.");
        return;
      }
      console.log("clicked");
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `${API_BASE_URL}/updateCustomer/deposit/${depositAmount}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const updatedCustomer = await response.json();
        const newBalance = updatedCustomer.balance;
        setCurrentBalance(newBalance);
        console.log("Deposit successful. Updated customer:", updatedCustomer);
        alert("Deposit successful!");
      }
    } catch (error) {
      console.error("Error depositing money:", error.message);
      alert("Error depositing money. Please try again later.");
    }
  };

  const withdrawMoney = async (event) => {
    event.preventDefault();
    try {
      const withdrawAmount = parseFloat(
        document.getElementById("withdrawAmount").value
      );
      if (currentBalance <= 0 || currentBalance - withdrawAmount <= 0) {
        alert("Insufficient Balance: ");
        return;
      }
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `${API_BASE_URL}/updateCustomer/withdraw/${withdrawAmount}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const updateCustomer = await response.json();
        const newBalance = updateCustomer.balance;
        setCurrentBalance(newBalance);
      } else {
        alert("error in withdraw");
      }
    } catch (error) {
      console.error("Error in withdrawing money: " + error.message);
    }
  };

  const openFD = async (event) => {
    event.preventDefault();
    try {
      const fdAmount = parseFloat(document.getElementById("fd_Amount").value);
      const fd_year = parseInt(document.getElementById("fd_year").value);
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `${API_BASE_URL}/OpenFd/${fdAmount}/${fd_year}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({}),
        }
      );
      if (response.ok) {
        const tr = await response.json();
        console.log(tr);
       const intrestamount = tr.interestAmount;
        console.log("FD Interest Amount:", intrestamount); 
      setinteramountfd(intrestamount);
      alert("Your FD is now opened");
      }
    } catch (error) {
      console.error("Error in opening an FD " + error.message);
    }
  };

  const ApplyLaon = async (event) => {
    event.preventDefault();
    try {
      const loanAmount = parseFloat(
        document.getElementById("loan_Amount").value
      );
      const loan_year = parseInt(document.getElementById("loan_year").value);
      const loan_type = document.getElementById("type").value;
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `${API_BASE_URL}/ApplyLoan/${loan_type}/${loanAmount}/${loan_year}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({}),
        }
      );
      if (response.ok) {
        const tr = await response.json();
        console.log(tr);
        const intrestAmount = tr.interestAmount;
        setinterestamountloan(intrestAmount);
        alert(
          "Your Laon is applied!!"
            
        );
      }
    } catch (error) {
      console.error("Error in applying loan" + error.message);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${API_BASE_URL}/getTransactionhistory`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        const transactions = await response.json();
        setTransactionHistory(transactions);
      } else {
        console.error("Error fetching transaction history");
      }
    } catch (error) {
      console.error("Error fetching transaction history: ", error.message);
    }
  };

  
  


  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="main--content">
          <div className="header-wrapper">
            <div className="header--title">
              <span>Primary</span>
              <h2>DashBoard</h2>
            </div>
          </div>
          <div className="card--container">
            <div className="card--wrapper">
              <div className="card hidden" id="dashboardCard">
                <h3>Home</h3>
                <p>
                  Your current balance is: ₹{" "}
                  <span>{currentBalance.toFixed(2)}</span>
                </p>
              </div>
              <div className="card hidden" id="profileCard">
                <h3>Profile</h3>
                <ul className="li_item">
                  <li>
                    <span>Amount: {currentBalance.toFixed(2)} </span>
                  </li>
                </ul>
              </div>
              <div className="card hidden" id="depositCard">
                <h3>Deposit</h3>
                <p>
                  Your current balance is: ₹
                  <span id="currentBalanceDeposit">
                    {currentBalance.toFixed(2)}
                  </span>
                </p>
                <form>
                  <div className="form-group">
                    <label htmlFor="depositAmount">Amount:</label>
                    <input
                      type="number"
                      id="depositAmount"
                      name="depositAmount"
                      placeholder="Enter deposit amount"
                    />
                  </div>
                  <button type="submit" onClick={(e) => depositMoney(e)}>
                    Deposit Cash
                  </button>
                </form>
              </div>
              <div className="card hidden" id="withdrawCard">
                <h3>Withdraw</h3>
                <p>
                  Your current balance is: ₹
                  <span id="currentBalanceWithdraw">
                    {currentBalance.toFixed(2)}
                  </span>
                </p>
                <form>
                  <div className="form-group">
                    <label htmlFor="withdrawAmount">Amount:</label>
                    <input
                      type="number"
                      id="withdrawAmount"
                      name="withdrawAmount"
                      placeholder="Please enter your amount to withdraw: "
                    />
                  </div>
                  <button type="submit" onClick={(e) => withdrawMoney(e)}>
                    Withdraw Cash
                  </button>
                </form>
              </div>

              <div className="card hidden" id="openFDCard">
                <h3>Open FD</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="fd_Amount">Amount:</label>
                    <input
                      type="number"
                      id="fd_Amount"
                      name="fd_Amount"
                      placeholder="FD amount: "
                    />
                    <label htmlFor="fd_years">years:</label>
                    <input
                      type="number"
                      id="fd_year"
                      name="fd_year"
                      placeholder="FD year: "
                    />
                    <br></br>
                    <p>Your FD interest is : 
                    <span id="fdamount">
                    {intramountfd.toFixed(2)}
                  </span>
                    </p>
                  </div>
                  <button type="submit" onClick={(e) => openFD(e)}>
                    Open FD
                  </button>
                </form>
              </div>

              <div className="card hidden" id="applyLoanCard">
                <h3>Apply Loan</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="loan">Loan Type: </label>
                    <select id="type">
                      <option value="home">Home</option>
                      <option value="Car">Car</option>
                      <option value="Personal">Personal</option>
                      <option value="other">Other</option>
                    </select>
                    <br></br>
                    <label htmlFor="loan_Amount">Amount:</label>
                    <input
                      type="text"
                      id="loan_Amount"
                      name="fd_Amount"
                      placeholder="loan amount: "
                    />
                    <br></br>
                    <label htmlFor="loan_years">years:</label>
                    <input
                      type="number"
                      id="loan_year"
                      name="loan_year"
                      placeholder="Laon year: "
                    />
                    <br></br>
                    <p>Your loan Interest is : {interestamountloan.toFixed(2)}</p>
                  </div>
                  <button type="submit" onClick={(e) => ApplyLaon(e)}>
                    Apply for Loan
                  </button>
                </form>
              </div>

              <div className="card hidden" id="transactionsCard">
                <h3>Transactions History</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Years</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.Transaction_type}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.years}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
