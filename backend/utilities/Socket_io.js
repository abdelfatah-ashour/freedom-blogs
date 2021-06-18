module.exports = function (io) {
  const { parse } = require("cookie");
  const { decode } = require("jsonwebtoken");
  const {
    addComment,
    deleteCommitArticle,
  } = require("../controllers/articleControllers");

  // start socket io
  io.on("connection", async (socket) => {
    try {
      const token = parse(socket.request.headers.cookie || "");
      if (token.auth_user) {
        const user = await decode(token.auth_user);
        if (user) {
          const _id = user._id;
          socket.join(_id);
          socket.on("addComment", async (comment) => {
            const resultOfNewComment = await addComment(comment);
            io.to(_id).emit("addedComment", resultOfNewComment);
          });
          socket.on("deleteComment", async (data) => {
            await deleteCommitArticle(data.articleId, data.commentId);
          });
        }
      }

      // user is disconnected
      socket.on("disconnect", () => {
        console.log("client disconnected");
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};
