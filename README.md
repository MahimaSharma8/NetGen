# NetGen

An autonomous, low-footprint Agentic AI system designed to predict network traffic patterns in real-time and dynamically balance loads across edge nodes and RAN clusters.

NOTE: the dataset used at the moment for this implementation is Urban56s, There is a sample data file included in the repository.
```
.
├── docker-compose.yml       # Services: Grafana, Prometheus, PushGateway, OTel
├── prometheus.yml           # Scrapes OTel collector and PushGateway
├── otel-config.yml          # Forwards metrics from Python to Prometheus
├── stream.py                # Python script simulating network metrics
```

##  Setup Instructions

### 1. Clone and Run

```bash
docker-compose up --build
```

### 2. Start Python Exporter

In another terminal:

```bash
python3 stream.py
```

## Ports

| Service       | Port   |
|---------------|--------|
| Prometheus    | `9090` |
| Grafana       | `3000` |
| PushGateway   | `9091` |

## Cleanup

```bash
docker-compose down -v
```
