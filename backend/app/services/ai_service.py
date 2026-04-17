"""
AI service — Gemini API integration for intelligent healthcare analysis.
"""

import requests
from app.config.settings import GEMINI_API_KEY

GEMINI_API_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "gemini-2.5-flash:generateContent"
)
 

def analyze_with_gemini(prompt: str) -> str:
    """
    Send a prompt to the Gemini API and return the generated text.

    Falls back to a descriptive error message on failure.
    """
    if not GEMINI_API_KEY:
        return "Gemini API key is not configured. Please set GEMINI_API_KEY in .env."

    try:
        headers = {"Content-Type": "application/json"}
        params = {"key": GEMINI_API_KEY}
        payload = {
            "contents": [
                {
                    "parts": [{"text": prompt}]
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "maxOutputTokens": 256,
            },
        }

        response = requests.post(
            GEMINI_API_URL,
            headers=headers,
            params=params,
            json=payload,
            timeout=15,
        )

        if response.status_code != 200:
            return (
                f"Gemini API returned status {response.status_code}: "
                f"{response.text[:300]}"
            )

        data = response.json()
        candidates = data.get("candidates", [])
        if candidates:
            parts = candidates[0].get("content", {}).get("parts", [])
            if parts:
                return parts[0].get("text", "No response text from Gemini.")
        return "Gemini returned an empty response."

    except requests.exceptions.Timeout:
        return "Gemini API request timed out. Please try again."
    except requests.exceptions.ConnectionError:
        return "Unable to connect to Gemini API. Check your network connection."
    except Exception as e:
        return f"Gemini API error: {str(e)}"

def analyze_pdf_with_gemini(base64_pdf: str, prompt: str) -> str:
    """
    Send a PDF and a prompt to the Gemini API and return the generated text.
    """
    if not GEMINI_API_KEY:
        return "Gemini API key is not configured. Please set GEMINI_API_KEY in .env."

    try:
        headers = {"Content-Type": "application/json"}
        params = {"key": GEMINI_API_KEY}
        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "inlineData": {
                                "mimeType": "application/pdf",
                                "data": base64_pdf
                            }
                        },
                        {"text": prompt}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "maxOutputTokens": 1024,
            },
        }

        response = requests.post(
            GEMINI_API_URL,
            headers=headers,
            params=params,
            json=payload,
            timeout=30,
        )

        if response.status_code != 200:
            return (
                f"Gemini API returned status {response.status_code}: "
                f"{response.text[:300]}"
            )

        data = response.json()
        candidates = data.get("candidates", [])
        if candidates:
            parts = candidates[0].get("content", {}).get("parts", [])
            if parts:
                return parts[0].get("text", "No response text from Gemini.")
        return "Gemini returned an empty response."

    except requests.exceptions.Timeout:
        return "Gemini API request timed out. Please try again."
    except requests.exceptions.ConnectionError:
        return "Unable to connect to Gemini API. Check your network connection."
    except Exception as e:
        return f"Gemini API error: {str(e)}"


def build_patient_prompt(patient: dict) -> str:
    """Build a medical analysis prompt from patient data."""
    vitals = patient.get("vitals", {})
    return (
        f"You are a senior medical AI assistant in a hospital ward.\n"
        f"Patient: {patient.get('name', 'Unknown')}, "
        f"Age: {patient.get('age', 'N/A')}, "
        f"Diagnosis: {patient.get('diagnosis', 'N/A')}.\n"
        f"Current vitals — "
        f"Heart Rate: {vitals.get('heartRate', 'N/A')} bpm, "
        f"Oxygen: {vitals.get('oxygen', 'N/A')}%, "
        f"BP: {vitals.get('bpSystolic', 'N/A')}/{vitals.get('bpDiastolic', 'N/A')} mmHg.\n"
        f"Suggest immediate clinical action in 2-3 lines."
    )
