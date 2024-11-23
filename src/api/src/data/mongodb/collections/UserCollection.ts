import BaseCollection from './BaseCollection.js';
import {userModel, UserType} from "../../schema/UserSchema";

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
