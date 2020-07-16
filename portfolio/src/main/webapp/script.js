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

function randomMessage(){
  console.log('Inside randomMessage function.. ');
  
  console.log('calling /data to get that special message..');

  fetch('/data')
  .then(response => response.json())
  .then(messages => {

  console.log('Message is successfully fetched...');

  const messageListElement = document.getElementById('msg-container');
  messageListElement.innerHTML = '';
  messageListElement.appendChild(
    createListElement('First Message: ' + messages[0]));
  messageListElement.appendChild(
    createListElement('Second Message: ' +  messages[1]));
  messageListElement.appendChild(
    createListElement('Third Message: ' +  messages[2]));

  console.log('Succesfully added the messages in portfolio');
  });
} 

function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
