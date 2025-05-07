let message = document?.getElementById?.("message");
let coinDisplay = document?.getElementById?.("coins");

export const symbols = ["🍒", "🍋", "🍉", "🍊", "⭐", "7️⃣"];

export const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
];

export const state = {
  balance: 1000,
};

export function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

export function updateBalanceDisplay() {
  if (coinDisplay) {
    coinDisplay.textContent = state.balance;
  }
}

export function evaluate([s1, s2, s3], bet) {
  let winAmount = 0;
  
  if (s1 === s2 && s2 === s3) {
    winAmount = bet * 10;
    message.textContent = `🎉 JACKPOT! +${winAmount} coins!`;
    highlightAll();
  } else if (s1 === s2 || s2 === s3 || s1 === s3) {
    winAmount = bet * 2;
    message.textContent = `👍 Nice match! +${winAmount} coins.`;
    highlightMatches(s1, s2, s3)
  } else {
    message.textContent = "😢 No match, try again!";
  }

  state.balance += winAmount;
  updateBalanceDisplay();
}

function highlightAll() {
  reels.forEach((reel) => reel.classList.add("highlight"));
}

function highlightMatches(s1, s2, s3) {
  if (s1 === s2)
    reels[0].classList.add("highlight"),
      reels[1].classList.add("highlight");
  if (s2 === s3)
    reels[1].classList.add("highlight"),
      reels[2].classList.add("highlight");
  if (s1 === s3)
    reels[0].classList.add("highlight"),
      reels[2].classList.add("highlight");
}
