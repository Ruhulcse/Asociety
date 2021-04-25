const asyncHandler = require('express-async-handler');
const Project = require("../model/project")

//@Desc Create new project
//@route POST/api/project
//@access private
exports.createProject = asyncHandler(async(req,res) => {

    const type = req.body.imageurl.split(';')[0].split('/')[1];
    let base64Data = req.body.imageurl.replace(/^data:image\/png;base64,/, "");
    let fileName = req.body.projecturl;
        fileName+='.'+type;
    let FilePath = `./images/${fileName}`
    require("fs").writeFile(FilePath, base64Data, 'base64', function(err) {
      console.log(err);
    });
    req.body.imageurl = fileName;

    const {title,projecturl,partnerproject,imageurl} = req.body

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
        res.json({message: error});
    }
});

//@Desc fetch all project
//@route POST/api/project
//@access public
exports.getAllProjects = asyncHandler(async(req,res)=>{
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.json({message: error})
    }
})
