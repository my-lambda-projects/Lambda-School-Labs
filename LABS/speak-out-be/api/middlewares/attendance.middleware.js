const { catchAsync } = require('../utils/catchAsync');

const Attendance = require('../models/attendance.model');

const checkIfMeetingExists = catchAsync(async (req, res, next) => {
	const { meeting } = req.body;
	const response = await Attendance.findMeeting(meeting.meeting_date, meeting.course_id);
	if (response && response.id) {
		req.meetingId = response.id;
	}
	next();
});

module.exports = {
	checkIfMeetingExists
};
