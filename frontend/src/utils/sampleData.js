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
      paymentTermsId: "NET30",
      description: "Net 30 days",
      daysToPayment: 30,
      discountPercent: 2,
      discountDays: 10
    },
    SAP: {
      termCode: "N30",
      termDescription: "Net 30",
      paymentDueDays: 30,
      earlyPaymentDiscount: 2,
      discountValidDays: 10
    }
  },
  job: {
    Oracle: {
      jobId: "JOB-001",
      title: "Software Developer",
      department: "Engineering",
      salary: {
        min: 80000,
        max: 120000,
        currency: "USD"
      },
      requirements: ["JavaScript", "React", "Node.js"]
    },
    SAP: {
      positionCode: "DEV-001",
      positionTitle: "Software Engineer",
      departmentCode: "ENG",
      compensationRange: {
        minimum: 80000,
        maximum: 120000,
        currencyCode: "USD"
      },
      skills: ["JavaScript", "React", "Node.js"]
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
        price: "number"
      }
    ]
  }
};