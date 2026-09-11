"""
AgriSense AI — REST API Endpoints
"""
from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
from backend.app.models.schemas import (
    FarmScoreResponse, WeatherResponse, WeatherHourly, WeatherDaily, FarmingImpact,
    SoilResponse, SoilNutrient, MarketResponse, MarketPricePoint,
    AIAdvisoryRequest, AIAdvisoryResponse,
    DiseaseScanRequest, DiseaseScanResponse
)
from backend.app.services.ai_service import ai_service

router = APIRouter(prefix="/api/v1", tags=["AgriSense Core APIs"])

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AgriSense AI Backend",
        "version": "1.2.0",
        "ai_engine": ai_service.provider
    }

@router.get("/farm-score", response_model=FarmScoreResponse)
def get_farm_score(
    district: str = Query("Thanjavur", description="Target district"),
    crop: str = Query("Paddy", description="Target crop")
):
    return ai_service.calculate_farm_score(district=district, crop=crop)

@router.get("/weather", response_model=WeatherResponse)
def get_weather(district: str = Query("Thanjavur")):
    hourly = [
        WeatherHourly(time="06:00", temp=26.0, rain_prob=10, condition="Clear Dew"),
        WeatherHourly(time="09:00", temp=28.5, rain_prob=15, condition="Sunny"),
        WeatherHourly(time="12:00", temp=31.2, rain_prob=20, condition="Partly Cloudy"),
        WeatherHourly(time="15:00", temp=30.8, rain_prob=25, condition="Cloudy"),
        WeatherHourly(time="18:00", temp=28.0, rain_prob=15, condition="Clear"),
        WeatherHourly(time="21:00", temp=26.5, rain_prob=10, condition="Fair")
    ]

    forecast_7d = [
        WeatherDaily(day="Mon", temp_max=32.0, temp_min=25.0, rain_prob=15, condition="Sunny"),
        WeatherDaily(day="Tue", temp_max=31.5, temp_min=24.5, rain_prob=20, condition="Clear"),
        WeatherDaily(day="Wed", temp_max=30.0, temp_min=24.0, rain_prob=65, condition="Thunderstorms"),
        WeatherDaily(day="Thu", temp_max=29.0, temp_min=23.5, rain_prob=75, condition="Moderate Rain"),
        WeatherDaily(day="Fri", temp_max=30.5, temp_min=24.0, rain_prob=30, condition="Partly Cloudy"),
        WeatherDaily(day="Sat", temp_max=32.0, temp_min=25.0, rain_prob=10, condition="Sunny"),
        WeatherDaily(day="Sun", temp_max=32.5, temp_min=25.5, rain_prob=10, condition="Clear")
    ]

    return WeatherResponse(
        district=district,
        temp=29.4,
        humidity=82 if district == "Thanjavur" else 58,
        wind_speed_kmh=8.5,
        rain_prob_36h=15 if district != "Nagapattinam" else 40,
        condition="Partly Cloudy • Favorable Spraying Window",
        hourly=hourly,
        forecast_7d=forecast_7d,
        farming_impact=FarmingImpact(
            irrigation="WAIT" if district == "Thanjavur" else "PROCEED",
            fertilizer="RECOMMENDED",
            spraying="FAVORABLE",
            harvest="FAVORABLE"
        )
    )

@router.get("/soil", response_model=SoilResponse)
def get_soil(district: str = Query("Thanjavur")):
    if district == "Coimbatore":
        return SoilResponse(
            district="Coimbatore",
            ph=8.1,
            ph_status="Calcareous / Alkaline",
            organic_carbon=0.42,
            nutrients=[
                SoilNutrient(name="Available Nitrogen", value=165.0, unit="kg/ha", status="Deficient", ideal_range="280–450"),
                SoilNutrient(name="Phosphorus (P2O5)", value=12.4, unit="kg/ha", status="Deficient", ideal_range="15–25"),
                SoilNutrient(name="Potassium (K2O)", value=320.0, unit="kg/ha", status="Optimal", ideal_range="200–350"),
                SoilNutrient(name="Available Zinc", value=0.52, unit="ppm", status="Deficient", ideal_range="0.8–2.0")
            ],
            ai_recommendation="Apply 0.5% Zinc Sulphate foliar spray with Citric Acid to unlock micronutrients under calcareous pH 8.1."
        )
    elif district == "Madurai":
        return SoilResponse(
            district="Madurai",
            ph=7.4,
            ph_status="Neutral to Mildly Alkaline",
            organic_carbon=0.31,
            nutrients=[
                SoilNutrient(name="Available Nitrogen", value=140.0, unit="kg/ha", status="Deficient", ideal_range="280–450"),
                SoilNutrient(name="Phosphorus (P2O5)", value=9.8, unit="kg/ha", status="Deficient", ideal_range="15–25"),
                SoilNutrient(name="Potassium (K2O)", value=190.0, unit="kg/ha", status="Deficient", ideal_range="200–350"),
                SoilNutrient(name="Available Zinc", value=0.72, unit="ppm", status="Deficient", ideal_range="0.8–2.0")
            ],
            ai_recommendation="Add 5 tonnes well-decomposed FYM per acre. Practice deep briquette fertilizer placement to avoid thermal volatilization."
        )
    else: # Thanjavur / Default
        return SoilResponse(
            district="Thanjavur",
            ph=6.8,
            ph_status="Near Neutral (Optimal)",
            organic_carbon=0.58,
            nutrients=[
                SoilNutrient(name="Available Nitrogen", value=210.0, unit="kg/ha", status="Optimal", ideal_range="280–450"),
                SoilNutrient(name="Phosphorus (P2O5)", value=18.5, unit="kg/ha", status="Optimal", ideal_range="15–25"),
                SoilNutrient(name="Potassium (K2O)", value=280.0, unit="kg/ha", status="Optimal", ideal_range="200–350"),
                SoilNutrient(name="Available Zinc", value=0.95, unit="ppm", status="Optimal", ideal_range="0.8–2.0")
            ],
            ai_recommendation="Delta clay is fertile. Strictly avoid excess nitrogen top-dressing to prevent Sheath Blight outbreaks."
        )

@router.get("/market", response_model=MarketResponse)
def get_market(
    crop: str = Query("Paddy"),
    district: str = Query("Thanjavur")
):
    history_7d = [
        MarketPricePoint(date="Day -6", price_inr=2240),
        MarketPricePoint(date="Day -5", price_inr=2255),
        MarketPricePoint(date="Day -4", price_inr=2270),
        MarketPricePoint(date="Day -3", price_inr=2290),
        MarketPricePoint(date="Day -2", price_inr=2310),
        MarketPricePoint(date="Yesterday", price_inr=2330),
        MarketPricePoint(date="Today", price_inr=2350)
    ]

    history_30d = [
        MarketPricePoint(date="Week 1", price_inr=2180),
        MarketPricePoint(date="Week 2", price_inr=2210),
        MarketPricePoint(date="Week 3", price_inr=2260),
        MarketPricePoint(date="Week 4", price_inr=2350)
    ]

    return MarketResponse(
        crop=crop,
        district=district,
        mandi_name=f"{district} Regulated Mandi",
        current_price_per_qtl=2350.0,
        price_change_pct=4.2,
        trend="up",
        history_7d=history_7d,
        history_30d=history_30d,
        sell_recommendation="WAIT",
        sell_rationale="Procurement centers report steady arrival volume with 3.5% weekly upward momentum. Recommended to hold inventory for 5–7 days before selling."
    )

@router.post("/ai/advisory", response_model=AIAdvisoryResponse)
def generate_advisory(req: AIAdvisoryRequest):
    return ai_service.get_farm_recommendation(req)

@router.post("/ai/disease-scan", response_model=DiseaseScanResponse)
def scan_disease(req: DiseaseScanRequest):
    return ai_service.analyze_crop_disease(req)
