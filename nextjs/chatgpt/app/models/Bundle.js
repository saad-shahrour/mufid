import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const bundleSchema = new Schema({
    name: {type: String, default: ''},
    messages: { type: Number, default: 3}, 
    time: { type: Number , default: 0},
    imgUrl: {type: String, default: ''},
    cost: {type: Number, default: 0},
    country: {type: String, default: ''},
    used: {type: Boolean, default: false}
}, {
    timestamps: true
})

const Bundle = mongoose.models.Bundle || mongoose.model("Bundle", bundleSchema)

export default Bundle