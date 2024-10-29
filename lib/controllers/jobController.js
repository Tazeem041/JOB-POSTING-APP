const Job = require("../models/Job");
const { validateJobInput } = require("../utils/validators");

exports.createJob = async (req, res, next) => {
  try {
    const { error } = validateJobInput(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const job = new Job({
      ...req.body,
      createdBy: req.user.id,
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Error in createJob:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};

exports.getAllJobs = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const { error } = validateJobInput(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this job" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedJob);
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this job" });
    }

    await job.deleteOne();
    res.json({ message: "Job removed" });
  } catch (error) {
    next(error);
  }
};
