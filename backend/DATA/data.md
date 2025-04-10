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
      "DocumentContent": "UEsDBBQACAgIADdT4VAAAAAAAAAAAAAAAAAJAAAAMTQ1NTcubG9n1VZNbxs3EL3vr5ijXbRaOW4aQEkDuLINbGBHC0mGjgbFnZVYU+FQnvxvIvcJAAC6TgAACQAAAAAAAAAAAAAAAAAbBwAAMTQ1NjMubG9nUEsFBgAAAAAFAAUAKQEAAEkRAAAAAA==",
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