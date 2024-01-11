import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Sidebar.css'

const Sidebar = () => {
  const toggleCard = (cardId) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      if (card.id === cardId) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };

  return (
    <>
      <div className="sidebar">
        <ul className="menu">
          <li className="active">
            <a href="#" onClick={() => toggleCard("dashboardCard")}>
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              id="profileLink"
              onClick={() => toggleCard("profileCard")}
            >
              <i className="fa-solid fa-user"></i>
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a 
              href="#"
              id="depositLink"
              onClick={() => toggleCard("depositCard")}
            >
              <i className="fa-solid fa-money-bill-wave"></i>
              <span>Deposit</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              id="withdrawLink"
              onClick={() => toggleCard("withdrawCard")}
            >
              <i className="fa-solid fa-money-bill-wave"></i>
              <span>Withdraw</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              id="openFDLink"
              onClick={() => toggleCard("openFDCard")}
            >
              <i className="fa-solid fa-piggy-bank"></i>
              <span>Open FD</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              id="applyLoanLink"
              onClick={() => toggleCard("applyLoanCard")}
            >
              <i className="fas fa-hand-holding-usd"></i>
              <span>Apply Loan </span>
            </a>
          </li>
          {/* <li>
            <a
              href="#"
              id="transactionsLink"
              onClick={() => toggleCard("transactionsCard")}
            >
            <i className="fa-solid fa-clock-rotate-left"></i>
              <span>Show Transactions History </span>
            </a>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
