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

      Meteor.call("addPost", title);

      event.target.title.value = "";

      return false;
    },
    "submit .edit-post": function (event) {
      var section = event.target.section.value;
      var postId = event.target.postId.value;
      Meteor.call("addSectionToPost", postId, section);

      event.target.section.value = "";

      return false;
    },
    "click .userEditPosts": function (event) {
      Session.set("userEditPosts", ! Session.get("userEditPosts"));
    }
  });
  Session.set("userEditPosts", false);

  Template.body.userEditPosts = function() {
    return Session.get('userEditPosts');
  };

  Template.editPost.userEditPosts = function() {
    return Session.get('userEditPosts');
  };

  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.publish("posts", function () {
      return Posts.find({}, { sort: { createdAt: -1 }});
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
  },
  addSectionToPost: function (postId, section) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    content = { "sections": section};

    Posts.update(postId, { "$push": content });
  }
});
