const asyncHandler = require("express-async-handler");
const Project = require("../model/project");
var psl = require("psl");
//@Desc Create new project
//@route POST/api/project
//@access private
exports.createProject = asyncHandler(async (req, res) => {
  const { title, projecturl, partnerproject, imageurl } = req.body;
  console.log(req.body);
  const project = new Project({
    title,
    projecturl,
    imageurl,
    partnerproject,
  });
  try {
    const SavedProject = await project.save();
    res.status(201).json(SavedProject);
  } catch (error) {
    res.json({ message: error });
  }
});

//@Desc fetch all project
//@route POST/api/project
//@access public
exports.getAllProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.json({ message: error });
  }
});
