import userModel from '../../model/User.js';
import BaseCollection from './BaseCollection.js';

class UserCollection extends BaseCollection {
    constructor() {
        super(userModel);
    }
}

const userCollection = new UserCollection();
export default userCollection;
