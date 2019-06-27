// Import Modules
import mongoose, { Schema, Document } from 'mongoose';

// Import plugins
import Slugify from '../plugins/slugify';

// Define Interface
interface IPost extends Document {
    title: String,
    body: String,
    slug: String,
    cover: String,
    image: String,
    _user: any
}

// Define Schema
let PostSchema: Schema = new Schema(
    {
        title: String,
        body: String,
        slug: String,
        cover: String,
        image: String,
        _user: { 
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

// Functions
function generateSlugAndContinue(this: any, count: number, next: any) {
    this.slug = Slugify(this.title);

    if(count != 0)
        this.slug = this.slug + '-' + count;
    
    (Post as any).validateSlugCount(this.slug).then((isValid: boolean) => {
        if(!isValid) return generateSlugAndContinue.call(this, count + 1, next)
        next()
    });
}
// Pre
PostSchema.pre('save', function(next: any) {
    if ((this as any).slug) return next()
    generateSlugAndContinue.call(this, 0, next)
})

// Add static methods to the schema
PostSchema.statics.validateSlugCount = function(slug: string) {
    return Post.countDocuments({slug}).then(count => {
        if (count > 0) return false
        return true
    })
} 

const Post = mongoose.model<IPost>('Post', PostSchema);

// Export the model and return your IUser interface
export { IPost };
export default Post;