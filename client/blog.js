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

