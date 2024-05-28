/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chn = new Map();
	
	for (let i = 0; i < this.words.length; i += 1){
		let wrd = this.words[i];
		let nxt = this.words[i + 1] || null;
		
		if (chn.has(wrd)) chn.get(wrd).push(nxt);
		else chn.set(wrd, [nxt]);
	}
	this.chn = chn;
  }
  
  static randChoice(a){
	  return a[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
	let key = MarkovMachine.choice(keys);
	let output = []
	
	while (output.length < numWords && key !== null){
		output.push(key);
		key = MarkovMachine.choice(this.chains.get(key));
	}
	return out.join("");
  }
}

module.exports = {
	MarkovMachine,
};
