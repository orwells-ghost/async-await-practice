const posts = [
  { title: 'Post One', body: 'This is post one' },
  { title: 'Post Two', body: 'This is post two' }
];

// The use of a setTimeout function is to mimic a fetch from a server (API)
function getPosts() {
  setTimeout(() => {
    // create empty string
    let output = '';
    // loop through posts and concatenate onto output
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    // insert output onto body element
    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post, callback) {
  setTimeout(() => {
    // push new post into posts 
    posts.push(post);
    // call getPosts function
    callback();
  }, 2000);
}

// by passing getPosts into the createPost function as a callback, when we can ensure that the posts won't be added to the page until after the new post has been created
createPost({ title: 'Post Three', body: 'This is post three' }, getPosts);
