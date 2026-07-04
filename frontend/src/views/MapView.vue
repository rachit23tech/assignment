<template>
  <div>
    <h1>Map Page</h1>
    <div id="map" style="height: 500px;"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import api from '../api/axios.js'

onMounted(async () => {
  const map = L.map('map').setView([26.4499, 80.3319], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  try {
    const response = await api.get('/stations')
    const stations = response.data
    const markers = []

    stations.forEach(station => {
      const marker = L.marker([station.location.lat, station.location.lng])
      marker.bindPopup(`
        <h3>${station.name}</h3>
        <p>Status: ${station.status}</p>
        <p>Power: ${station.powerOutput} kW</p>
        <p>Connector: ${station.connectorType}</p>
      `)
      marker.addTo(map)
      markers.push(marker)
    })

    if (markers.length > 0) {
      const group = L.featureGroup(markers)
      map.fitBounds(group.getBounds(), { padding: [50, 50] })
    }
  } catch (error) {
    console.error(error)
  }
})
</script>