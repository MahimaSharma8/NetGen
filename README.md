# NetGen
An autonomous, low-footprint Agentic AI system designed to predict network traffic patterns in real-time and dynamically balance loads across edge nodes and RAN clusters. 
.
├── docker-compose.yml       # Services: Grafana, Prometheus, PushGateway, OTel
├── prometheus.yml           # Scrapes OTel collector and PushGateway
├── otel-config.yml          # Forwards metrics from Python to Prometheus
├── stream.py                # Python script simulating network metrics

 Setup Instructions

1. Clone and Run
git clone https://github.com/your-org/network-traffic-metrics-pipeline.git
cd network-traffic-metrics-pipeline
docker-compose up --build

Start Python Exporter

In another terminal:
python3 stream.py


Prometheus
port:9090

Grafana
port:3000


PushGateway
port:9091

 Cleanup
 docker-compose down -v
