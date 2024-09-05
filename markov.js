/** Textual markov chain generator */

// - Take input text.
// - Split the text into words.
// - Loop through the words and create a Markov chain.
// - Pick a random starting word from the chain.
//    - Add the current word to the output.
//    - Pick the next word from the possible words in the chain.
// - Return the generated text.


class MarkovMachine {

    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/); // split text into words + newlines
        this.words = words.filter(c => c !== ""); // filter out empty strings
        this.makeChains(); // build the markov chain
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the":  ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
    //current^ word   ^next possible word

    makeChains() {
        this.chains = {} // initialize empty object to store the chain

        // loop through all words
        for (let i = 0; i < this.words.length; i++) {
            const word = this.words[i]; // get current word
            const nextWord = this.words[i + 1] || null; // next word, or null if no more words

            // check if word is already in the chains object
            if (!this.chains[word]) {
                this.chains[word] = []; // if not create empty array for the word
            }
            // add the next word to the chain
            this.chains[word].push(nextWord);
        }
    }

    static choice(arr) {
        return arr[Math.floor(Math.random() * arr.length)]; // pick random element from array
    }

    /** return random text strings from chains */

    makeText(numWords = 100) {
        let keys = Object.keys(this.chains); // get all keys(starting words) in the chain
        let key = MarkovMachine.choice(keys);  // pick random word to start sentence
        let output = [];

        while (output.length < numWords && key != null) { // while there are still less than 100 words and not null
            output.push(key); // add current word to the output
            key = MarkovMachine.choice(this.chains[key]) // pick next word
        }

        return output.join(" ");
    }
}

module.exports = { MarkovMachine }