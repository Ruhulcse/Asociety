const asyncHandler = require("express-async-handler");
const News = require("../model/NewsModel");

//@Desc Create new news
//@route POST/api/news
//@access private
exports.createNews = asyncHandler(async (req, res) => {
  console.log("requested");
  console.log(req.body);
  // const type = req.body.image.split(';')[0].match(/jpeg|png|gif/)[0];
  // let base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
  // let fileName = req.body.title;
  //     fileName+='.'+type;
  // let FilePath = `./images/${fileName}`
  // require("fs").writeFile(FilePath, base64Data, 'base64', function(err) {
  //   console.log(err);
  // });
  // req.body.image = fileName;

  const { title, videourl, text, image } = req.body;

  const news = new News({
    title,
    videourl,
    text,
    image,
  });
  try {
    const SavedNews = await news.save();
    res.status(201).json(SavedNews);
  } catch (error) {
    res.json({ message: error });
  }
});

//@Desc fetch all project
//@route POST/api/news
//@access public
exports.getAllNews = asyncHandler(async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.json({ message: error });
  }
});

//@Desc fetch single news
//@route POST/api/news
//@access public
exports.getSingleNews = asyncHandler(async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (news == null) {
      res.status(404);
      res.send("news not found");
    } else {
      res.json(news);
    }
  } catch (error) {
    res.json({ message: error });
  }
});
