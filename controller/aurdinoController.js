
 let esp32Status = {
  meetingId: null,
  meetingCount: 0,
  recordingStatus: "stopped", // or "recording"
};   // Store latest status
let pendingCommands = []; 

const aurdinoStatues = (req, res) => {
  const { meetingId, meetingCount, recordingStatus } = req.body;
  if (
    typeof meetingId !== 'string' ||
    typeof meetingCount !== 'number' ||
    typeof recordingStatus !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid status payload' });
  }

  esp32Status.meetingId = meetingId;
  esp32Status.meetingCount = meetingCount;
  esp32Status.recordingStatus = recordingStatus;

  return res.json({ success: true });

};

const sendCommand = (req, res) => {
  const cmd = req.body;
  console.log(req.body)
  pendingCommands.push(cmd);
  res.send({ success: true });
};
const fetchCommand = (req, res) => {
  const commandsToSend = [...pendingCommands];
  console.log("commandsToSend",commandsToSend)
  pendingCommands = [];
  res.json(commandsToSend);
};
const getStatus =  (req, res) => {
  res.json(esp32Status);
}
module.exports = {
aurdinoStatues,getStatus,fetchCommand,sendCommand
}
