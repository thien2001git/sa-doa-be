import {BaseCollection} from "./BaseCollection";
import {User} from "../../model/User";

class UserCollection extends BaseCollection<User>{}

const userCollection = new UserCollection("user")

export default userCollection