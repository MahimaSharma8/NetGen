## Service Breakdown

| Service           | Port(s)    | Purpose |
|-------------------|-----------|---------|
| **Zookeeper**     | 2181      | Required by Kafka for broker coordination |
| **Kafka**         | 9092      | Event streaming backbone (topics for metrics, alerts, policies) |
| **NiFi**          | 8080      | GUI-based dataflow creation & management |
| **Flink JobManager** | 8081   | Flink UI for managing streaming jobs |
| **Flink TaskManager** | —     | Executes Flink jobs (worker) |
| **PostgreSQL**    | 5432      | Stores processed metrics, alerts, forecasts |
| **Prometheus**    | 9090      | Time-series metrics storage for system monitoring |
| **Grafana**       | 3000      | Visualization dashboards |
| **OpenTelemetry Collector** | 8889 | Collects & exports metrics to Prometheus |
| **Tower Simulator** | —       | Pushes mock tower metrics to Kafka |

---

## Starting the Stack

1. **Launch All Services**
   ```bash
   docker-compose up -d

2. **Check Service Health**

    docker ps
    docker-compose logs -f kafka
    docker-compose logs -f nifi


3.	**Access UIs**
	•	NiFi → http://<VM_PUBLIC_IP>:8080/nifi
	•	Flink UI → http://<VM_PUBLIC_IP>:8081
	•	Grafana → http://<VM_PUBLIC_IP>:3000
	•	Prometheus → http://<VM_PUBLIC_IP>:9090

⸻

4. **Managing the Stack**

    List topics:

    docker exec -it kafka kafka-topics.sh --bootstrap-server kafka:9092 --list
   
    PostgreSQL Access

    docker exec -it postgres psql -U admin -d network_data

    View tables:
    \dt

⸻

5. **Monitoring & Logs**

Prometheus
	•	Metrics endpoint: http://<VM_PUBLIC_IP>:9090
	•	Query examples: up, kafka_server_brokertopicmetrics_messages_in_total

Grafana
	•	Default login: admin / admin
	•	Add Prometheus datasource (http://prometheus:9090)
	•	Import dashboards for Kafka, Flink, Postgres

Container Logs

docker-compose logs -f kafka
docker-compose logs -f flink-jobmanager


⸻
