export const mockData = {
  invoices: [
    { id: "INV-2023-001", customer: "Acme Corp", date: "2023-05-15", amount: "$1,250.00", status: "Paid" },
    { id: "INV-2023-002", customer: "Globex Inc", date: "2023-05-18", amount: "$2,340.00", status: "Pending" },
    { id: "INV-2023-003", customer: "Stark Industries", date: "2023-05-20", amount: "$4,100.00", status: "Overdue" },
    { id: "INV-2023-004", customer: "Wayne Enterprises", date: "2023-05-22", amount: "$1,800.00", status: "Paid" },
    { id: "INV-2023-005", customer: "Umbrella Corp", date: "2023-05-25", amount: "$3,200.00", status: "Pending" },
  ],
  payments: [
    { id: "PAY-2023-001", customer: "Acme Corp", date: "2023-05-15", amount: "$1,250.00", method: "Credit Card" },
    { id: "PAY-2023-002", customer: "Globex Inc", date: "2023-05-19", amount: "$2,340.00", method: "Bank Transfer" },
    { id: "PAY-2023-003", customer: "Wayne Enterprises", date: "2023-05-22", amount: "$1,800.00", method: "PayPal" },
    { id: "PAY-2023-004", customer: "Oscorp", date: "2023-05-24", amount: "$950.00", method: "Credit Card" },
    { id: "PAY-2023-005", customer: "LexCorp", date: "2023-05-26", amount: "$3,500.00", method: "Bank Transfer" },
  ],
  products: [
    { id: "PRD-001", name: "Enterprise License", price: "$250.00", stock: 120, category: "Software" },
    { id: "PRD-002", name: "Cloud Storage (1TB)", price: "$99.99", stock: 999, category: "Services" },
    { id: "PRD-003", name: "Smart Display 24\"", price: "$349.99", stock: 45, category: "Hardware" },
    { id: "PRD-004", name: "Wireless Keyboard", price: "$79.99", stock: 68, category: "Hardware" },
    { id: "PRD-005", name: "Security Suite", price: "$199.99", stock: 230, category: "Software" },
  ],
  customers: [
    { id: "CUST-001", name: "Acme Corp", email: "contact@acme.com", location: "New York, USA", status: "Active" },
    { id: "CUST-002", name: "Globex Inc", email: "info@globex.com", location: "London, UK", status: "Active" },
    { id: "CUST-003", name: "Stark Industries", email: "sales@stark.com", location: "Los Angeles, USA", status: "Active" },
    { id: "CUST-004", name: "Wayne Enterprises", email: "info@wayne.com", location: "Gotham City, USA", status: "Inactive" },
    { id: "CUST-005", name: "Umbrella Corp", email: "contact@umbrella.com", location: "Tokyo, Japan", status: "Active" },
  ]
};