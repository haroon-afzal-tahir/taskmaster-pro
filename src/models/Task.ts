import { Tag } from "./Tag";
import { User } from "./User";

export interface Task {
    title: string;
    dueDate: string;
    completed: boolean;
    createdAt?: string;
    tag?: Tag;
    user?: User;
}
