import { useState, useEffect } from 'react';
import { FileText, Code, Server, Book, Search, Copy, Check, ExternalLink } from 'lucide-react';
import axios from 'axios';

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('introduction');
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [swaggerData, setSwaggerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Copy code to clipboard
  const copyCode = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // API endpoints data
  const apiEndpoints = [
    {
      method: 'POST',
      path: '/map-invoice/',
      description: 'Convert invoice data to standardized format',
      request: {
        source: 'string', // Source ERP system (e.g., "SAP", "Oracle")
        data: {
          invoice: {
            header: {
              invoice_number: "INV-12345",
              date: "2023-11-15",
              due_date: "2023-12-15",
              vendor: {
                name: "Vendor Name",
                address: "Vendor Address",
                tax_id: "TAX123456789"
              },
              customer: {
                name: "Customer Name",
                address: "Customer Address",
                purchase_order: "PO-67890"
              }
            },
            items: [
              {
                item_number: "001",
                description: "Product/Service Description",
                quantity: 1,
                unit_price: 100.00,
                tax_rate: 18.00,
                amount: 118.00
              }
            ],
            totals: {
              subtotal: 100.00,
              tax: 18.00,
              total: 118.00,
              currency: "INR"
            },
            payment: {
              bank_details: {
                account_name: "Vendor Account Name",
                account_number: "1234567890",
                bank_name: "Bank Name",
                ifsc_code: "IFSC1234567"
              }
            }
          }
        }
      },
      response: {
        standardized_invoice: {} // Invoice data in the standardized format
      },
      queryParams: {
        version: 'string (optional) - Specifies the version of the universal schema to use ("v1" or "v2"). Default is "v2".'
      }
    },
    {
      method: 'POST',
      path: '/map-payment-terms/',
      description: 'Standardize payment terms data',
      request: {
        source: 'string', // Source ERP system
        data: {
          payment_terms: [
            {
              payment_term_code: "0001",
              description: "Immediate Payment",
              net_days: 0,
              discount_days: 0,
              discount_percent: 0.0,
              fixed_day: null,
              monthly_terms: false
            }
          ]
        }
      },
      response: {
        standardized_payment_terms: {} // Payment terms data in the standardized format
      }
    },
    {
      method: 'POST',
      path: '/map-job-schema/',
      description: 'Convert job schema data to standardized format',
      request: {
        source: 'string', // Source ERP system
        data: {
          jobs: [
            {
              job_id: "JOB_12345",
              name: "INVOICE_PROCESSING",
              description: "Monthly invoice batch processing",
              status: "COMPLETED",
              start_time: "2023-11-15T08:00:00Z",
              end_time: "2023-11-15T08:15:30Z",
              created_by: "SYSTEM_ADMIN",
              priority: "MEDIUM",
              type: "BATCH",
              parameters: {
                accounting_period: "2023-11",
                company_code: "1000"
              },
              results: {
                processed_records: 1250,
                successful: 1245,
                failed: 5,
                error_log: "/logs/JOB_12345_errors.log"
              },
              links: [
                {
                  rel: "self",
                  href: "/api/v1/jobs/JOB_12345",
                  method: "GET"
                },
                {
                  rel: "logs",
                  href: "/api/v1/jobs/JOB_12345/logs",
                  method: "GET"
                }
              ]
            }
          ]
        }
      },
      response: {
        standardized_job: {} // Job schema data in the standardized format
      }
    },
    {
      method: 'POST',
      path: '/check-api-compatibility/',
      description: 'Check compatibility of ERP schema with universal schema',
      request: {
        erp_name: 'string', // Name of the ERP system
        erp_schema: {}    // ERP schema data
      },
      response: {
        // Compatibility assessment results
      }
    },
    {
      method: 'POST',
      path: '/process-schema-change/',
      description: 'Process schema change and update universal schema',
      request: {
        erp_schema: {} // ERP schema data
      },
      response: {
        updated_schema: {} // The updated universal schema
      }
    }
  ];

  // Filter endpoints based on search
  const filteredEndpoints = apiEndpoints.filter(endpoint =>
    endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    endpoint.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Data models
  const dataModels = [
    { name: 'InvoiceData', fields: 'source (string), data (dict)' },
    { name: 'PaymentTermsData', fields: 'source (string), data (dict)' },
    { name: 'JobData', fields: 'source (string), data (dict)' },
    { name: 'StandardizedInvoice', fields: 'standardized_invoice (dict)' },
    { name: 'StandardizedPaymentTerms', fields: 'standardized_payment_terms (dict)' },
    { name: 'StandardizedJob', fields: 'standardized_job (dict)' },
    { name: 'CompatibilityRequest', fields: 'erp_name (str), erp_schema (dict)' },
    { name: 'SchemaChangeRequest', fields: 'erp_schema (dict)' }
  ];

  // Fetch Swagger documentation when the swagger tab is selected
  useEffect(() => {
    if (activeTab === 'swagger' && !swaggerData) {
      fetchSwaggerDocs();
    }
  }, [activeTab]);

  const fetchSwaggerDocs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/openapi.json');
      setSwaggerData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load Swagger documentation. Make sure your FastAPI backend is running.');
      setLoading(false);
    }
  };

  const renderSwaggerEndpoints = () => {
    if (!swaggerData?.paths) return null;
    return (
      <div className="space-y-6 flex flex-wrap" >
        {Object.entries(swaggerData.paths).map(([path, methods]) => (
          <div key={path} className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 p-6 border-b">
              <h3 className="font-mono text-lg">{path}</h3>
            </div>
            <div className="divide-y">
              {Object.entries(methods).map(([method, details]) => (
                <div key={method} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                      method === 'post' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {method.toUpperCase()}
                    </span>
                    <h4 className="font-semibold">{details.summary}</h4>
                  </div>
                  <p className="text-gray-700 mb-4">{details.description}</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Request</h5>
                      <div className="relative bg-gray-50 rounded-lg border p-4">
                        <pre className="text-sm overflow-x-auto">
                          {JSON.stringify(details.requestBody?.content || {}, null, 2)}
                        </pre>
                        <button
                          onClick={() => copyCode(JSON.stringify(details.requestBody?.content || {}, null, 2), `req-${path}`)}
                          className="absolute top-3 right-3 p-1.5 rounded-md bg-white border hover:bg-gray-100"
                        >
                          {copiedId === `req-${path}` ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Response</h5>
                      <div className="relative bg-gray-50 rounded-lg border p-4">
                        <pre className="text-sm overflow-x-auto">
                          {JSON.stringify(details.responses?.['200']?.content || {}, null, 2)}
                        </pre>
                        <button
                          onClick={() => copyCode(JSON.stringify(details.responses?.['200']?.content || {}, null, 2), `res-${path}`)}
                          className="absolute top-3 right-3 p-1.5 rounded-md bg-white border hover:bg-gray-100"
                        >
                          {copiedId === `res-${path}` ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 w-full flex flex-wrap">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm p-6 border-b w-full flex flex-wrap">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">ERP API</span> Integration Documentation
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 p-6 hidden md:block sticky top-20 h-[calc(100vh-80px)] overflow-y-auto border-r">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('introduction')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg ${
                activeTab === 'introduction' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <span className="font-medium">Introduction</span>
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg ${
                activeTab === 'features' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <span className="font-medium">Features</span>
            </button>
            <button
              onClick={() => setActiveTab('getting-started')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg ${
                activeTab === 'getting-started' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <span className="font-medium">Getting Started</span>
            </button>
            <button
              onClick={() => setActiveTab('api-endpoints')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg ${
                activeTab === 'api-endpoints' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <FileText size={18} className="text-blue-500" />
              <span className="font-medium">API Endpoints</span>
            </button>
            <button
              onClick={() => setActiveTab('data-models')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg ${
                activeTab === 'data-models' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <Code size={18} className="text-blue-500" />
              <span className="font-medium">Data Models</span>
            </button>
            <button
              onClick={() => setActiveTab('swagger')}
              className={`flex items-center  gap-3 w-full text-left px-4 py-3 rounded-lg ${
                activeTab === 'swagger' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <Server size={18} className="text-blue-500" />
              <span className="font-medium">Swagger UI</span>
            </button>
            <button
              onClick={() => setActiveTab('using-docs')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg bg-white ${
                activeTab === 'using-docs' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <Book size={18} className="text-blue-500" />
              <span className="font-medium">Using the Documentation</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex w-full flex-wrap p-8">
          {activeTab === 'introduction' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Introduction</h2>
              <div className="prose max-w-none">
                <p>
                  Enterprise Resource Planning (ERP) systems are crucial for managing various business functions. 
                  However, integrating APIs with ERP systems can be challenging due to their complexity and lack 
                  of standardization. This project aims to simplify ERP API integration by providing a standardized 
                  API framework and tools for efficient data mapping and management.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Features</h2>
              <ul className="space-y-4 list-disc pl-6">
                <li><strong>Standardized API Framework:</strong> Consistent interface for different ERP systems</li>
                <li><strong>Automated Data Mapping:</strong> Tools for mapping between ERP formats and universal schema</li>
                <li><strong>Robust Security:</strong> Protection for sensitive business data</li>
                <li><strong>Scalable Architecture:</strong> Handles high transaction volumes</li>
                <li><strong>Dynamic Maintenance:</strong> Adapts to evolving ERP systems</li>
                <li><strong>Comprehensive Documentation:</strong> Detailed endpoint and usage information</li>
                <li><strong>LLM Integration:</strong> For compatibility assessment and schema suggestions</li>
                <li><strong>Vector Database:</strong> Efficient schema storage with FAISS</li>
                <li><strong>Swagger UI:</strong> Interactive API documentation</li>
                <li><strong>Search Functionality:</strong> Easy navigation of documentation</li>
                <li><strong>Code Examples:</strong> For requests and responses</li>
              </ul>
            </div>
          )}

          {activeTab === 'getting-started' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Getting Started</h2>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Prerequisites</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Node.js and npm (for the documentation website)</li>
                  <li>Python 3.x</li>
                  <li>FastAPI</li>
                  <li>Langchain</li>
                  <li>Uvicorn (ASGI server)</li>
                  <li>FAISS (for vector database)</li>
                  <li>Other Python dependencies (see requirements.txt)</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Installation</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Clone the repository:</h4>
                    <div className="relative bg-gray-50 rounded-lg border p-4">
                      <pre className="text-sm overflow-x-auto">git clone &lt;repository_url&gt;\ncd &lt;project_directory&gt;</pre>
                      <button
                        onClick={() => copyCode('git clone <repository_url>\ncd backend_py', 'clone')}
                        className="absolute top-3 right-3 p-1.5 rounded-md bg-white border hover:bg-gray-100"
                      >
                        {copiedId === 'clone' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Install Python dependencies:</h4>
                    <div className="relative bg-gray-50 rounded-lg border p-4">
                      <pre className="text-sm overflow-x-auto">pip install -r requirements.txt</pre>
                      <button
                        onClick={() => copyCode('pip install -r requirements.txt', 'pip-install')}
                        className="absolute top-3 right-3 p-1.5 rounded-md bg-white border hover:bg-gray-100"
                      >
                        {copiedId === 'pip-install' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Install Node.js dependencies:</h4>
                    <div className="relative bg-gray-50 rounded-lg border p-4">
                      <pre className="text-sm overflow-x-auto">cd docs\nnpm install</pre>
                      <button
                        onClick={() => copyCode('cd docs\nnpm install', 'npm-install')}
                        className="absolute top-3 right-3 p-1.5 rounded-md bg-white border hover:bg-gray-100"
                      >
                        {copiedId === 'npm-install' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Build the documentation website:</h4>
                    <div className="relative bg-gray-50 rounded-lg border p-4">
                      <pre className="text-sm overflow-x-auto">npm run build</pre>
                      <button
                        onClick={() => copyCode('npm run build', 'npm-build')}
                        className="absolute top-3 right-3 p-1.5 rounded-md bg-white border hover:bg-gray-100"
                      >
                        {copiedId === 'npm-build' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Running the API Backend</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Navigate to the API backend directory:</h4>
                    <div className="relative bg-gray-50 rounded-lg border p-4">
                      <pre className="text-sm overflow-x-auto">cd backend_py;</pre>
                      <button
                        onClick={() => copyCode('cd backend_py', 'cd-project')}
                        className="absolute top-3 right-3 p-1.5 rounded-md bg-white border hover:bg-gray-100"
                      >
                        {copiedId === 'cd-project' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Run the FastAPI application:</h4>
                    <div className="relative bg-gray-50 rounded-lg border p-4">
                      <pre className="text-sm overflow-x-auto">uvicorn main:app --reload --host 0.0.0.0 --port 8000</pre>
                      <button
                        onClick={() => copyCode('uvicorn main:app --reload --host 0.0.0.0 --port 8000', 'uvicorn')}
                        className="absolute top-3 right-3 p-1.5 rounded-md bg-white border hover:bg-gray-100"
                      >
                        {copiedId === 'uvicorn' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                      </button>
                    </div>
                  </div>
                  <div className="prose max-w-none">
                    <p><strong>Parameters:</strong></p>
                    <ul>
                      <li><code>main:app</code>: Specifies the Python module (main) and the FastAPI application object (app)</li>
                      <li><code>--reload</code>: Enables automatic reloading of the server on code changes</li>
                      <li><code>--host 0.0.0.0</code>: Binds the server to all available network interfaces</li>
                      <li><code>--port 8000</code>: Runs the server on port 8000</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api-endpoints' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold">API Endpoints</h2>
              <p className="text-gray-600">This API provides the following endpoints:</p>

              {filteredEndpoints.map((endpoint, index) => (
                <div key={index} className="border rounded-xl overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 rounded-md text-sm font-medium ${
                        endpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-base">{endpoint.path}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-4 text-sm">{endpoint.description}</p>                                        
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3">Request</h4>
                        <div className="relative bg-gray-50 rounded-lg border p-4">
                          <pre className="text-sm overflow-x-auto">
                            {JSON.stringify(endpoint.request, null, 2)}
                          </pre>
                          <button
                            onClick={() => copyCode(JSON.stringify(endpoint.request, null, 2), `req-${index}`)}
                            className="absolute top-3 right-3 p-1.5 rounded-md bg-white border hover:bg-gray-100"
                          >
                            {copiedId === `req-${index}` ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Response</h4>
                        <div className="relative bg-gray-50 rounded-lg border p-4">
                          <pre className="text-sm overflow-x-auto">
                            {JSON.stringify(endpoint.response, null, 2)}
                          </pre>
                          <button
                            onClick={() => copyCode(JSON.stringify(endpoint.response, null, 2), `res-${index}`)}
                            className="absolute top-3 right-3 p-1.5 rounded-md bg-white border hover:bg-gray-100"
                          >
                            {copiedId === `res-${index}` ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                          </button>
                        </div>
                      </div>

                      {endpoint.queryParams && (
                        <div>
                          <h4 className="font-semibold mb-3">Query Parameters</h4>
                          <div className="bg-gray-50 rounded-lg border p-4">
                            <pre className="text-sm overflow-x-auto">
                              {JSON.stringify(endpoint.queryParams, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}

                      <div className="bg-blue-50 rounded-lg border-l-4 border-blue-400 p-4">
                        <h5 className="font-medium text-blue-800 mb-2">Usage Notes:</h5>
                        <ul className="list-disc pl-5 space-y-1 text-blue-700">
                          {endpoint.path === '/map-invoice/' && (
                            <>
                              <li>The <code>source</code> parameter is required to identify the ERP system</li>
                              <li>The <code>data</code> parameter should contain the invoice data in the source format</li>
                              <li>The response contains the invoice data mapped to the universal schema</li>
                              <li>The API uses a vector database to retrieve the relevant schema for mapping</li>
                            </>
                          )}
                          {endpoint.path === '/map-payment-terms/' && (
                            <li>Similar to the /map-invoice/ endpoint, this endpoint requires the source and data parameters</li>
                          )}
                          {endpoint.path === '/check-api-compatibility/' && (
                            <>
                              <li>Uses an LLM (Gemini) to compare the provided ERP schema with the universal schema</li>
                              <li>The response indicates the compatibility and suggests any necessary changes</li>
                            </>
                          )}
                          {endpoint.path === '/process-schema-change/' && (
                            <>
                              <li>Uses an LLM to determine the required updates to the universal schema</li>
                              <li>Regenerates the vector stores to reflect the schema changes</li>
                              <li>Intended to be used when an ERP system changes its schema</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'data-models' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Data Models</h2>
              <p className="text-gray-600">The API uses the following data models for requests and responses:</p>
              
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-6 border-b grid grid-cols-2">
                  <div className="font-semibold">Model Name</div>
                  <div className="font-semibold">Fields</div>
                </div>
                <div className="divide-y">
                  {dataModels.map((model, index) => (
                    <div key={index} className="grid grid-cols-2 p-6">
                      <div className="font-mono">{model.name}</div>
                      <div className="font-mono text-gray-700">{model.fields}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'swagger' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Swagger UI</h2>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Server size={20} className="text-blue-500" />
                  <span className="text-gray-700">Interactive API documentation</span>
                </div>
                
                <a 
                  href="http://localhost:8000/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <span>Open Swagger UI</span>
                  <ExternalLink size={16} />
                </a>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
                  <h3 className="font-semibold text-lg mb-2">Error Loading Swagger Documentation</h3>
                  <p>{error}</p>
                  <div className="mt-4 p-4 bg-white rounded-lg border border-red-100">
                    <p className="font-medium mb-2">Troubleshooting:</p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>Make sure your FastAPI backend is running at <code className="bg-red-50 px-1 py-0.5 rounded">http://localhost:8000</code></li>
                      <li>Check that CORS is properly configured on your backend</li>
                      <li>Try refreshing the page or clicking the button below</li>
                    </ol>
                    <button
                      onClick={fetchSwaggerDocs}
                      className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    >
                      Retry Connection
                    </button>
                  </div>
                </div>
              ) : swaggerData ? (
                renderSwaggerEndpoints()
              ) : (
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Server size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect to Swagger API</h3>
                      <p className="text-gray-700 mb-4">Click the button below to fetch Swagger documentation from your FastAPI backend:</p>
                      <button
                        onClick={fetchSwaggerDocs}
                        className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Fetch Swagger Documentation
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'using-docs' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Using the Documentation</h2>
              <div className="prose max-w-none">
                <p>
                  This documentation is designed to help developers understand how to use the API. 
                  It provides information on each endpoint, including the request and response formats, and code examples.
                </p>
                
                <h3 className="text-xl font-semibold mt-6">Interactive Exploration</h3>
                <p>
                  The Swagger UI (available at <code>/docs</code> when the API is running) allows you to interact with the API directly, 
                  send requests, and view responses.
                </p>
                
                <h3 className="text-xl font-semibold mt-6">Search</h3>
                <p>
                  The documentation website includes a search feature to help you quickly find specific information.
                </p>
                
                <h3 className="text-xl font-semibold mt-6">Clear Examples</h3>
                <p>
                  Code examples are provided for each endpoint to illustrate how to make requests and handle responses.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t p-6 mt-8 w-full flex flex-wrap">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold">ERP API Integration Documentation</h3>
              <p className="text-sm text-gray-600">This project is licensed under the MIT License</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-600">For any questions or inquiries, please contact <a href="mailto:your_email@example.com" className="text-blue-600 hover:underline">your_email@example.com</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
