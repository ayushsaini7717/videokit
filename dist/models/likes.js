import { Schema, model, models } from "mongoose";
const likeschema = new Schema({
    userId: { type: String, required: true },
    mediaId: { type: String, required: true }
}, {
    timestamps: true
});
likeschema.index({ userId: 1, mediaId: 1 }, { unique: true });
const Likes = models?.Likes || model("Likes", likeschema);
export default Likes;
