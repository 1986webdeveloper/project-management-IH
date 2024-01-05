import { UserInterface } from './user.interface';
import { ClientInterface } from './client.interface';
import { ProjectInterface } from './project.interface';
import { TaskInterface } from './task.interface';

export interface AllCollectionInterface {
	users?: UserInterface[];
	clients?: ClientInterface[];
	projects?: ProjectInterface[];
	tasks?: TaskInterface[];
}
