from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chains.question_answering import load_qa_chain
import os
import json

app = FastAPI()
load_dotenv()

try:
    vector_db = FAISS.load_local(
        "../backend/ERP/Universal_schema/schemas/vectorstore/invoice_schema",
        GoogleGenerativeAIEmbeddings(model="models/embedding-001"),
        allow_dangerous_deserialization=True  # Only if you trust the source
    )
    retriever = vector_db.as_retriever()
except Exception as e:
    raise RuntimeError(f"Failed to load vector store: {str(e)}")

# Prompt Template
template = """You are a smart invoice data mapper.
Given a JSON response from {source} system and the schema doc below,
convert the input into the standard invoice format. Respond with ONLY the JSON.

Schema Doc:
{context}

Input JSON:
{input_json}

Mapped JSON:
"""


prompt = PromptTemplate(
    input_variables=["source", "input_json", "context"],
    template=template
)

llm = ChatGoogleGenerativeAI(
    model='gemini-2.0-flash-lite-preview-02-05',  
    temperature=0.5
)

qa_chain = load_qa_chain(
    llm,
    chain_type="stuff",
    prompt=prompt 
)

chain = LLMChain(
    llm=llm,
    prompt=prompt
)

class InvoiceData(BaseModel):
    source: str
    data: dict

class PaymentTermsData(BaseModel):
    source: str
    data: dict
    
class StandardizedPaymentTerms(BaseModel):
    standardized_payment_terms: dict

class StandardizedInvoice(BaseModel):
    standardized_invoice: dict


@app.post("/map-invoice/", response_model=StandardizedInvoice)
async def map_invoice(invoice_data: InvoiceData):
    try:
        source = invoice_data.source
        input_json = json.dumps(invoice_data.data, indent=2)

        # 🔍 Fetch relevant schema documentation from the vector DB
        docs = retriever.get_relevant_documents("invoice schema")
        context = "\n\n".join([doc.page_content for doc in docs])

        # 🧠 Run the LLM chain with the populated prompt
        response = chain.run({
            "source": source,
            "input_json": input_json,
            "context": context
        })

        try:
            parsed_response = json.loads(response)
        except json.JSONDecodeError:
            parsed_response = extract_json_from_response(response)

        return {"standardized_invoice": parsed_response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/map-payment-terms/", response_model=StandardizedPaymentTerms)
async def map_payment_terms(payment_terms_data: PaymentTermsData):
    try:
        source = payment_terms_data.source
        input_json = json.dumps(payment_terms_data.data, indent=2)

        # Retrieve relevant universal schema context from vector DB
        docs = retriever.get_relevant_documents("payment terms schema")
        context = "\n\n".join([doc.page_content for doc in docs])

        # Run the chain to map the data
        response = chain.run({
            "source": source,
            "input_json": input_json,
            "context": context
        })

        try:
            parsed_response = json.loads(response)
        except json.JSONDecodeError:
            parsed_response = extract_json_from_response(response)

        return {"standardized_payment_terms": parsed_response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def extract_json_from_response(text: str) -> dict:
    """Helper to extract JSON in case LLM adds extra words or formatting."""
    try:
        start = text.find('{')
        end = text.rfind('}') + 1
        if start != -1 and end > start:
            return json.loads(text[start:end])
        raise ValueError("No JSON found in response.")
    except Exception as e:
        raise ValueError(f"Failed to extract JSON from response: {str(e)}")
