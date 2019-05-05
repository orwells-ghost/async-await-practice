// Look at callback.js first
const posts = [
  { title: 'Post One', body: 'This is post one' },
  { title: 'Post Two', body: 'This is post two' }
];

////////////////////////////
function getPosts() {
  setTimeout(() => {
    let output = '';
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

// Normally, when dealing with Promises, we usually deal just with the repsonse, but it's good to know how to create a Promise yourself
// Instead of passing callback, let's return a promise
function createPost(post) {
  // Promise takes two parameters: resolve and reject
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);

      // we'll just create an error and set it to false, because normally we have some kind of error checking
      const error = false;
      if (!error) {
        resolve();
      } else {
        reject('Error: Something went wrong');
      }
    }, 2000);
  });
}

// createPost returns a Promise, so we use .then and pass in getPosts as the callback, which will run once the Promise has resolved
// createPost({ title: 'Post Three', body: 'This is post three' })
//   .then(getPosts)
//   .catch(err => console.log(err));

////////////////////////////////////////////////

// Promise.all
const promise1 = Promise.resolve('Hello World');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) =>
  setTimeout(resolve, 2000, 'Goodbye')
);
const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(res =>
  res.json()
);

// Promise.all takes in an array of promises. Promise.all will take as much time as the longest promise passed into it
Promise.all([promise1, promise2, promise3, promise4]).then(values =>
  console.log(values)
);

//////////////////////////////////////////////////////

// Async / Await
// await waits until an asynchronous action to complete. In order to use await inside of a function, the function must have the 'async' keyword in front of it
async function init() {
  // The computer will wait until this line is complete before it moves on, thereby ensuring that the new post is created before getPosts is ran
  await createPost({ title: 'Post Three', body: 'This is post three' });
  getPosts();
}

init();

//////////////////////////////////////////////////////

// Async / Await / Fetch
async function fetchUsers() {
  // this async function will wait until fetch has return a Promise to us.
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  // the promise that has been returned by fetch needs to get converted to json
  const data = await res.json();

  console.log(data);
}

fetchUsers();

