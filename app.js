const express = require('express');
const Prometheus = require('prom-client')
const app = express();
const port = process.env.PORT || 3001

const register = new Prometheus.Registry();

Prometheus.collectDefaultMetrics({
    app: 'node-application-monitoring-app',
    prefix: 'node_',
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    register
});

app.get('/health', (req, res) => {
    res.json({
        date: new Date(),
        message: 'Server online'
    })
})

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType)
    res.end(await register.metrics())
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
