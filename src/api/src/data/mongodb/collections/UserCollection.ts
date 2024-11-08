import userModel, { UserType } from '../../model/User.js';
import BaseCollection from './BaseCollection.js';

class UserCollection extends BaseCollection<UserType> {
    constructor() {
        super(userModel);
    }

    findByUsernameOrEmail(usernameOrEmail: string): Promise<UserType | null> {
        return this.getModel()
            .findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            })
            .exec(); // Đảm bảo trả về một Promise
    }
}

const userCollection = new UserCollection();
export default userCollection;
