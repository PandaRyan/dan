import os
import sys
import chromadb
import chromadb.utils.embedding_functions as embedding_functions
import uuid
from pathlib import Path
import argparse
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

#config
CHROMA_API_KEY = os.environ.get("CHROMA_API_KEY")
CHROMA_TENANT = os.environ.get("CHROMA_TENANT")
CHROMA_DATABASE = os.environ.get("CHROMA_DATABASE")
COLLECTION_NAME = "malaysia_subsidy_2026"

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")


google_ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(
    api_key=GOOGLE_API_KEY,
    task_type="RETRIEVAL_DOCUMENT"
)

#chroma cloud client
def get_chroma_client() -> chromadb.CloudClient:
    if not CHROMA_API_KEY:
        sys.exit(
            "ERROR: CHROMA_API_KEY not set."
        )
    return chromadb.CloudClient(
        api_key=CHROMA_API_KEY,
        tenant=CHROMA_TENANT,
        database=CHROMA_DATABASE,
    )
 
 
def get_collection(client: chromadb.CloudClient):
    """Get or create the subsidies collection."""
    return client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"},   # cosine similarity
        embedding_function=google_ef
    )

#chunking
MAX_LINES_PER_CHUNK = 60   # safety cap to avoid oversized chunks
CHUNK_OVERLAP = 1

 
def chunk_markdown(text: str) -> list[dict]:
    """
    Split markdown into chunks, one chunk per ### section.
    Returns list of {"text": str, "metadata": dict}.
    """
    chunks = []
    current_h1 = ""
    current_h2 = ""
    current_h3 = ""
    buffer: list[str] = []
 
    def flush(h1, h2, h3, lines):
        if not lines:
            return
        content = "\n".join(lines).strip()
        if not content:
            return
 
        # If section is very long, break into sub-windows
        if len(lines) > MAX_LINES_PER_CHUNK:
            step = MAX_LINES_PER_CHUNK - CHUNK_OVERLAP
            for i in range(0, len(lines), step):
                sub = lines[i : i + MAX_LINES_PER_CHUNK]
                sub_content = "\n".join(sub).strip()
                if sub_content:
                    chunks.append({
                        "text": sub_content,
                        "metadata": {
                            "h1": h1,
                            "h2": h2,
                            "h3": h3,
                            "section": f"{h2} > {h3}".strip(" >"),
                            "chunk_part": f"{i // step + 1}",
                        }
                    })
        else:
            chunks.append({
                "text": content,
                "metadata": {
                    "h1": h1,
                    "h2": h2,
                    "h3": h3,
                    "section": f"{h2} > {h3}".strip(" >"),
                }
            })
 
    for line in text.splitlines():
        if line.startswith("# ") and not line.startswith("## "):
            flush(current_h1, current_h2, current_h3, buffer)
            buffer = []
            current_h1 = line.lstrip("# ").strip()
            current_h2 = ""
            current_h3 = ""
 
        elif line.startswith("## ") and not line.startswith("### "):
            flush(current_h1, current_h2, current_h3, buffer)
            buffer = []
            current_h2 = line.lstrip("# ").strip()
            current_h3 = ""
 
        elif line.startswith("### "):
            flush(current_h1, current_h2, current_h3, buffer)
            buffer = []
            current_h3 = line.lstrip("# ").strip()
 
        buffer.append(line)
 
    flush(current_h1, current_h2, current_h3, buffer)
    return chunks

#ingest
def ingest(md_path: str, reset: bool = False):
    path = Path(md_path)
    if not path.exists():
        sys.exit(f"ERROR: File not found: {md_path}")
 
    print(f"Reading  → {path.name}")
    text = path.read_text(encoding="utf-8")
 
    print("Chunking ...")
    chunks = chunk_markdown(text)
    print(f"  {len(chunks)} chunks created")
 
    client = get_chroma_client()
    if reset:
        try:
            client.delete_collection(COLLECTION_NAME)
            print(f"  Deleted existing collection '{COLLECTION_NAME}'")
        except Exception:
            pass
 
    collection = get_collection(client)
    print(f"Upserting to Chroma Cloud collection '{COLLECTION_NAME}' ...")
 
    ids       = [str(uuid.uuid4()) for _ in chunks]
    documents = [c["text"]     for c in chunks]
    metadatas = [c["metadata"] for c in chunks]
 
    # Upsert in batches of 100 (Chroma Cloud limit)
    batch_size = 100
    for i in range(0, len(chunks), batch_size):
        collection.upsert(
            ids       = ids[i : i + batch_size],
            documents = documents[i : i + batch_size],
            metadatas = metadatas[i : i + batch_size],
        )
        print(f"  Upserted batch {i // batch_size + 1} "
              f"({min(i + batch_size, len(chunks))}/{len(chunks)} chunks)")
 
    print(f"\n✓ Ingestion complete. {len(chunks)} chunks stored in Chroma Cloud.")
    print(f"  Collection : {COLLECTION_NAME}")
    print(f"  Database   : {CHROMA_DATABASE}")
    print(f"  Tenant     : {CHROMA_TENANT or '(auto)'}")

def main():
    parser = argparse.ArgumentParser(
        description="Malaysia Budget 2026 Subsidy RAG Ingesting"
    )
    parser.add_argument("--file", required=True, help="Path to the .md file")
    parser.add_argument("--reset", action="store_true", help="Delete existing collection before ingesting")
    args = parser.parse_args()
    ingest(args.file, reset=args.reset)

if __name__ == "__main__":
    main()