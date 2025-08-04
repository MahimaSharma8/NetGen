from prometheus_client import start_http_server, Gauge
import csv, time

start_http_server(8000)  # Prometheus-style metrics over HTTP

gauges = {
    "rsrp": Gauge("rsrp_dbm", "Reference Signal Received Power", ["cell_id"]),
    "rsrq": Gauge("rsrq_db", "Reference Signal Received Quality", ["cell_id"]),
    "snr": Gauge("snr_db", "Signal to Noise Ratio", ["cell_id"]),
    "cqi": Gauge("cqi", "Channel Quality Indicator", ["cell_id"]),
    "rssi": Gauge("rssi_dbm", "Received Signal Strength", ["cell_id"]),
    "dl_bitrate": Gauge("dl_bitrate_kbps", "Downlink Bitrate", ["cell_id"]),
    "ul_bitrate": Gauge("ul_bitrate_kbps", "Uplink Bitrate", ["cell_id"]),
    "nrx_rsrp": Gauge("nrx_rsrp_dbm", "NRx RSRP", ["cell_id"]),
    "nrx_rsrq": Gauge("nrx_rsrq_db", "NRx RSRQ", ["cell_id"]),
}

def safe_float(val):
    try:
        return float(val)
    except:
        return None

with open("./5Gdataset/Download/Driving/B_2019.12.14_10.16.30.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        cell_id = row.get("CellID", "unknown")
        for k, g in gauges.items():
            val = safe_float(row.get(k.upper()))
            if val is not None:
                g.labels(cell_id=cell_id).set(val)
        time.sleep(1)