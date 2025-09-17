from sqlalchemy import Column, Integer, Float, String
from db import Base

class NetworkMetrics(Base):
    __tablename__ = "network_metrics"

    cell_id = Column(String, primary_key=True)
    avg_utilization = Column(Float)
    peak_utilization = Column(Float)
    energy_saved = Column(Float)
    packet_loss = Column(Float)
    policies_applied = Column(String)
    latency = Column(Float)
    radio_energy_consumption = Column(Float)