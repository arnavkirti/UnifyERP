import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import {
  ArrowRightLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  FileText,
  ArrowLeft,
  Shield,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { sampleData } from "../utils/sampleData";
import { apiService } from "../services/apiService";

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

//   const apiEndpoints = {
//     invoice: "/map-invoice/",
//     payment: "/map-payment-terms/",
//     job: "/map-job-schema/",
//     schema: "/process-schema-change/",
//     compatibility: "/check-api-compatibility/",
//     issues: "/predict-integration-issues/"
//   };

  const apiLabels = {
    invoice: "Invoice Standardization",
    payment: "Payment Terms Standardization",
    job: "Job Schema Standardization",
    schema: "Process Schema Change",
    compatibility: "Check API Compatibility",
    issues: "Predict Integration Issues"
  };

  const sources = ["Oracle", "SAP", "Microsoft Dynamics", "NetSuite", "Workday"];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Validate JSON input
      const parsedInput = JSON.parse(inputJson);
      let result;
      
      // Handle different API types
      switch(apiType) {
        case 'invoice':
          result = await apiService.mapInvoice(source, parsedInput);
          setOutputJson(JSON.stringify(result.standardized_invoice, null, 2));
          break;
        case 'payment':
          result = await apiService.mapPaymentTerms(source, parsedInput);
          setOutputJson(JSON.stringify(result.standardized_payment_terms, null, 2));
          break;
        case 'job':
          result = await apiService.mapJobSchema(source, parsedInput);
          setOutputJson(JSON.stringify(result.standardized_job, null, 2));
          break;
        case 'schema':
          result = await apiService.processSchemaChange(parsedInput);
          setOutputJson(JSON.stringify(result.updated_schema, null, 2));
          break;
        case 'compatibility':
          result = await apiService.checkApiCompatibility(source, parsedInput);
          setOutputJson(JSON.stringify(result, null, 2));
          break;
        case 'issues':
          result = await apiService.predictIntegrationIssues(source, parsedInput);
          setOutputJson(JSON.stringify(result, null, 2));
          break;
        default:
          throw new Error('Unknown API type');
      }
      
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
    } else if (apiType === "compatibility" || apiType === "issues") {
      // For compatibility and issues endpoints, we need schema data
      setInputJson(JSON.stringify(sampleData.schema, null, 2));
    } else {
      setInputJson(JSON.stringify(sampleData[apiType][source], null, 2));
    }
  };

  // Get the appropriate icon for the API type
  const getApiIcon = (type) => {
    switch(type) {
      case 'invoice':
      case 'payment':
      case 'job':
        return <ArrowRightLeft size={16} />;
      case 'schema':
        return <RefreshCw size={16} />;
      case 'compatibility':
        return <Shield size={16} />;
      case 'issues':
        return <AlertTriangle size={16} />;
      default:
        return <ArrowRightLeft size={16} />;
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
                  {getApiIcon(apiType)}
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
                          className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left ${
                            apiType === key ? "bg-orange-50 text-orange-700 font-medium" : "text-slate-700 hover:bg-slate-50"
                          }`}
                          role="menuitem"
                        >
                          {getApiIcon(key)}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {(apiType !== "schema" && apiType !== "compatibility" && apiType !== "issues") ? (
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
              ) : (
                apiType === "schema" ? null : (
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
                )
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
                  {getApiIcon(apiType)}
                  {apiType === 'compatibility' ? 'Check Compatibility' : 
                   apiType === 'issues' ? 'Predict Issues' : 
                   apiType === 'schema' ? 'Process Schema' : 'Standardize'}
                </>
              )}
            </button>
          </div>

          {/* Right Panel - Output */}
          <div className="w-full md:w-1/2 flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-800">
                {apiType === 'compatibility' ? 'Compatibility Results' : 
                 apiType === 'issues' ? 'Potential Issues' : 
                 apiType === 'schema' ? 'Updated Schema' : 'Standardized Output'}
              </h2>
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
                    {getApiIcon(apiType)}
                    <p className="text-sm text-slate-500 mt-2">
                      Enter your JSON input and click 
                      {apiType === 'compatibility' ? ' "Check Compatibility"' : 
                       apiType === 'issues' ? ' "Predict Issues"' : 
                       apiType === 'schema' ? ' "Process Schema"' : ' "Standardize"'} to see the result
                    </p>
                  </div>
                </div>
              )}
            </div>

            {success && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium text-green-700">
                  {apiType === 'compatibility' ? 'Successfully checked compatibility' : 
                   apiType === 'issues' ? 'Successfully predicted integration issues' : 
                   apiType === 'schema' ? 'Successfully processed schema change' : 
                   `Successfully standardized ${apiType} data`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}