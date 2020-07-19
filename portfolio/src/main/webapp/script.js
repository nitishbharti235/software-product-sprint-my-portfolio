// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random quote to the page.
 */
function addRandomQuote() {
   const quotes = [
       'In choosing both, you lose both.',
       'We need to have a mask that we never take off',
       'When you\'re in front of the enemy, even if your hands are trembling - fight.',
       'There\'s no way someone who can\'t even protect himself can protect anyone else, is there?',
       'All of the disadvantages in this world stems from a person\'s lack of ability',
       'The world runs on power. Everything is determined by the superior power. You are weak. That is why you lose',
       'All suffering in the world is born from an individual\'s incompetence',
       'As long as it\'s for the right cause, there\'s nothing wrong with playing dirty.',
       'We can only live while we lose'
   ]   ;

  // Pick a random quote.
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerText = quote;
}

function getComments() {
  console.log('Inside getComments() function...');
  console.log('fetching comments by calling /data');

  fetch('/data')
  .then(response => response.json())
  .then(comments => {

    const commentContainer = document.getElementById('comment-container');
    comments.forEach((comment) => {
      commentContainer.appendChild(createListElement(comment));
    });
    commentContainer.appendChild( getClrDivElement() );

    console.log('Comments are successfully added...');
  });
}

function createListElement(commentObj) {
  const liElement = document.createElement('li');
  var comment = commentObj.comment;
  var sentimentScore = commentObj.sentimentScore;
  
  liElement.appendChild( getParaComment(comment) );
  liElement.appendChild( getParaSentimentScore(sentimentScore) );
  
  return liElement;
}
 
function getParaComment(comment) {
  var paragraph = createParaElement(comment);
  paragraph.className = "comment"

  return paragraph;
}

function getParaSentimentScore(sentimentScore) {
  sentimentScore =  Math.round(sentimentScore * 10) / 10;
  var score = sentimentScore.toString();
  score = "sentiment score: "+score;

  var paragraph = createParaElement(score);
  paragraph.className = "sentiment";

  return paragraph;
}

function createParaElement(comment) {
  var para = document.createElement("P");                       
  var t = document.createTextNode(comment);
  para.appendChild(t);

  return para;
}

function getClrDivElement() {
  var div = document.createElement("div");
  div.className = "clr";
  
  return div;
}