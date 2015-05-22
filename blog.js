Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
  Meteor.subscribe("posts");

  Template.body.helpers({
    posts: function () {
      return Posts.find({}, {sort: {createdAt: -1 }});
    }
  });

  Template.body.events({
    "submit .new-post": function (event) {
      var title = event.target.title.value;
      var content = event.target.content.value;

      Meteor.call("addPost", title, content);

      event.target.title.value = "";
      event.target.content.value = "";

      return false;
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });
}

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
