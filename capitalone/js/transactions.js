// js/transactions.js — mock transactions data + rendering into transactions.html
const mockHistory = [
  { date: "2025-11-20", desc: "Zelle from Michael Adams", type: "Credit", amount: 850.00, balance: 7510.26 },
  { date: "2025-11-16", desc: "Starbucks Coffee", type: "Debit", amount: -7.85, balance: 6660.26 },
  { date: "2025-11-14", desc: "Transfer to Savings", type: "Debit", amount: -500.00, balance: 6668.11 },
  { date: "2025-11-06", desc: "Walmart Supercenter", type: "Debit", amount: -89.20, balance: 7168.11 },
  { date: "2025-11-02", desc: "Paycheck Deposit", type: "Credit", amount: 2100.00, balance: 7257.31 },
  { date: "2025-10-23", desc: "Amazon Marketplace", type: "Debit", amount: -39.99, balance: 5157.31 },
  { date: "2025-10-20", desc: "Apple Subscription", type: "Debit", amount: -14.99, balance: 5197.30 },
  { date: "2025-10-13", desc: "ATM Deposit", type: "Credit", amount: 300.00, balance: 5212.29 },
  { date: "2025-10-05", desc: "Target Store", type: "Debit", amount: -120.49, balance: 4912.29 },
  { date: "2025-10-02", desc: "Zelle to Sarah W.", type: "Debit", amount: -150.00, balance: 5032.78 }
];

// Render into table
// Render into table
function renderTransactions() {
  const tbody = document.getElementById("txBody");
  if (!tbody) return;

  mockHistory.forEach(tx => {
    const tr = document.createElement("tr");
    const amt = tx.amount;
    const amountHtml = `${amt > 0 ? '+' : ''}$${Math.abs(amt).toFixed(2)}`;
    const amtClass = amt > 0 ? 'tx-credit' : 'tx-debit';

    tr.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.desc}</td>
      <td>${tx.type}</td>
      <td class="${amtClass}">${amountHtml}</td>
    `;
    

    tbody.appendChild(tr);
  });

  hideLoader();
}

renderTransactions();
