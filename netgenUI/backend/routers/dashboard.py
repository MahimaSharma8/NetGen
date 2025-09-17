from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from db import SessionLocal
import models

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/utilization")
def utilization_view(
    db: Session = Depends(get_db),
    low_threshold: int = Query(20, description="Upper bound for low utilization"),
    high_threshold: int = Query(80, description="Lower bound for high utilization")
):
    low = db.query(func.count(models.NetworkMetrics.cell_id))\
            .filter(models.NetworkMetrics.avg_utilization < low_threshold).scalar()

    medium = db.query(func.count(models.NetworkMetrics.cell_id))\
               .filter(models.NetworkMetrics.avg_utilization.between(low_threshold, high_threshold)).scalar()

    high = db.query(func.count(models.NetworkMetrics.cell_id))\
             .filter(models.NetworkMetrics.avg_utilization > high_threshold).scalar()
    
    return {
        "low_utilization": low or 0,
        "medium_utilization": medium or 0,
        "high_utilization": high or 0
    }


@router.get("/energy-saved")
def energy_saved_view(db: Session = Depends(get_db)):
    results = db.query(
        models.NetworkMetrics.cell_id,
        models.NetworkMetrics.energy_saved
    ).all()

    towers = []
    for r in results:
        color = "green"
        if r.energy_saved < 100:
            color = "red"
        elif r.energy_saved < 500:
            color = "yellow"
        
        towers.append({
            "cell_id": r.cell_id,
            "energy_saved": r.energy_saved,
            "color": color
        })

    return towers


@router.get("/loss")
def packet_loss_view(db: Session = Depends(get_db)):
    results = (
        db.query(
            models.NetworkMetrics.cell_id,
            (func.avg(models.NetworkMetrics.packet_loss) * 100).label("packet_loss")
        )
        .group_by(models.NetworkMetrics.cell_id)
        .order_by(func.avg(models.NetworkMetrics.packet_loss).desc())
        .limit(15)
        .all()
    )
    return [{"cell_id": r.cell_id, "packet_loss": r.packet_loss} for r in results]

@router.get("/records")
def get_records(db: Session = Depends(get_db)):
    results = db.query(models.NetworkMetrics).all()
    return results