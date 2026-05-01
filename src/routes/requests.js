const express = require("express");
const router = express.Router();

const {
  createRequest,
  acceptRequest,
  rejectRequest,
  getRequests,
} = require("../controllers/requestController");

/*router.get("/", (req, res) => {
  res.send("requests working");
});
// create request
router.post("/", createRequest);

// accept request
router.patch("/:id/accept", acceptRequest);
// reject request
router.patch("/:id/reject", rejectRequest);

router.get("/", (req, res) => {
  res.json({ message: "requests route working" });
});

module.exports = router;*/

// create
router.post("/", createRequest);

// get all
router.get("/", getRequests);

// accept
router.patch("/:id/accept", acceptRequest);

// reject
router.patch("/:id/reject", rejectRequest);

module.exports = router;
