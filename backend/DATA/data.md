# Oracle Data with similar SAP Data

1. "Oracle" Get all invoices `/fscmRestApi/resources/11.13.18.05/invoices`
 - no request body
 - example response:
 ```json
 {
    "items": [
        {
            "InvoiceId": 361908,
            "InvoiceNumber": "Withholding tax - 300100171617230-4",
            "InvoiceCurrency": "THB",
            "PaymentCurrency": "THB",
            ...
            "links": [
                {
                    "rel": "self",
                    "href": "https://servername.fa.us2.oraclecloud.com/fscmRestApi/resources/11.13.18.05/invoices/361908",
                    "name": "invoices",
                    "kind": "item",
                    "properties": {
                                     "changeIndicator": "ACED0005737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A65787000000001770400000001737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B02000078700000000178"
                                  }
                },
                {
                    "rel": "child",
                    "href": "https://servername.fa.us2.oraclecloud.com/fscmRestApi/resources/11.13.18.05/invoices/361908/child/invoiceLines",
                    "name": "invoiceLines",
                    "kind": "collection"
                },
                ...
            ]
        },
        ...
    "count": 25,
    "hasMore": true,
    "limit": 25,
    "offset": 0,
    "links": [
        {
            "rel": "self",
            "href": "https://servername.fa.us2.oraclecloud.com/fscmRestApi/resources/11.13.18.05/invoices",
            "name": "invoices",
            "kind": "collection"
        },
        {
            "rel": "action",
            "href": "https://servername.fa.us2.oraclecloud.com/fscmRestApi/resources/11.13.18.05/invoices/action/cancelInvoice",
            "name": "cancelInvoice",
            "kind": "other"
        },
        ...
    ]
}
 ```
2. "SAP" invoices `/invoices`
{
  "invoice": {
    "header": {
      "invoice_number": "INV-12345",
      "date": "2023-11-15",
      "due_date": "2023-12-15",
      "vendor": {
        "name": "Vendor Name",
        "address": "Vendor Address",
        "tax_id": "TAX123456789"
      },
      "customer": {
        "name": "Customer Name",
        "address": "Customer Address",
        "purchase_order": "PO-67890"
      }
    },
    "items": [
      {
        "item_number": "001",
        "description": "Product/Service Description",
        "quantity": 1,
        "unit_price": 100.00,
        "tax_rate": 18.00,
        "amount": 118.00
      }
    ],
    "totals": {
      "subtotal": 100.00,
      "tax": 18.00,
      "total": 118.00,
      "currency": "INR"
    },
    "payment": {
      "bank_details": {
        "account_name": "Vendor Account Name",
        "account_number": "1234567890",
        "bank_name": "Bank Name",
        "ifsc_code": "IFSC1234567"
      }
    },
    "sap_data": {
      "document_type": "R1",
      "company_code": "1000",
      "fiscal_year": "2023",
      "posting_date": "2023-11-15"
    }
  }
}
---

1. "Oracle" Get all payment terms headers `/fscmRestApi/resources/11.13.18.05/payablesPaymentTerms`
 - no request body
 - example response:
 ```json
 {
    "required":[
        "count",
        "hasMore",
        "limit",
        "links",
        "offset"
    ],
    "type":"object",
    "properties":{
        "totalResults":{
            "type":"integer",
            "description":"The estimated row count when \"?totalResults=true\", otherwise the count is not included."
        },
        "offset":{
            "type":"integer",
            "description":"The offset value used in the current page."
        },
        "count":{
            "type":"integer",
            "description":"The number of resource instances returned in the current range."
        },
        "hasMore":{
            "type":"boolean",
            "description":"Indicates whether more resources are available on the server than the subset returned in the response. If the value is true, then there are more resources to retrieve from the server. The default value is false."
        },
        "limit":{
            "type":"integer",
            "description":"The actual paging size used by the server."
        },
        "links":{
            "title":"Links",
            "type":"array",
            "description":"The link relations associated with the resource instance.",
            "items":{
                "$ref":"#/components/schemas/link"
            }
        },
        "items":{
            "title":"Items",
            "type":"array",
            "description":"The items in the collection.",
            "items":{
                "$ref":"#/components/schemas/payablesPaymentTerms-item-response"
            }
        }
    },
    "x-hints":{
        "usage":"BusinessObject"
    }
}
 ```

2. "SAP" payment terms `/payment-terms`
{
  "payment_terms": [
    {
      "payment_term_code": "0001",
      "description": "Immediate Payment",
      "net_days": 0,
      "discount_days": 0,
      "discount_percent": 0.0,
      "fixed_day": null,
      "monthly_terms": false
    },
    {
      "payment_term_code": "0002",
      "description": "Net 15 Days",
      "net_days": 15,
      "discount_days": 10,
      "discount_percent": 2.0,
      "fixed_day": null,
      "monthly_terms": false
    },
    {
      "payment_term_code": "0003",
      "description": "Net 30 Days",
      "net_days": 30,
      "discount_days": 15,
      "discount_percent": 2.0,
      "fixed_day": null,
      "monthly_terms": false
    },
    {
      "payment_term_code": "0004",
      "description": "End of Month",
      "net_days": null,
      "discount_days": null,
      "discount_percent": null,
      "fixed_day": 31,
      "monthly_terms": true
    }
  ],
  "count": 4,
  "links": [
    {
      "rel": "self",
      "href": "/api/v1/payment-terms",
      "method": "GET"
    },
    {
      "rel": "create",
      "href": "/api/v1/payment-terms",
      "method": "POST"
    }
  ]
}
---

1. "Oracle" Get job details `/fscmRestApi/resources/11.13.18.05/erpintegrations/{OperationName}`
 - no request body
 - example response:
 ```json
 {
  "items": [
    {
      "OperationName": "downloadESSJobExecutionDetails",
      "DocumentId": null,
      "DocumentContent": "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",
      "FileName": null,
      "ContentType": null,
      "FileType": "ALL",
      "DocumentAccount": null,
      "Comments": null,
      "ProcessName": null,
      "LoadRequestId": null,
      "JobPackageName": null,
      "JobDefName": null,
      "ReqstId": "14557",
      "RequestStatus": null,
      "JobName": null,
      "ParameterList": null,
      "NotificationCode": null,
      "CallbackURL": null,
      "JobOptions": null,
      "StatusCode": null,
      "ESSParameters": null,
      "links": [
        {
          "rel": "self",
          "href": "https://servername.fa.us2.oraclecloud.com/fscmRestApi/resources/11.13.18.05/erpintegrations/downloadESSJobExecutionDetails",
          "name": "erpintegrations",
          "kind": "item"
        },
        {
          "rel": "canonical",
          "href": "https://servername.fa.us2.oraclecloud.com/fscmRestApi/resources/11.13.18.05/erpintegrations/downloadESSJobExecutionDetails",
          "name": "erpintegrations",
          "kind": "item"
        }
      ]
    }
  ],
  "count": 1,
  "hasMore": false,
  "limit": 25,
  "offset": 0,
  "links": [
    {
      "rel": "self",
      "href": "https://servername.fa.us2.oraclecloud.com/fscmRestApi/resources/11.13.18.05/erpintegrations",
      "name": "erpintegrations",
      "kind": "collection"
    }
  ]
}
```

2. "SAP" `/bulk/jobs`
 {
  "jobs": [
    {
      "job_id": "JOB_12345",
      "name": "INVOICE_PROCESSING",
      "description": "Monthly invoice batch processing",
      "status": "COMPLETED",
      "start_time": "2023-11-15T08:00:00Z",
      "end_time": "2023-11-15T08:15:30Z",
      "created_by": "SYSTEM_ADMIN",
      "priority": "MEDIUM",
      "type": "BATCH",
      "parameters": {
        "accounting_period": "2023-11",
        "company_code": "1000"
      },
      "results": {
        "processed_records": 1250,
        "successful": 1245,
        "failed": 5,
        "error_log": "/logs/JOB_12345_errors.log"
      },
      "links": [
        {
          "rel": "self",
          "href": "/api/v1/jobs/JOB_12345",
          "method": "GET"
        },
        {
          "rel": "logs",
          "href": "/api/v1/jobs/JOB_12345/logs",
          "method": "GET"
        }
      ]
    },
    {
      "job_id": "JOB_67890",
      "name": "PAYMENT_RUN",
      "description": "Vendor payment processing",
      "status": "RUNNING",
      "start_time": "2023-11-15T09:00:00Z",
      "end_time": null,
      "created_by": "FINANCE_USER",
      "priority": "HIGH",
      "type": "ONLINE",
      "parameters": {
        "payment_date": "2023-11-16",
        "payment_method": "BANK_TRANSFER"
      },
      "results": {
        "processed_records": 350,
        "successful": 350,
        "failed": 0,
        "error_log": null
      },
      "links": [
        {
          "rel": "self",
          "href": "/api/v1/jobs/JOB_67890",
          "method": "GET"
        },
        {
          "rel": "cancel",
          "href": "/api/v1/jobs/JOB_67890",
          "method": "DELETE"
        }
      ]
    }
  ],
  "count": 2,
  "has_more": false,
  "links": [
    {
      "rel": "self",
      "href": "/api/v1/jobs",
      "method": "GET"
    },
    {
      "rel": "create",
      "href": "/api/v1/jobs",
      "method": "POST"
    }
  ]
}