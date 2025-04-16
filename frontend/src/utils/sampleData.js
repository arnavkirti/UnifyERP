export const sampleData = {
  invoice: {
    Oracle: {
      invoiceNumber: "INV-2023-001",
      customerID: "CUST-123",
      issueDate: "2023-05-15",
      dueDate: "2023-06-15",
      totalAmount: 1250.00,
      currency: "USD",
      items: [
        {
          productName: "Enterprise License",
          quantity: 5,
          price: 250.00
        }
      ]
    },
    SAP: {
      invoiceId: "INV2023001",
      customerNumber: "C123",
      dateCreated: "15.05.2023",
      dateDue: "15.06.2023",
      totalValue: 1250.00,
      currencyCode: "USD",
      orderLines: [
        {
          product: "Enterprise License",
          qty: 5,
          unitPrice: 250.00
        }
      ]
    }
  },
  payment: {
    Oracle: {
      "invoice_id": "ORA-45201",
      "invoice_num": "ORA-INV-2025-09",
      "invoice_date": "2025-03-28",
      "payment_due_date": "2025-04-12",
      "currency_code": "USD",
      "supplier_name": "Oracle Cloud Services",
      "customer_account_name": "Tesla Inc.",
      "invoice_lines": [
        {
          "item_code": "ORC-PROD-991",
          "description": "Cloud Server Hosting - March",
          "quantity": 1,
          "unit_price": 3000.00,
          "amount": 3000.00
        }
      ],
      "invoice_total": 3000.00
    },
    SAP: {
      "id": "INV1001",
      "document_number": "SAP-INV-2024-001",
      "posting_date": "2025-04-01",
      "net_due_date": "2025-04-15",
      "currency_code": "EUR",
      "vendor": "Siemens AG",
      "payer": "BMW Group",
      "line_items": [
        {
          "material_number": "MAT100234",
          "description": "Industrial Pump",
          "quantity": 10,
          "unit_price": 1200.00,
          "net_amount": 12000.00
        }
      ],
      "net_value": 12000.00
    },
    Microsoft_Dynamics:{
      "invoice_number": "MDYN-3021",
      "external_document_no": "MSFT-PO-7890",
      "invoice_date": "2025-04-05",
      "due_date": "2025-04-20",
      "currency": "GBP",
      "vendor_account": "Microsoft UK Ltd",
      "customer_name": "Rolls Royce Plc",
      "details": [
        {
          "product_id": "MSPROD-115",
          "name": "Azure Credits",
          "qty": 500,
          "price_per_unit": 5.00,
          "line_total": 2500.00
        }
      ],
      "total_amount": 2500.00
    }
    
  },
  job: {
    SAP: {
      "id": "SAP-STD-1020",
      "document_number": "SAP-JOB-2025-01",
      "posting_date": "2025-04-10",
      "net_due_date": "2025-04-25",
      "currency_code": "EUR",
      "vendor": "Bosch GmbH",
      "payer": "Volkswagen AG",
      "line_items": [
        {
          "material_number": "ENG-SRV-502",
          "description": "Engineering Consulting",
          "quantity": 1,
          "unit_price": 5000.00,
          "net_amount": 5000.00
        }
      ],
      "net_value": 5000.00
    },
    Oracle: {
      "invoice_id": "ORA-JOB-3321",
      "invoice_num": "ORA-STDJOB-008",
      "invoice_date": "2025-03-30",
      "payment_due_date": "2025-04-14",
      "currency_code": "USD",
      "supplier_name": "Infosys Ltd",
      "customer_account_name": "Caterpillar Inc.",
      "invoice_lines": [
        {
          "item_code": "CONS-1001",
          "description": "IT Support Services",
          "quantity": 3,
          "unit_price": 1200.00,
          "amount": 3600.00
        }
      ],
      "invoice_total": 3600.00
    }
  },
  schema: {
    invoiceNumber: "string",
    customerID: "string",
    newField: "integer",
    items: [
      {
        productName: "string",
        quantity: "integer",
        price: "number",
        discount: "number",
        tax: "number"
      }
    ]
  },
  // Sample data for compatibility check
  compatibility: {
    Oracle: {
      invoiceNumber: "string",
      customerID: "string",
      issueDate: "date",
      dueDate: "date",
      totalAmount: "number",
      currency: "string",
      items: "array"
    },
    SAP: {
      invoiceId: "string",
      customerNumber: "string",
      dateCreated: "date",
      dateDue: "date",
      totalValue: "number",
      currencyCode: "string",
      orderLines: "array"
    }
  },
  // Sample data for integration issues prediction
  issues: {
    Oracle: {
      invoiceNumber: "string",
      customerID: "string",
      issueDate: "date",
      dueDate: "date",
      totalAmount: "number",
      currency: "string",
      items: "array"
    },
    SAP: {
      invoiceId: "string",
      customerNumber: "string",
      dateCreated: "date",
      dateDue: "date",
      totalValue: "number",
      currencyCode: "string",
      orderLines: "array"
    }
  }
};