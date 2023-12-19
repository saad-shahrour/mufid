import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const OpinionSchema = new Schema({
    text: {type: String, default: '', required: true}
})


const Opinion = mongoose.models.Opinion || mongoose.model("Opinion", OpinionSchema)

export default Opinion