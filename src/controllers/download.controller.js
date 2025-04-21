import prisma from "../config/db.js";
import { Parser } from "json2csv";

export const downloadStudentProjectData = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "faculty") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const students = await prisma.user.findMany({
    where: { role: "student" },
    include: { applications: { include: { project: true } } },
  });

  const data = students.map((s) => {
    const application = s.applications[0]; // Assuming one project per student
    const status = application?.status || "Not Applied";
    const projectTitle = application?.project?.title || "N/A";

    return {
      name: s.name,
      email: s.email,
      project: projectTitle,
      status,
    };
  });

  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("student-project-status.csv");
  return res.send(csv);
};

