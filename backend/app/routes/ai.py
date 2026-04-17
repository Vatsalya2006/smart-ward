"""
AI routes.
"""

from fastapi import APIRouter, Body
from app.controllers.ai_controller import analyze
from app.schemas.alert_schema import AIAnalyzeRequest

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/analyze")
def ai_analyze(body: AIAnalyzeRequest):
    """POST /ai/analyze — run Gemini-powered medical analysis."""
    return analyze(prompt=body.prompt, patient_id=body.patientId)

@router.post("/analyze-report")
def ai_analyze_report(payload: dict = Body(...)):
    """POST /ai/analyze-report — analyze a PDF report."""
    from app.controllers.ai_controller import analyze_report
    return analyze_report(payload)
