import { describe, it, expect, beforeEach } from "vitest";
import { evaluate, state, reels, getRandomSymbol, symbols } from "../static/slots.js";

describe("Slots", () => {
  beforeEach(() => {
    state.balance = 1000;
    reels.forEach(reel => {
      reel.classList.remove("highlight")
    });
  });

  it("should update balance on jackpot", () => {
    evaluate(["🍋", "🍋", "🍋"], 50);
    expect(document.getElementById("message").textContent).toContain("JACKPOT");
    expect(document.getElementById("coins").textContent).toBe("1500");
    reels.forEach(reel => {
      expect(reel.className).toBe("reel highlight")
    });
  });

  it("should update balance when first two reels are equal", () => {
    evaluate(["🍒", "🍒", "🍋"], 50);
    expect(document.getElementById("message").textContent).toContain("👍 Nice match");
    expect(document.getElementById("coins").textContent).toBe("1100");
    expect(reels[0].className).toBe("reel highlight")
    expect(reels[1].className).toBe("reel highlight")
    expect(reels[2].className).toBe("reel")
  });

  it("should update balance when last two reels are equal", () => {
    evaluate(["🍋", "🍒", "🍒"], 50);
    expect(document.getElementById("message").textContent).toContain("👍 Nice match");
    expect(document.getElementById("coins").textContent).toBe("1100");
    expect(reels[0].className).toBe("reel")
    expect(reels[1].className).toBe("reel highlight")
    expect(reels[2].className).toBe("reel highlight")
  });

  it("should update balance when first and last reels are equal", () => {
    evaluate(["🍒", "🍋", "🍒"], 50);
    expect(document.getElementById("message").textContent).toContain("👍 Nice match");
    expect(document.getElementById("coins").textContent).toBe("1100");
    expect(reels[0].className).toBe("reel highlight")
    expect(reels[1].className).toBe("reel")
    expect(reels[2].className).toBe("reel highlight")
  });

  it("should not update balance when all reels are different", () => {
    evaluate(["🍒", "🍋", "🍉"], 50);
    expect(document.getElementById("message").textContent).toContain("😢 No match");
    expect(document.getElementById("coins").textContent).toEqual(state.balance.toString())
    reels.forEach(reel => {
      expect(reel.className).toBe("reel")
    });
  });

  it("should get a random symbol from the symbol list", () => {
    let s = getRandomSymbol();
    expect(symbols.includes(s))
  });
});
