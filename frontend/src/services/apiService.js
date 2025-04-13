import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const apiService = {
  // Check API compatibility between ERP schemas
  checkApiCompatibility: async (erpName, erpSchema) => {
    try {
      const response = await axios.post(`${API_URL}/check-api-compatibility/`, {
        erp_name: erpName,
        erp_schema: erpSchema
      });
      return response.data;
    } catch (error) {
      console.error('API compatibility check failed:', error);
      throw error;
    }
  },

  // Predict potential integration issues
  predictIntegrationIssues: async (erpName, erpSchema) => {
    try {
      const response = await axios.post(`${API_URL}/predict-integration-issues/`, {
        erp_name: erpName,
        erp_schema: erpSchema
      });
      return response.data;
    } catch (error) {
      console.error('Integration issues prediction failed:', error);
      throw error;
    }
  },

  // Process schema changes
  processSchemaChange: async (erpSchema) => {
    try {
      const response = await axios.post(`${API_URL}/process-schema-change/`, {
        erp_schema: erpSchema
      });
      return response.data;
    } catch (error) {
      console.error('Schema change processing failed:', error);
      throw error;
    }
  },

  // Map invoice data (already implemented in ApiTesting.jsx)
  mapInvoice: async (source, data, version = 'v1') => {
    try {
      const response = await axios.post(`${API_URL}/map-invoice/?version=${version}`, {
        source,
        data
      });
      return response.data;
    } catch (error) {
      console.error('Invoice mapping failed:', error);
      throw error;
    }
  },

  // Map payment terms (already implemented in ApiTesting.jsx)
  mapPaymentTerms: async (source, data) => {
    try {
      const response = await axios.post(`${API_URL}/map-payment-terms/`, {
        source,
        data
      });
      return response.data;
    } catch (error) {
      console.error('Payment terms mapping failed:', error);
      throw error;
    }
  },

  // Map job schema (already implemented in ApiTesting.jsx)
  mapJobSchema: async (source, data) => {
    try {
      const response = await axios.post(`${API_URL}/map-job-schema/`, {
        source,
        data
      });
      return response.data;
    } catch (error) {
      console.error('Job schema mapping failed:', error);
      throw error;
    }
  }
};