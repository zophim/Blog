Meteor.subscribe("posts");

Template.body.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1 }});
  }
});

Template.body.events({
  "submit .new-post": function (event) {
    var post = {
      title: event.target.title.value,
      content: $(event.target).find('#summernote').code()
    }
    console.log(post);

    Meteor.call("addPost", post);

    event.target.title.value = "";
    event.target.content.value = "";

    return false;
  }
});

Template.createPost.onRendered(function () {
  $('#summernote').summernote({
    onImageUpload: function (files, editor, welEditable) {
      sendFile(files[0], editor, welEditable);
    }
  });
});

Accounts.ui.config({
  passwordSignupFields: "EMAIL_ONLY"
});

