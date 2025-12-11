# SCHOA - Smart Clinical & Operational Assistant

SCHOA is a comprehensive hospital management system prototype integrating Google Gemini AI for clinical documentation support, operational financial analysis, and FHIR-based patient data retrieval.

## Features

*   **Clinical Module:** AI-powered note summarization, symptom checker, and medical image analysis.
*   **Operational Module:** Financial dashboard and automated payroll insights.
*   **Search Module:** Natural Language Processing (NLP) search for FHIR patient data.

## Prerequisites

*   Node.js (v18 or higher)
*   A Google Gemini API Key

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd schoa-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory and add your API Key:
    ```
    API_KEY=your_google_gemini_api_key_here
    ```

## Running the App

To start the development server:

```bash
npm run dev
```

Open your browser and navigate to the URL shown (usually `http://localhost:5173`).

## Tech Stack

*   **Frontend:** React, TypeScript, Tailwind CSS
*   **AI:** Google Gemini API (`@google/genai`)
*   **Icons:** Lucide React
*   **Charts:** Recharts
*   **Build Tool:** Vite

## Disclaimer

This system is for demonstration purposes only. AI outputs are not medical diagnoses. All clinical suggestions must be verified by a licensed healthcare professional.
