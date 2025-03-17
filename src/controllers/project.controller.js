import prisma from "../config/db.js";

// Create a new project (Faculty only)
export const createProject = async (req, res) => {
  if (req.user.role !== "faculty") {
    return res.status(403).json({ message: "Only faculty can create projects" });
  }

  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const project = await prisma.project.create({
      data: { title, description, facultyId: req.user.id },
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error: error.message });
  }
};

// Get all available projects
export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: { faculty: true },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
};

// Apply for a project (Student only)
export const applyForProject = async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Only students can apply for projects" });
  }

  try {
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const existingApplication = await prisma.application.findFirst({
      where: { studentId: req.user.id, projectId },
    });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this project" });
    }

    const application = await prisma.application.create({
      data: { studentId: req.user.id, projectId, status: "pending" },
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error applying for project", error: error.message });
  }
};

// Approve or Reject Application (Faculty only)
export const handleApplication = async (req, res) => {
  if (req.user.role !== "faculty") {
    return res.status(403).json({ message: "Only faculty can approve or reject applications" });
  }

  try {
    const { applicationId, status } = req.body;
    if (!applicationId || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid application ID or status" });
    }

    // Check if the application belongs to a project created by the faculty member
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { project: true },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.project.facultyId !== req.user.id) {
      return res.status(403).json({ message: "You can only update applications for your projects" });
    }

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });

    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error: error.message });
  }
};

