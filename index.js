const MAX_COMMENT_LENGH = 140;
const comments = [];

const addCommentBtn = document.querySelector('#add-comment');
const modal = document.querySelector('.modal');
const form = document.querySelector('#form');
const input_text = form.querySelector('#user_text');
const submitBtn = form.querySelector('.btn-add');
const cancelBtn = form.querySelector('.btn-cancel');
const ul = document.querySelector('.comment-list');
const p = document.createElement('p');
const text_length=document.querySelector('#text_length');
p.innerHTML = 'No comments yet';
p.classList.add('blank');
ul.append(p);

const showModal = () => {
  addCommentBtn.classList.add('hidden');
  modal.classList.remove('hidden');
  modal.scrollIntoView({ behavior: 'smooth' }, false);
};

const hideModal = () => {
  addCommentBtn.classList.remove('hidden');
  form.reset();
  modal.classList.add('hidden');
  text_length.innerHTML = `${MAX_COMMENT_LENGH}`;
};

const showError = (el) => {
  el.classList.add('error');
  el.addEventListener('focus', focusEventHandler);
};

const cancelHandler = () => {
  const inputs = form.querySelectorAll('input');
  for (const input of inputs) {
    input.classList.remove('error');
  }
  input_text.classList.remove('error');
  hideModal();
};

const focusEventHandler = (ev) => {
  const elem = ev.target;
  if (elem.classList.contains('error')) {
    elem.classList.remove('error');
  }
};

const renderTextLength = (ev) => {
  const length = ev.target.value.length;
  if (length > MAX_COMMENT_LENGH && !input_text.classList.contains('error')) {
    input_text.classList.add('error');
    submitBtn.disabled = true;
  }
  if (length <= MAX_COMMENT_LENGH && input_text.classList.contains('error')) {
    input_text.classList.remove('error');
    submitBtn.disabled = false;
  }
  text_length.innerHTML = `${length}/${MAX_COMMENT_LENGH}`;
};

const submitHandler = (ev) => {
  ev.preventDefault();
  const user_name = ev.target[0];
  const name = user_name.value.trim();
  const user_email = ev.target[1];
  const email = user_email.value;
  const user_comment = ev.target[2];
  const text = user_comment.value.trim();

  const validateComment = {
    name: name.length > 1,
    email: email.length !== 0,
    text: text.length !== 0,
  };

  if (validateComment.name && validateComment.email && validateComment.text) {
    const userInputs = new Comment(name, email, text);
    if (comments.length === 0) {
      ul.removeChild(p);
    }
    comments.push(userInputs);

    renderComment(userInputs);
    hideModal();
  } else {
    if (!validateComment.name) {
      showError(user_name);
    }
    if (!validateComment.email) {
      showError(user_email);
    }
    if (!validateComment.text) {
      showError(user_comment);
    }
  }
};

const renderComment = (userInputs) => {
  const template = document.querySelector('.template').content.cloneNode(true);
  const li = template.querySelector('li');
  const user_name = li.querySelector('h4');
  const user_text = li.querySelector('div');
  user_name.innerHTML = userInputs.name;
  user_text.innerHTML = userInputs.text;
  li.setAttribute('id', userInputs.id);

  ul.append(li);
};

const deleteComment = (id) => {
  document.getElementById(id).remove();
  const idx = comments.findIndex((el) => el.id === Number(id));
  comments.splice(idx, 1);
  if (comments.length === 0) {
    ul.append(p);
  }
};

addCommentBtn.addEventListener('click', showModal);
input_text.addEventListener('input', renderTextLength);
cancelBtn.addEventListener('click', cancelHandler);
form.addEventListener('submit', submitHandler);

ul.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete')) {
    deleteComment(event.target.closest('li').id);
  }
});
