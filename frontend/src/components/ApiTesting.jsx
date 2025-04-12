import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowRightLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  FileText,
  ArrowLeft
} from "lucide-react";
import { sampleData } from "../utils/sampleData";

export default function ApiTesting() {
  const navigate = useNavigate();
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [source, setSource] = useState("Oracle");
  const [apiType, setApiType] = useState("invoice");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const apiEndpoints = {
    invoice: "/map-invoice/",
    payment: "/map-payment-terms/",
    job: "/map-job-schema/",
    schema: "/process-schema-change/"
  };

  const apiLabels = {
    invoice: "Invoice Standardization",
    payment: "Payment Terms Standardization",
    job: "Job Schema Standardization",
    schema: "Process Schema Change"
  };

  const sources = ["Oracle", "SAP", "Microsoft Dynamics", "NetSuite", "Workday"];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Validate JSON input
      const parsedInput = JSON.parse(inputJson);
      
      // Prepare request body based on API type
      let requestBody;
      if (apiType === "schema") {
        requestBody = { erp_schema: parsedInput };
      } else {
        requestBody = { source, data: parsedInput };
      }
      
      // Make API request using axios instead of fetch with CORS configuration
      const response = await axios.post(
        `http://localhost:8000${apiEndpoints[apiType]}`, 
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // Add CORS configuration
          withCredentials: false
        }
      );
      
      // Axios automatically throws errors for non-2xx responses
      // and parses JSON responses, so we can directly use response.data
      const data = response.data;
      
      // Extract the standardized data based on API type
      let standardizedData;
      if (apiType === "invoice") {
        standardizedData = data.standardized_invoice;
      } else if (apiType === "payment") {
        standardizedData = data.standardized_payment_terms;
      } else if (apiType === "job") {
        standardizedData = data.standardized_job;
      } else {
        standardizedData = data.updated_schema;
      }
      
      setOutputJson(JSON.stringify(standardizedData, null, 2));
      setSuccess(true);
    } catch (err) {
      // Handle axios errors
      const errorMessage = err.response?.data?.detail || err.message || "Failed to process request";
      setError(errorMessage);
      setOutputJson("");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, 2));
    } catch (err) {
        console.log(err);
      setError("Invalid JSON format");
    }
  };

  const loadSampleData = () => {
    if (apiType === "schema") {
      setInputJson(JSON.stringify(sampleData[apiType], null, 2));
    } else {
      setInputJson(JSON.stringify(sampleData[apiType][source], null, 2));
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 w-full sticky top-0 z-10 border-b border-slate-200">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-800 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-slate-800">API Testing Tool</h1>
          </div>
        </div>
      </header>

      <div className="bg-white shadow-sm p-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-slate-600">
            Convert ERP data to standardized format using our AI-powered API
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-full">
          {/* Left Panel - Input */}
          <div className="w-full md:w-1/2 flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="flex items-center gap-2 bg-white border border-slate-300 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {apiLabels[apiType]}
                  {showOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {showOptions && (
                  <div className="absolute z-10 mt-1 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 border border-slate-200">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {Object.entries(apiLabels).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setApiType(key);
                            setShowOptions(false);
                          }}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            apiType === key ? "bg-orange-50 text-orange-700 font-medium" : "text-slate-700 hover:bg-slate-50"
                          }`}
                          role="menuitem"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {apiType !== "schema" && (
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {sources.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-800">Input JSON</h2>
              <div className="flex gap-3">
                <button
                  onClick={loadSampleData}
                  className="text-xs flex items-center gap-1 text-orange-600 hover:text-orange-700 transition-colors"
                >
                  <FileText size={14} />
                  Load Sample
                </button>
                <button
                  onClick={formatJson}
                  className="text-xs text-orange-600 hover:text-orange-700 transition-colors"
                >
                  Format JSON
                </button>
              </div>
            </div>

            <div className="relative flex-grow mb-4">
              <textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                className="w-full h-full min-h-[300px] p-3 border border-slate-300 rounded-md font-mono text-sm resize-none bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder={`Paste your ${apiType} JSON here...`}
              />
              <button
                onClick={() => copyToClipboard(inputJson)}
                className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
                title="Copy to clipboard"
              >
                <Copy size={16} />
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !inputJson.trim()}
              className="flex items-center justify-center gap-2 w-full rounded-md bg-orange-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowRightLeft className="h-4 w-4" />
                  Standardize
                </>
              )}
            </button>
          </div>

          {/* Right Panel - Output */}
          <div className="w-full md:w-1/2 flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-800">Standardized Output</h2>
              {outputJson && (
                <button
                  onClick={() => copyToClipboard(outputJson)}
                  className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
                >
                  <Copy size={14} /> Copy
                </button>
              )}
            </div>

            <div className="relative flex-grow bg-slate-50 border border-slate-300 rounded-md p-3 overflow-auto min-h-[300px]">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 text-orange-600 animate-spin mb-2" />
                    <p className="text-sm text-slate-600">Processing your request...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center text-center">
                    <AlertCircle className="h-8 w-8 text-red-600 mb-2" />
                    <p className="text-sm font-medium text-red-600 mb-1">Error</p>
                    <p className="text-sm text-slate-600">{error}</p>
                  </div>
                </div>
              ) : success ? (
                <pre className="font-mono text-sm whitespace-pre-wrap text-slate-800 h-full">
                  {outputJson}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center text-center">
                    <ArrowRightLeft className="h-8 w-8 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500">
                      Enter your JSON input and click "Standardize" to see the result
                    </p>
                  </div>
                </div>
              )}
            </div>

            {success && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium text-green-700">
                  Successfully standardized {apiType} data
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}