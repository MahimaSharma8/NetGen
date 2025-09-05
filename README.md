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
| Prometheus    | 9090      | Time-series metrics storage for system monitoring |
| Grafana       | 3000      | Visualization dashboards |
| OpenTelemetry Collector | 8889 | Collects & exports metrics to Prometheus |

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

Prometheus
	•	Metrics endpoint: http://<VM_PUBLIC_IP>:9090
	•	Query examples: up, kafka_server_brokertopicmetrics_messages_in_total

Grafana
	•	Default login: admin / admin
	•	Add Prometheus datasource (http://prometheus:9090)
	•	Import dashboards for Kafka, Postgres

Container Logs

 	docker-compose logs -f <container_id>

Access services:

	•	NiFi: http://localhost:5090
	•	Kafka-UI: http://localhost:8081
	•	TimescaleDB: postgres://postgres@localhost:5432/network_data

Stopping Services

	docker compose down 
