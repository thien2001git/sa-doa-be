import {BaseCollection} from "./BaseCollection";
import {User} from "../entity/User";

class UserCollection extends BaseCollection<User>{}

const userCollection = new UserCollection("user")

export default userCollection