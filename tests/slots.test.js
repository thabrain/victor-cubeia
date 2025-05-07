import { describe, it, expect, beforeEach, vitest } from "vitest";
import { evaluate, state, reels, getRandomSymbol, symbols, spin } from "../static/slots.js";

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

  it("should get a random symbol from the symbols list", () => {
    let s = getRandomSymbol();
    expect(symbols.includes(s))
  });

  it("should render an alert message when stake is below 1", () => {
    document.body.innerHTML = `
      <input id="bet" value="0" />
    `;
    
    window.alert = vitest.fn();
    spin();
    expect(window.alert).toHaveBeenCalledOnce();
  });

  it("should render an alert message when having not enough coins", () => {
    document.body.innerHTML = `
      <input id="bet" value="10000" />
    `;
    
    window.alert = vitest.fn();
    spin();
    expect(window.alert).toHaveBeenCalledOnce();
  });
});
