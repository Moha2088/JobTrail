import { metrics, trace } from "@opentelemetry/api"

const serviceName = "jobtrail-backend"
const version = "1.0.0"

const tracer = trace.getTracer(serviceName, version)
const meter = metrics.getMeter(serviceName, version)