import { ObjectId, Timestamp } from "mongodb";
import mongoose, {Schema, mongo} from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    country: String,
    email: String,
    role: String,
    // bundle : {
    //     messages: { type: Number, default: 0 }, // Set a default value if applicable
    //     time: { type: Date, default: Date.now }, // Use Date type for timestamps
    //     used: { type: Boolean, default: false },
    // },
    boughtBundle: {
        // type: Schema.Types.ObjectId,
        // ref: 'Bundle',
        // default: new ObjectId('655f56e04c9f7677f1b55aa0')
        
    },
    payed: { type: Boolean, default: false}
    
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User