import userModel from '../../model/User.js';
import BaseCollection from './BaseCollection.js';

class UserCollection extends BaseCollection {
    constructor() {
        super(userModel);
    }
    findByUsernameOrEmail(usernameOrEmail: string) {
        return this.getModel().findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });
    }
}

const userCollection = new UserCollection();
export default userCollection;
