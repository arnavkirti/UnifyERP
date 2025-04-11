from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv
from langchain.document_loaders import TextLoader
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from apscheduler.schedulers.background import BackgroundScheduler
from langchain_core.documents import Document
import json

app = FastAPI()
load_dotenv()

# =========================== CONFIG ===========================
VECTORSTORE_PATH = "../backend/ERP/Universal_schema/schemas/vectorstore/invoice_schema"
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

# =========================== UNIVERSAL SCHEMA HANDLING (MOCK) ===========================
def get_universal_schema_for_invoice():
    loader = TextLoader("../backend/ERP/Universal_schema/schemas/invoice_schema.json")
    docs = loader.load()
    return{
        docs
    }

# def update_universal_schema_in_db(updated_schema):

# =========================== SCHEMA UPDATE LOGIC (MOCK) ===========================
def handle_erp_schema_change(erp_name, erp_schema_data):
    """Handles schema changes from a specific ERP."""
    universal_schema = get_universal_schema_from_db()
    llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash-lite-preview-02-05', temperature=0.5)
    prompt = f"""
    {erp_name} Schema Change: {json.dumps(erp_schema_data)}
    Current Universal Schema: {json.dumps(universal_schema)}
    Propose changes to the universal schema to accommodate the {erp_name} schema changes. Respond with ONLY valid JSON.
    """
    proposed_changes = llm.invoke(prompt).content
    try:
        proposed_changes_json = json.loads(proposed_changes)
    except:
        proposed_changes_json = extract_json_from_response(proposed_changes)

    # Human review and approval (implement this part).
    approved_changes = proposed_changes_json # bypassing human review for mock purposes.

    update_universal_schema_in_db(approved_changes)
    regenerate_vector_stores()

def regenerate_vector_stores():
    """Regenerates all relevant vector stores."""
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

    invoice_schema = get_universal_schema_from_db() # get the now updated universal schema
    docs_invoice = [Document(page_content=json.dumps(invoice_schema, indent=2))]
    vectorstore_invoice = FAISS.from_documents(docs_invoice, embeddings)
    vectorstore_invoice.save_local(VECTORSTORE_PATH)

    payment_terms_schema = get_universal_schema_from_db() # Assuming same universal schema for all, adjust if needed
    docs_payment_terms = [Document(page_content=json.dumps(payment_terms_schema, indent=2))]
    vectorstore_payment_terms = FAISS.from_documents(docs_payment_terms, embeddings)
    vectorstore_payment_terms.save_local("../backend/ERP/Universal_schema/schemas/vectorstore/payment_schema")

    job_schema = get_universal_schema_from_db() # Assuming same universal schema for all, adjust if needed
    docs_job = [Document(page_content=json.dumps(job_schema, indent=2))]
    vectorstore_job = FAISS.from_documents(docs_job, embeddings)
    vectorstore_job.save_local("../backend/ERP/Universal_schema/schemas/vectorstore/job_schema")

    print("✅ Vector stores regenerated (mock).")

# =========================== MOCK ERP SCHEMA CHANGES ===========================
MOCK_ORACLE_SCHEMA_UPDATE = {
    "invoiceNumber": "string",
    "customerID": "string",
    "newField": "integer",
    "items": [{"productName": "string", "quantity": "integer", "price": "number"}]
}

MOCK_SAP_SCHEMA_UPDATE = {
    "invoiceId": "string",
    "customerNumber": "string",
    "orderLines": [{"product": "string", "qty": "integer", "unitPrice": "number"}]
}

# =========================== SCHEDULED UPDATE (MOCK) ===========================
def scheduled_schema_update():
    """Mock scheduled schema update."""
    handle_erp_schema_change("Oracle", MOCK_ORACLE_SCHEMA_UPDATE)
    handle_erp_schema_change("SAP", MOCK_SAP_SCHEMA_UPDATE)

scheduler = BackgroundScheduler()
scheduler.add_job(scheduled_schema_update, trigger="interval", hours=24)
scheduler.start()

# =========================== LOAD VECTORS ===========================
try:
    invoice_vector_db = FAISS.load_local(
        VECTORSTORE_PATH,
        embeddings,
        allow_dangerous_deserialization=True
    )
    payment_terms_vector_db = FAISS.load_local(
        "../backend/ERP/Universal_schema/schemas/vectorstore/payment_schema",
        embeddings,
        allow_dangerous_deserialization=True
    )
    job_schema_vector_db = FAISS.load_local(
        "../backend/ERP/Universal_schema/schemas/vectorstore/job_schema",
        embeddings,
        allow_dangerous_deserialization=True
    )
    invoice_retriever = invoice_vector_db.as_retriever()
    payment_terms_retriever = payment_terms_vector_db.as_retriever()
    job_retriever = job_schema_vector_db.as_retriever()
except Exception as e:
    raise RuntimeError(f"Failed to load vector store: {str(e)}")

# =========================== PROMPT + LLM ===========================
template = """You are a smart data mapper.
Given a JSON response from {source} system and the schema doc below,
convert the input into the standard format. Respond with ONLY valid JSON, no explanations, markdown, or formatting.

Schema Doc:
{context}

Input JSON:
{input_json}

Mapped JSON (Only valid JSON below, no extra text):
"""

prompt = PromptTemplate(
    input_variables=["source", "input_json", "context"],
    template=template
)

llm = ChatGoogleGenerativeAI(
    model='gemini-2.0-flash-lite-preview-02-05',
    temperature=0.5
)

chain = LLMChain(llm=llm, prompt=prompt)

# =========================== DATA MODELS ===========================
class InvoiceData(BaseModel):
    source: str
    data: dict
class PaymentTermsData(BaseModel):
    source: str
    data: dict
class JobData(BaseModel):
    source: str
    data: dict
class StandardizedPaymentTerms(BaseModel):
    standardized_payment_terms: dict
class StandardizedInvoice(BaseModel):
    standardized_invoice: dict
class StandardizedJob(BaseModel):
    standardized_job: dict

# =========================== ENDPOINTS ===========================
@app.post("/map-invoice/", response_model=StandardizedInvoice)
async def map_invoice(invoice_data: InvoiceData):
    try:
        source = invoice_data.source
        input_json = json.dumps(invoice_data.data, indent=2)
        docs = invoice_retriever.get_relevant_documents("invoice schema")
        context = "\n\n".join([doc.page_content for doc in docs])
        response = chain.run({
            "source": source,
            "input_json": input_json,
            "context": context
        })
        parsed_response = json.loads(response) if is_valid_json(response) else extract_json_from_response(response)
        return {"standardized_invoice": parsed_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.post("/map-payment-terms/", response_model=StandardizedPaymentTerms)
async def map_payment_terms(payment_terms_data: PaymentTermsData):
    try:
        source = payment_terms_data.source
        input_json = json.dumps(payment_terms_data.data, indent=2)
        docs = payment_terms_retriever.get_relevant_documents("payment terms schema")
        context = "\n\n".join([doc.page_content for doc in docs])
        response = chain.run({
            "source": source,
            "input_json": input_json,
            "context": context
        })
        parsed_response = json.loads(response) if is_valid_json(response) else extract_json_from_response(response)
        return {"standardized_payment_terms": parsed_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.post("/map-job-schema/", response_model=StandardizedJob)
async def map_job_schema(job_data: JobData):
    try:
        source = job_data.source
        input_json = json.dumps(job_data.data, indent=2)
        docs = job_retriever.get_relevant_documents("job schema")
        context = "\n\n".join([doc.page_content for doc in docs])
        response = chain.run({
            "source": source,
            "input_json": input_json,
            "context": context
        })
        parsed_response = json.loads(response) if is_valid_json(response) else extract_json_from_response(response)
        return {"standardized_job": parsed_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def extract_json_from_response(text: str) -> dict:
    start = text.find('{')
    if start == -1:
        raise ValueError("No opening brace found.")
    bracket_count = 0
    for i in range(start, len(text)):
        if text[i] == '{':
            bracket_count += 1
        elif text[i] == '}':
            bracket_count -= 1
            if bracket_count == 0:
                try:
                    json_str = text[start:i + 1]
                    return json.loads(json_str)
                except json.JSONDecodeError as e:
                    raise ValueError(f"Failed to parse JSON: {str(e)}")
    raise ValueError("No complete JSON object found.")

def is_valid_json(myjson):
  try:
    json.loads(myjson)
  except ValueError:
    return False
  return True