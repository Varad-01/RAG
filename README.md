# Medical Knowledge Assistant with RAG, Pinecone, and LLM  

This project utilizes Pinecone for Retrieval-Augmented Generation (RAG), enabling efficient search and contextual insights from medical literature.  

## Key Features:  
- **Medical Document Processing:** Converts medical book PDFs into smaller, manageable chunks for optimal storage and retrieval.  
- **RAG with Pinecone:** Pushes processed chunks to Pinecone Vector Database for fast and accurate querying.  
- **LLM Integration:** Utilizes Hugging Face's Mixed Bread LLM for generating context-aware responses.  
- **Next.js UI:** A user-friendly interface built with Next.js for seamless interaction and querying.  

---

## Getting Started  

### 1. Clone the Repository  
```bash
git clone https://github.com/Varad-01/RAG.git
```

### 2. Install Dependencies  
```bash
npm install  
```

### 3. Setup Environment Variables  
- Create a `.env` file in the root directory.  
- Add your **PINECONE_API_KEY** by signing up at [Pinecone](https://www.pinecone.io/) and creating an index.  

**Example `.env` file:**  
```env
PINECONE_API_KEY=your-pinecone-api-key  
```

### 4. Add Documents  
- Create a folder named **documents** in the project root.  
- Place your medical PDF files in this folder for processing and uploading to Pinecone.  

### 5. Run the Project  
```bash
npm run dev  
```

The application will run on [http://localhost:3000](http://localhost:3000)  
