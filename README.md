## Introduction

The game consists of three reels that spin when you press the spin button. When the spin ends you will get one of the following three messages based on your winning status:

1. "😢 No match, try again!" if none of the symbols are equal.
2. "👍👍 Nice match! +${winAmount} coins." if two of the symbols are equal.
3. "🎉 JACKPOT! +${winAmount} coins!" if all symbols are equal.

The delivered game is far from complete but is claimed to deliver the above results.

1. Clone this repo
2. Run it with $ npm run start (Latest NodeJs is required)
3. Start the game using http://127.0.0.1:8000

## Assignment - Write Automated Test Cases

You will now write the automated tests as well as instructions on how we can run them from our side. What tools and framework you use is up for you to decide as long as we are able to run the same set of tests.

## Solution

- Switched from static web server to Vite (to be able to use javascript modules)
- Runs test with Vitest

## Usage

```
// Install vitest
npm install -D vitest

// Run tests
npm test

// Run app:
npm start
```
