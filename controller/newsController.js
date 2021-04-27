const asyncHandler = require('express-async-handler');
const News = require("../model/NewsModel")

//@Desc Create new news
//@route POST/api/news
//@access private
exports.createNews = asyncHandler(async(req,res) => {

    // const type = req.body.imageurl.split(';')[0].split('/')[1];
    // let base64Data = req.body.imageurl.replace(/^data:image\/png;base64,/, "");
    // let fileName = req.body.projecturl;
    //     fileName+='.'+type;
    // let FilePath = `./images/${fileName}`
    // require("fs").writeFile(FilePath, base64Data, 'base64', function(err) {
    //   console.log(err);
    // });
    // req.body.imageurl = fileName;

    const {title,videourl,text} = req.body

    const news = new News({
        title,
        videourl,
        text,
    });
    try {
        const SavedNews = await news.save();
        res.status(201).json(SavedNews);
    } catch (error) {
        res.json({message: error});
    }
});

//@Desc fetch all project
//@route POST/api/project
//@access public
exports.getAllNews = asyncHandler(async(req,res)=>{
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.json({message: error})
    }
})
