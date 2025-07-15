import mongoose,{model,models,Schema} from "mongoose";

interface IComment{
    _id?: mongoose.Types.ObjectId;
    userName: string;
    mediaId: string;
    text: string;
    createdAt: Date;
}

const CommentSchema=new Schema<IComment>({
    userName: { type: String, required: true},
    mediaId: {type: String, required: true},
    text: {type: String}
},{
    timestamps: true
})

const Comments = models.Comment || model<IComment>("Comment", CommentSchema);
export default Comments;