"""
AgriSense AI — Pydantic Data Contracts & Schemas
"""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class TelemetryData(BaseModel):
    ph: str
    oc: str
    rain_prob: str
    rain_desc: str
    soil_n: str
    weather: str
    water: str

class DistrictProfile(BaseModel):
    district: str
    state: str = "Tamil Nadu"
    zone: str
    soil_type: str
    climate: str
    telemetry: TelemetryData

class FarmScoreBreakdown(BaseModel):
    weather_suitability: int = Field(..., ge=0, le=100)
    soil_suitability: int = Field(..., ge=0, le=100)
    irrigation_condition: int = Field(..., ge=0, le=100)
    crop_health: int = Field(..., ge=0, le=100)
    market_condition: int = Field(..., ge=0, le=100)

class FarmScoreResponse(BaseModel):
    score: int
    status: str # "Excellent" | "Good" | "Warning" | "Critical"
    district: str
    crop: str
    breakdown: FarmScoreBreakdown
    summary: str

class WeatherHourly(BaseModel):
    time: str
    temp: float
    rain_prob: int
    condition: str

class WeatherDaily(BaseModel):
    day: str
    temp_max: float
    temp_min: float
    rain_prob: int
    condition: str

class FarmingImpact(BaseModel):
    irrigation: str # "WAIT" | "PROCEED" | "CRITICAL"
    fertilizer: str # "RECOMMENDED" | "NOT RECOMMENDED" | "DELAY"
    spraying: str # "FAVORABLE" | "UNFAVORABLE"
    harvest: str # "FAVORABLE" | "DELAY"

class WeatherResponse(BaseModel):
    district: str
    temp: float
    humidity: int
    wind_speed_kmh: float
    rain_prob_36h: int
    condition: str
    hourly: List[WeatherHourly]
    forecast_7d: List[WeatherDaily]
    farming_impact: FarmingImpact

class SoilNutrient(BaseModel):
    name: str
    value: float
    unit: str
    status: str # "Optimal" | "Deficient" | "Excess"
    ideal_range: str

class SoilResponse(BaseModel):
    district: str
    ph: float
    ph_status: str
    organic_carbon: float
    nutrients: List[SoilNutrient]
    ai_recommendation: str

class MarketPricePoint(BaseModel):
    date: str
    price_inr: float

class MarketResponse(BaseModel):
    crop: str
    district: str
    mandi_name: str
    current_price_per_qtl: float
    price_change_pct: float
    trend: str # "up" | "down" | "stable"
    history_7d: List[MarketPricePoint]
    history_30d: List[MarketPricePoint]
    sell_recommendation: str # "SELL" | "WAIT" | "MONITOR"
    sell_rationale: str

class DiseaseScanRequest(BaseModel):
    district: str
    crop: str
    image_b64: Optional[str] = None
    symptom_sample_id: Optional[str] = None

class DiseaseTreatment(BaseModel):
    organic: str
    chemical: str
    preventive: str

class DiseaseScanResponse(BaseModel):
    disease_name: str
    confidence_pct: float
    severity: str # "Low" | "Moderate" | "High"
    affected_part: str
    treatment: DiseaseTreatment
    disclaimer: str

class AIAdvisoryRequest(BaseModel):
    district: str
    crop: str
    season: str
    stage: str
    query: Optional[str] = None
    lang: str = "en"

class AIAdvisoryResponse(BaseModel):
    district: str
    crop: str
    season: str
    stage: str
    headline: str
    warning_title: str
    warning_text: str
    what: str
    when: str
    how_much: str
    why: str
    source_name: str
    publication_date: str
    confidence_pct: float
    rule_matched: bool
    data_sources_used: List[str]
    what_if_ignored: str
