const express = require("express");
const router = express.Router();
const meetingcontroller = require("../controller/meetingcontroller");

router.post("/addmeeting", meetingcontroller.addMeeting);
router.get("/list-meeting", meetingcontroller.getMeetings);
router.put("/editmeetings/:id", meetingcontroller.editMeeting); // edit meeting (not participants)
router.put("/meetings/:id/participants", meetingcontroller.updateParticipants); // add/remove participants
router.put("/meetings/:id/attendance", meetingcontroller.updateAttendance);
router.put("/end-meeting/:id", meetingcontroller.fetchTranscriptionAndSave);
router.put("/update-status/:id", meetingcontroller.updateMeetingStatus);
router.delete("/deletemeeting/:id", meetingcontroller.deleteMeeting);

module.exports = router;
