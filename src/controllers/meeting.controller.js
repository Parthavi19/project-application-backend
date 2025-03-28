import prisma from "../config/db.js";

// Schedule a meeting
export const scheduleMeeting = async (req, res) => {
  const { facultyId, projectId, date } = req.body;
  if (req.user.role !== "student") return res.status(403).json({ message: "Only students can schedule meetings" });

  const meeting = await prisma.meeting.create({
    data: { studentId: req.user.id, facultyId, projectId, date: new Date(date) },
  });

  res.status(201).json(meeting);
};

// Get all meetings for a user
export const getMeetings = async (req, res) => {
  const meetings = await prisma.meeting.findMany({
    where: { OR: [{ studentId: req.user.id }, { facultyId: req.user.id }] },
    include: { student: true, faculty: true, project: true },
  });

  res.json(meetings);
};

// Cancel a meeting
export const cancelMeeting = async (req, res) => {
  const { meetingId } = req.body;
  await prisma.meeting.update({ where: { id: meetingId }, data: { status: "cancelled" } });
  res.json({ message: "Meeting cancelled" });
};

await sendEmail(faculty.email, "New Meeting Scheduled", `A meeting is scheduled on ${date}.`);

