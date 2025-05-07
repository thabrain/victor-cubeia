let message = document.getElementById("message");
let coinDisplay = document.getElementById("coins");
let spinBtn = document.getElementById("spinBtn");
let isSpinning = false;

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

function updateBalanceDisplay() {
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

export function spin() {
    if (isSpinning) return;

    const bet = parseInt(document.getElementById("bet").value);
    if (isNaN(bet) || bet < 1) {
      alert("Enter a valid bet amount.");
      return;
    }

    if (bet > state.balance) {
      alert("Not enough coins!");
      return;
    }

    isSpinning = true;
    spinBtn.disabled = true;
    message.textContent = "";
    reels.forEach((reel) => reel.classList.remove("highlight"));

    state.balance -= bet;
    updateBalanceDisplay();

    let finalSymbols = [];

    reels.forEach((reel, index) => {
      let spins = 10 + index * 5;
      let i = 0;

      const spinInterval = setInterval(() => {
        reel.textContent = getRandomSymbol();
        i++;
        if (i >= spins) {
          clearInterval(spinInterval);
          finalSymbols[index] = reel.textContent;

          if (finalSymbols.filter(Boolean).length === 3) {
            evaluate(finalSymbols, bet);
            isSpinning = false;
            setTimeout(() => {
              spinBtn.disabled = false;
            }, 1500); // Cooldown after spin
          }
        }
      }, 100);
    });
}
