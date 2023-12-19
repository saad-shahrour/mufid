import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const freeMessagesAllowedSchema = new Schema({
    number: {type: Number, default: 5}
})


const FreeMessage = mongoose.models.FreeMessagesAllowed || mongoose.model("freeMessage", freeMessagesAllowedSchema)

export default FreeMessage