const express = require("express");
const sql = require("mssql");
const bodyParser = require('body-parser');
const port = 3000; 
const verifyToken = require("./helpers/verifyToken");
const crypto = require('crypto');

const app = express(); //Main express app
const router = express.Router(); 
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json());

// SQL Server configuration
var config = {
  "user": "sqlserver", // Database username
  "password": "computines", // Database password
  "server": "34.69.60.15", // Server IP address
  "database": "restec-db", // Database name
  "options": {
      "encrypt": false // Disable encryption
  }
};

// Connect to SQL Server
sql.connect(config, err => {
  if (err) {
      throw err;
  }
  console.log("Connection Successful!");
});


const booking = require("./controllers/bookingController");
router.get("/allScheduleSlots", booking.allScheduleSlots); 
router.get("/availableScheduleSlots", booking.availableScheduleSlots); 
router.get("/getScheduleSlotsByAdminId", booking.getScheduleSlotsByAdminId); 
router.get("/userScheduleSlots", booking.userScheduleSlots); 
router.get("/bookedScheduleSlots", booking.bookedScheduleSlots); 
router.put("/bookScheduleSlot", booking.bookScheduleSlot); 
router.put("/cancelScheduleSlot", booking.cancelScheduleSlot); 
router.put("/updateScheduleSlotQuantity", booking.updateScheduleSlotQuantity); 
router.delete("/deleteScheduleSlot", booking.deleteScheduleSlot); 
router.post("/createScheduleSlot", booking.createScheduleSlot); 

app.use(router); 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = {
    app
};