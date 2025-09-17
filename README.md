# NetGen
This Docker Compose project sets up a **full end-to-end network telemetry pipeline** for local testing, including:  

- **NiFi**: Generates mock telecom network data (raw JSON).  
- **Kafka**: Message broker for streaming data between components.  
- **TimescaleDB**: Time-series database for storing historical metrics.  
- **Kafka-UI**: View Kafka topics and messages in real-time.


## Service Breakdown
| Service        | Port        | Purpose |
|----------------|------------|---------|
| NiFi           | 5090       | Data generation & flow orchestration. View raw data before it enters Kafka. |
| Kafka          | 9092       | Stream network metrics. |
| Zookeeper      | 2181       | Required by Kafka for coordination. |
| TimescaleDB    | 5432       | Store time-series metrics and network KPIs. |
| Kafka-UI       | 8081       | Visualize Kafka topics and message content. |

---

1. **Launch All Services**
   ```bash
   docker-compose up -d

2. **Check Service Health**
	```bash
    docker ps
    docker-compose logs -f <container_id>


⸻

4. **Managing the Stack**

    List topics:
	```bash
    docker exec -it kafka kafka-topics.sh --bootstrap-server kafka:9092 --list

⸻
    PostgreSQL Access
	
    docker exec -it timescaledb psql -U admin -d network_data
⸻

5. **Monitoring & Logs**
Container Logs

 	docker-compose logs -f <container_id>

Access services:

	•	NiFi: http://localhost:5090
	•	Kafka-UI: http://localhost:8081
	•	TimescaleDB: postgres://postgres@localhost:5432/network_data

Stopping Services

	docker compose down 

# Netgen Dashboard UI

A full-stack dashboard for monitoring **cell tower utilization, energy savings, and packet loss**.  
Built with **FastAPI + SQLAlchemy + TimescaleDB** on the backend, and **React + Vite + Recharts** on the frontend.  


### 1. Clone the repo
```bash
git clone https://github.com/your-username/netgen-ui.git
cd netgen-dashboard
```
### 2. Setup UI
```bash
cd netgen-ui
npm run dev

cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### API available at: http://localhost:8000

#### API Endpoints
	•	GET /dashboard/utilization?low_threshold=20&high_threshold=80
	•	GET /dashboard/energy-saved
	•	GET /dashboard/loss
	•	GET /dashboard/records

### NiFi Setup
#### Prerequisites

	• Apache NiFi (≥ 1.15 recommended)

	• Database (Postgres/TimescaleDB) with a cell_metrics_1min table

	• JDBC driver for Postgres in <NIFI_HOME>/lib/

	• Kafka 
#### Generate / Ingest Metrics
	Use GenerateFlowFile (for test data) or a DB reader.
	Schema: 

#### Execute Query (alerts detection)
	Processor: ExecuteSQLRecord
	Query: use the SQL alerting logic.

#### Convert / Format
	Processor: ConvertRecord → JSONRecordSetWriter.

#### Output Files
	Choose one (or more):
	PutDatabaseRecord → timscaledb table
	PublishKafkaRecord_2_0 → Kafka topic 
#### DB Connection Pooling Service:

	Add DBCPConnectionPool controller service with JDBC URL like:
	example ->	jdbc:postgresql://timescaledb:5432/network_data
#### Record Readers/Writers:

	JsonTreeReader + JsonRecordSetWriter for JSON.
	Match field names with DB schema.

