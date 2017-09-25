import { Mongo } from 'meteor/mongo';

/**
 * On server, sets up a MongoDb collection called 'tasks'
 */
export const Tasks = new Mongo.Collection('tasks');
