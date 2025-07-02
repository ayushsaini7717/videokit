import mongoose,{Model,model,models,Schema} from "mongoose";

export const Vedio_Dimensions={
    height:1920,
    width: 1080
}

export interface ivedio{
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    transformation: {
        height: Number;
        width: Number;
        quality?: number
    }
}

const vedioSchema=new Schema<ivedio>({
    title: {type: String,required: true},
    description: {type: String,required: true},
    videoUrl: {type: String, required: true},
    thumbnailUrl: {type: String,required: true},
    controls: {type: Boolean,default: true},
    transformation: {
        height: {type: Number,default: Vedio_Dimensions.height},
        width: {type: Number,default: Vedio_Dimensions.width},
        quality: {type: Number,min: 1,max: 100}
    }
})

const VedioModel=models?.VedioModel || model<ivedio>("VedioModel",vedioSchema);
export default VedioModel;