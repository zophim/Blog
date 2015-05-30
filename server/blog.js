Meteor.startup(function () {
  Meteor.publish("posts", function () {
    return Posts.find({});
  });
});

Meteor.methods({
  addPost: function (post) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Posts.insert({
      title: post.title,
      content: post.content,
      createdAt: new Date(),
      owner: Meteor.userId()
    });
  }
});
