const express = require("express");
const router = express.Router();
const role = require("../middleware/role");
const auth = require("../middleware/auth");
const {
  createRequest,
  acceptRequest,
  rejectRequest,
  getRequests,
  getRequestsForFood,
  markPickedUp,
} = require("../controllers/requestController");
// create
router.post("/", auth, role("charity"), createRequest);

// get all
router.get("/", auth, role("charity"), getRequests);

// accept
router.patch("/:id/accept", auth, role("restaurant"), acceptRequest);

// reject
router.patch("/:id/reject", auth, role("restaurant"), rejectRequest);

//get requests for reastaurant
router.get("/food/:foodId", auth, role("restaurant"), getRequestsForFood);
// Tracking
router.put("/:id/pickup", auth, markPickedUp);

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ requester: req.user._id }).populate(
      "food",
    );

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
module.exports = router;
