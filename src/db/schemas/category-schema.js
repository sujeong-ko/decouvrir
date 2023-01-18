import mongoose, { Schema } from "mongoose";
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const CategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Number,
        default: 0
    }
},
{
    collection: 'category',
})
CategorySchema.plugin(autoIncrement.plugin, {
    model: 'CategorySchemaModel',
    field: 'categoryId',
    startAt: 1,
    increment: 1
})

export { CategorySchema };
