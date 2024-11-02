import {BaseCollection} from "./BaseCollection";
import {User} from "../../model/User";

class UserCollection extends BaseCollection<User>{
    constructor() {
        super('user');
    }
}

const userCollection = new UserCollection()

export default userCollection