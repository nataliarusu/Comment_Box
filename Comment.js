function Comment(name, email, text) {
    this.name = name;
    this.email = email;
    this.text = text;
    this.id=Comment.prototype.addCount();
    // this.id=commentsCount;
  }
  Comment.prototype={
    count:0,
    addCount: function(){
      this.count++;
      return this.count;
    }
  };

  