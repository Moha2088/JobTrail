import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http"
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http"
import { WinstonInstrumentation } from "@opentelemetry/instrumentation-winston"
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs"
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics"
import { NodeSDK } from "@opentelemetry/sdk-node"

const serviceName = "jobtrail-backend"
const exportIntervalMillis = 10000

export const otlpEndpoint = (
    Bun.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://localhost:4318"
).replace(/\/+$/, "")

const sdk = new NodeSDK({
    serviceName,
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: `${otlpEndpoint}/v1/metrics`
        }),
        exportIntervalMillis
    }),
    traceExporter: new OTLPTraceExporter({
        url: `${otlpEndpoint}/v1/traces`
    }),
    logRecordProcessors: [
        new BatchLogRecordProcessor(
            new OTLPLogExporter({
                url: `${otlpEndpoint}/v1/logs`
            })
        )
    ],
    instrumentations: [
        // Trace context is attached natively by the SDK from the active context,
        // so the instrumentation must not duplicate it as log attributes.
        new WinstonInstrumentation({ disableLogCorrelation: true })
    ]
})

sdk.start()

export async function shutdownTelemetry(): Promise<void> {
    await sdk.shutdown()
}
