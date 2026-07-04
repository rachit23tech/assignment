<template>
  <div>
    <h1>Charger List Page</h1>

    <select v-model="statusFilter">
      <option value="">All Statuses</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>

    <select v-model="connectorTypeFilter">
      <option value="">All Connector Types</option>
      <option value="Type1">Type 1</option>
      <option value="Type2">Type 2</option>
    </select>

    <input type="number" v-model="minPowerFilter" placeholder="Min Power (kW)" />
    <input type="number" v-model="maxPowerFilter" placeholder="Max Power (kW)" />

<button @click="showAddForm = !showAddForm">Add Charger</button>

<form v-if="showAddForm" @submit.prevent="handleAddStation">
  <input v-model="newStation.name" placeholder="Name" required />
  <input v-model="newStation.lat" step="any" type="number" placeholder="Latitude" required />
  <input v-model="newStation.lng" step="any" type="number" placeholder="Longitude" required />
  <select v-model="newStation.status">
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>
  <input v-model="newStation.powerOutput" type="number" placeholder="Power Output" required />
  <select v-model="newStation.connectorType">
    <option value="Type1">Type 1</option>
    <option value="Type2">Type 2</option>
  </select>
  <button type="submit">Save</button>
</form>

    <div v-if="loading">Loading...</div>
    <div v-else>
    <div v-for="station in filteredStations" :key="station._id">
  <div v-if="editingStationId === station._id">
    
    <input v-model="editStation.name" placeholder="Name" />
    <input v-model="editStation.lat" step="any" type="number" placeholder="Latitude" />
    <input v-model="editStation.lng" step="any" type="number" laceholder="Longitude" />
    <select v-model="editStation.status">
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
    <input v-model="editStation.powerOutput" placeholder="Power Output" />
    <select v-model="editStation.connectorType">
      <option value="Type1">Type 1</option>
      <option value="Type2">Type 2</option>
    </select>
    <button @click="handleUpdateStation">Save</button>
    <button @click="editingStationId = null">Cancel</button>
  </div>
  <div v-else>
    <h3>{{ station.name }}</h3>
    <p>Status: {{ station.status }}</p>
    <p>Power: {{ station.powerOutput }} kW</p>
    <p>Connector: {{ station.connectorType }}</p>
    <button @click="startEdit(station)">Edit</button>
    <button @click="handleDeleteStation(station._id)">Delete</button>
  </div>
  </div>
    </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../api/axios.js'

const stations = ref([])
const loading = ref(true)
const statusFilter = ref('')
const connectorTypeFilter = ref('')
const minPowerFilter = ref('')
const maxPowerFilter = ref('')
const showAddForm = ref(false)
const newStation = ref({
  name: '',
  lat: '',
  lng: '',
  status: 'Active',
  powerOutput: '',
  connectorType: 'Type1'
})
const editingStationId = ref(null) 
const editStation = ref({
  name: '',
  lat: '',
  lng: '',
  status: 'Active',
  powerOutput: '',
  connectorType: 'Type1'
})
const startEdit = (station) => {
  editingStationId.value = station._id
  editStation.value = {
    name: station.name,
    lat: station.location.lat,
    lng: station.location.lng,
    status: station.status,
    powerOutput: station.powerOutput,
    connectorType: station.connectorType
  }
}

const filteredStations = computed(() => {
    return stations.value.filter((station) => {
        const statusMatch = statusFilter.value === '' || station.status === statusFilter.value
        const connectorTypeMatch = connectorTypeFilter.value === '' || station.connectorType === connectorTypeFilter.value
        const minMatch = minPowerFilter.value === '' || station.powerOutput >= Number(minPowerFilter.value)
        const maxMatch = maxPowerFilter.value === '' || station.powerOutput <= Number(maxPowerFilter.value)
        const powerOutputMatch = minMatch && maxMatch
        return statusMatch && connectorTypeMatch && powerOutputMatch
    })
})

const handleAddStation = async () => {
  try {
    const token = localStorage.getItem('token')
    const stationData = {
      name: newStation.value.name,
      location: {
        lat: Number(newStation.value.lat),
        lng: Number(newStation.value.lng)
      },
      status: newStation.value.status,
      powerOutput: Number(newStation.value.powerOutput),
      connectorType: newStation.value.connectorType
    }
    const response = await api.post('/stations', stationData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    stations.value.push(response.data)
    showAddForm.value = false
  } catch (error) {
    console.error(error)
  }
}

const handleDeleteStation = async (stationId) => {
    try{
        const token = localStorage.getItem('token')
        await api.delete(`/stations/${stationId}`, {
            headers: { Authorization: `Bearer ${token}` }

        })
        stations.value = stations.value.filter((station) => station._id !== stationId)
    } catch (error) {
        console.error(error)
    }
}

const handleUpdateStation = async () => {
  try {
    const token = localStorage.getItem('token')
    const updatedData = {
      name: editStation.value.name,
      location: {
        lat: Number(editStation.value.lat),
        lng: Number(editStation.value.lng)
      },
      status: editStation.value.status,
      powerOutput: Number(editStation.value.powerOutput),
      connectorType: editStation.value.connectorType
    }
    const response = await api.put(`/stations/${editingStationId.value}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    stations.value = stations.value.map((station) => {
      return station._id === editingStationId.value ? response.data : station
    })
    editingStationId.value = null
    } 
    catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  try {
    const response = await api.get('/stations')
    console.log('Fetched stations:', response.data.length, response.data)
    stations.value = response.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>