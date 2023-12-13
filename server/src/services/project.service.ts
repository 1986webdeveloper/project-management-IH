import ProjectSchema from '../models/Project.schema';

export const ProjectService = new (class {
	constructor() {}

	createProject = async (projectData: any) => {
		const Project = await ProjectSchema.create({
			projectName: projectData.projectName,
			startDate: projectData.startDate,
			estimatedHours: projectData.estimatedHours,
			status: projectData.status,
			deadlineDate: projectData.deadlineDate,
			assignedEmployee: projectData.assignedEmployee,
			technologyList: projectData.technologyList,
			priority: projectData.priority,
			clientId: projectData.clientId,
			profile: projectData.profile,
		});

		if (Project) {
			Project.save();
			return Project;
		}
	};

	getProjects = async () => {
		const projectList = await ProjectSchema.find();
		return projectList;
	};

	isProjectAvailable = async (projectId: string) => {
		const project = await ProjectSchema.findOne({ _id: projectId });
		return project;
	};

	updateProject = async (projectId: string, data: any) => {
		let updatedProject = await ProjectSchema.findByIdAndUpdate(projectId, data).exec();
		return updatedProject;
	};

	deleteProject = async (projectId: string) => {
		let deletedProject = await ProjectSchema.findByIdAndDelete(projectId).exec();
		return deletedProject;
	};

	getProjectById = async (projectId: string) => {
		const project = await ProjectSchema.findById(projectId).exec();
		return project;
	};
})();
