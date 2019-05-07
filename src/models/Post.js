'use strict'

// Import modules
const mongoose = require('mongoose');

// Load plugins
const slugify = require('../plugins/slugify');

let postsSchema = mongoose.Schema({
    title: String,
    body: String,
    color: String,
    slug: String,
    cover: String,
    image: String,
    _user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
});


// Functions
function generateSlugAndContinue(count, next) {
    this.slug = slugify(this.title);

    if(count != 0)
        this.slug = this.slug + '-' + count
    
    Post.validateSlugCount(this.slug).then(isValid => {
        if(!isValid) return generateSlugAndContinue.call(this, count + 1, next)
        next()
    });
}

// Pre
postsSchema.pre('save', function (next) {
    if (this.slug) return next()
    generateSlugAndContinue.call(this, 0, next)
})

// Add static methods to the schema
postsSchema.statics.validateSlugCount = function (slug) {
    return Post.countDocuments({slug}).then(count => {
        if (count > 0) return false
        return true
    })
} 


const Post = mongoose.model('Post', postsSchema);

module.exports = Post;