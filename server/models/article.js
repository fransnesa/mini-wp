const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articleSchema =  new Schema({
    title: String,
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    featured_image: {
        type: String,
    },
    author:String,
    articletags: []
},{
    timestamps: true,
    versionKey: false
})

let articles = mongoose.model('articles',articleSchema)

module.exports = articles
