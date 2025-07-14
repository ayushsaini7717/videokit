import mongoose,{Schema,model,models} from "mongoose";

export interface Ilikes{
    _id?: mongoose.Types.ObjectId;
    userId: string;
    mediaId: string;
    createdAt: Date;
}

const likeschema=new Schema<Ilikes>({
    userId: { type: String, required: true},
    mediaId: {type: String, required: true}
},{
    timestamps: true
})

likeschema.index({ userId: 1, mediaId: 1 }, { unique: true });

const Likes=models?.Likes || model<Ilikes>("Likes",likeschema);
export default Likes;