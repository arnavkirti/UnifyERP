from langchain.prompts import PromptTemplate

api_compatibility_prompt = PromptTemplate(
    input_variables=["erp_name", "erp_json", "universal_schema"],
    template="""
You are an expert API compatibility evaluator.
Given:
- ERP Name: {erp_name}
- ERP Schema JSON: {erp_json}
- Universal Invoice Schema JSON: {universal_schema}

Determine whether the ERP schema is compatible with the universal schema.

Respond ONLY in **valid JSON format**, and include NO other text, comments, or explanation.

Your response MUST be a single JSON object containing these exact keys:  
"missing_fields", "extra_fields", "field_type_mismatches", "notes".

Respond with JSON only — do not include code blocks, markdown, or explanation.
"""
)

integration_issue_prompt = PromptTemplate(
    input_variables=["erp_name", "erp_json", "universal_schema"],
    template="""

Respond ONLY in valid JSON:
You are a predictive integration analyst.

Given:
- ERP System: {erp_name}
- Incoming ERP JSON Schema: {erp_json}
- Universal Invoice Schema: {universal_schema}

Predict possible issues during integration such as:
- Field type mismatches
- Missing critical fields
- Nested structure differences
- Potential mapping failures

and everything should be in short
"""
)
