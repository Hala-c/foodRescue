const Request = require("../models/Request");
const Food = require("../models/Food");

//create request
exports.createRequest = async (req, res) => {
  try {
    const { food, message, requester } = req.body;

    // 1. ندور على food بالاسم
    const foodName = await Food.findOne({ name: food });

    // 2. لو مش موجود
    if (!foodName) {
      return res.status(404).json({ message: "Food not found" });
    }

    // 3. نعمل request ونخزن الـ id
    const request = await Request.create({
      food: foodName._id,
      requester: requester || "guest",
      message,
    });

    res.status(201).json(request);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//accept request
exports.acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("food");

    // 1. لو الطلب مش موجود
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // 2. تأكد إن food موجودة
    if (!request.food) {
      return res.status(400).json({ message: "Food not found in request" });
    }

    // 3. تحديث الحالة
    request.status = "accepted";
    await request.save();

    res.json({
      message: "Request accepted successfully",
      request,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//reject request
exports.rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("food");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (!request.food) {
      return res.status(400).json({ message: "Food not found in request" });
    }

    request.status = "rejected";
    await request.save();

    res.json({
      message: "Request rejected successfully",
      request,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//for charity
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      charity: req.user.id,
    }).populate("food");

    res.json(requests);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// for restaurant
exports.getRequestsForFood = async (req, res) => {
  try {
    const { foodId } = req.params;

    const requests = await Request.find({ food: foodId }).populate(
      "charity",
      "name email",
    );

    res.json(requests);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.markPickedUp = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) return res.status(404).json({ msg: "Request not found" });

    if (request.status !== "accepted")
      return res.status(400).json({ msg: "Not approved yet" });

    request.status = "picked_up";
    await request.save();

    res.json({ msg: "Marked as picked up" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
