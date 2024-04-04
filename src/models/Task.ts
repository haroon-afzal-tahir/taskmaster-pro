import { Tag } from "./Tag";
import { User } from "./User";

export interface Task {
    _id: string;
    title: string;
    dueDate: string | Date;
    completed: boolean;
    createdAt?: string;
    tag?: Tag;
    user?: User;
}
