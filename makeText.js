/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** Create Markov chain generator from text and produce output. */

function generateMarkovText(text) {
  const mach = new markov.MarkovMachine(text)
  console.log(mach.createTextFromFile());
}

/** Read file and produce Markov text from it. */

function createTextFromFile(filePath) {
  fs.readFile(filePath, "utf8", function dd(error, data) => {
    if (error) {
      console.error(`Error reading file: ${filePath}: ${error}`);
      process.exit(1);
    } else {
      generateMarkovText(data);
    }
  });
}

/** Read URL and produce Markov text from it. */

async function createTextFromURL(url) {
  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    console.error(`Error reading URL: ${url}: ${error}`);
    process.exit(1);
  }
  generateMarkovText(response.data);
}

/** Interpret command line arguments to decide action. */

const [action, path] = process.argv.slice(2);

if (action === "file") {
  createTextFromFile(path);
} else if (action === "url") {
  createTextFromURL(path);
} else {
  console.error(`Unknown action: ${action}`);
  process.exit(1);
}


