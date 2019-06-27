'use strict'

// Import Modules
import { Schema, model, Document } from 'mongoose';
import { IUser } from './User';

// Define IProject
interface IProject extends Document {
    title: String,
    description: String,
    url: String,
    _user: IUser
};

// Define Schema
let ProjectSchema: Schema = new Schema (
    {
        title: String,
        description: String,
        url: String,
        _user: Schema.Types.ObjectId
    },
    {
        timestamps: true
    }
);

const Project = model('Project', ProjectSchema);

export default Project;