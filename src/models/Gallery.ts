import { Schema, model, Document } from 'mongoose';

interface IGallery extends Document {
    itemsNumber: String,
    _user: any
};

let GallerySchema = new Schema(
    {
        _user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        itemsNumber: {
            type: String,
            default: 0
        },
        folderName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Gallery = model('Gallery', GallerySchema);

export { IGallery };
export default Gallery;