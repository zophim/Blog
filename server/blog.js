if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.publish("posts", function () {
      return Posts.find({});
    });
  });
}

Meteor.methods({
  addPost: function (title, content) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Posts.insert({
      title: title,
      content: content,
      createdAt: new Date(),
      owner: Meteor.userId()
    });
  }
});
