import mongoose from "mongoose";

const ChargingStationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        lat:{ type: Number, required: true },
        lng:{ type: Number, required: true }
    },
    status:{
        type: String,
        enum: ['Active', 'Inactive'],
        required: true
    },
    powerOutput: {
        type: Number,
        required: true
    },
    connectorType: {
        type: String,
        enum: ['Type1', 'Type2'],
        required: true
    }
});

const ChargingStation = mongoose.model('ChargingStation', ChargingStationSchema);
export default ChargingStation;     