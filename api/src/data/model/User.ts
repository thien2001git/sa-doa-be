import {Status} from "./Status";
import {Role} from "./Role";

interface User {
    _id?: string,
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    password?: string;
    role?: Role;
    status?: Status;
}

export type {User};