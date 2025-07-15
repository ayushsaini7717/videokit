import mongoose,{Schema,model,models} from "mongoose";

export interface Ilikes{
    _id?: mongoose.Types.ObjectId;
    userMail: string;
    mediaId: string;
    createdAt: Date;
}

const likeschema=new Schema<Ilikes>({
    userMail: { type: String, required: true},
    mediaId: {type: String, required: true}
},{
    timestamps: true
})

likeschema.index({ userMail: 1, mediaId: 1 }, { unique: true });

const Likes=models?.Likes || model<Ilikes>("Likes",likeschema);
export default Likes;