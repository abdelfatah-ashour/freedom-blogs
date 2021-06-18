const Article = require("../models/articleModel");
const Notification = require("../models/notification");
const { articleValid } = require("../utilities/validAuth");
const { loggerError } = require("../utilities/winston");
const { pick } = require("lodash");

module.exports = {
  // create new article
  createNewArticle: async (req, res) => {
    try {
      const { head, category, content } = req.body;
      const { error } = articleValid({
        head,
        category,
      });
      // check any error and reject it
      if (error)
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });

      // create new article
      const newArticle = new Article({
        author: req.user._id,
        head,
        category,
        content,
        imageOfArticle: req.file.filename,
      });

      await newArticle.save((error) => {
        if (error) throw new Error(error);
      });

      return res.status(201).json({
        success: false,
        message: "🚀 article posted",
      });
    } catch (error) {
      loggerError.error(error.message);
      return res.status(400).json({
        success: false,
        message: "something wrong .. try again",
      });
    }
  },
  getArticlesWithCategory: async (req, res) => {
    try {
      const { category, count } = req.query;
      const limit = 5;
      const initPage = 1;
      if (!count) {
        await Article.find({ category })
          .limit(limit)
          .exec((error, response) => {
            if (error) throw new Error(error);
            return res.status(200).json({
              success: true,
              message: response,
            });
          });
      } else {
        const skipped = (+count - initPage) * limit;
        await Article.find({ category })
          .skip(skipped)
          .limit(limit)
          .exec((error, response) => {
            if (error) throw new Error(error);
            return res.status(200).json({
              success: true,
              message: response,
            });
          });
      }
    } catch (error) {
      loggerError.error(error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  getHomeArticles: async (req, res) => {
    try {
      const newsWorld = await Article.find({
        category: "news-world",
      }).limit(4);
      const business = await Article.find({ category: "business" }).limit(4);
      const sports = await Article.find({ category: "sports" }).limit(4);
      const travel = await Article.find({ category: "travel" }).limit(4);
      const style = await Article.find({ category: "style" }).limit(4);
      const health = await Article.find({ category: "health" }).limit(4);

      return res.status(200).json({
        success: true,
        message: [
          ...newsWorld,
          ...business,
          ...sports,
          ...travel,
          ...style,
          ...health,
        ],
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  getOneArticle: async (req, res) => {
    let limit = 5;

    const { count, articleId } = req.query;

    try {
      await Article.findOne(
        { _id: articleId },
        {
          comments: {
            $slice: [count ? +count : 0, count ? +count * limit : limit],
          },
        }
      )
        .populate("author")
        .exec((error, article) => {
          if (error) {
            throw new Error(error);
          }
          if (!article) {
            return res.status(404).json({
              success: false,
              message: "article not found",
            });
          }

          let result = pick(article, [
            "_id",
            "author.username",
            "author.email",
            "imageOfArticle",
            "head",
            "content",
            "comments",
            "createdAt",
            "updatedAt",
            "category",
          ]);
          return res.status(200).json({
            success: true,
            message: result,
          });
        });
    } catch (error) {
      loggerError.error(error.message);
      res.status(500).json({
        success: true,
        message: error.message,
      });
    }
  },
  deleteArticle: async (req, res) => {
    try {
      const { _id } = req.params;
      await Article.findOneAndDelete({ _id }, { new: true }, (error) => {
        if (error) throw new Error(error);
        return res.status(200).json({
          success: true,
          message: "🚀  article deleted",
        });
      });
    } catch (error) {
      loggerError.error(error.message);
      res.status(500).json({
        success: true,
        message: error.message,
      });
    }
  },
  getAllNotifications: async (req, res) => {
    try {
      await Notification.find({ to: req.user._id })
        .populate("to from")
        .limit(5)
        .then((allNotification) => {
          let newArray = allNotification.map((notification) => {
            let result = pick(notification, [
              "to.username",
              "from.username",
              "typeNotification",
              "category",
              "contentNotification",
              "createdAt",
              "updatedAt",
              "articleId",
            ]);
            return result;
          });
          // sorting result from old to new
          newArray.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });

          return res.status(200).json({
            success: true,
            message: newArray,
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      loggerError.error(error.message);
      res.status(500).json({
        success: true,
        message: error.message,
      });
    }
  },
  // <===========================>

  //  start Socket Controllers

  // <===========================>
  addComment: async (comment) => {
    // add comment
    // add new notification
    // return newer notification to author's article
    try {
      // find article and update
      await Article.findOneAndUpdate(
        { _id: comment.articleId },
        {
          $addToSet: {
            comments: {
              userId: comment.from,
              comment: comment.comment,
            },
          },
        },
        { new: true },
        (error) => {
          if (error) throw new Error(error);
        }
      );

      // create new notification
      const newNotification = await new Notification({
        from: comment.from,
        to: comment.to._id,
        typeNotification: "comments",
        articleId: comment.articleId,
        category: comment.category,
        contentNotification: comment.comment,
      });

      return await newNotification.save((error, docs) => {
        if (error) throw new Error(error);
        return docs;
      });
    } catch (error) {
      loggerError.error(Error.message);
    }
  },
  deleteCommitArticle: async (articleId, commentId) => {
    try {
      // find article and update
      await Article.updateOne(
        { _id: articleId, "comments._id": commentId },
        { $pull: { comments: { _id: commentId } } },
        { new: true },
        (error, response) => {
          if (error) throw new Error(error);
          return response;
        }
      );
    } catch (error) {
      loggerError.error(error.message);
    }
  },
};
