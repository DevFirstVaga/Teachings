import { createAccount, deposit, transferMoney, withDraw } from "./account";
import { describe, expect, it, beforeEach } from "vitest";
describe("Account unit tests", () => {
  let sut;
  beforeEach(() => {
    sut = null;
  });

  it("should create account with correct values", () => {
    const fakeAccountData = { name: "conta do Lucas", amount: 100000 };
    sut = createAccount(fakeAccountData.name, fakeAccountData.amount);

    expect(sut.amount).toBe(100000);
  });

  it("should throw error when trying to withdraw bigger amount than account balance", async () => {
    sut = createAccount("conta 1", 100);
    expect(() => withDraw(sut, 100.00000001)).toThrow();
  });

  it("should withdraw correct value", async () => {
    sut = createAccount("conta 1", 1000);
    withDraw(sut, 100);
    expect(sut.amount).toBe(900);
  });

  it("should deposit correct value", async () => {
    sut = createAccount("conta 1", 0);
    deposit(sut, 1000);
    expect(sut.amount).toBe(1000);
  });

  it("should not transfer to another account when trying to transfer higher amount than account balance ", () => {
    sut = createAccount("conta 1", 100);
    let account2 = createAccount("conta 2", 1000);
    expect(() => transferMoney(sut, account2, 101)).toThrow();
  });

  it("should transfer correct values", () => {
    sut = createAccount("conta 1", 1000000);
    let account2 = createAccount("conta 2", 10);
    transferMoney(sut, account2, 999000);
    expect(sut.amount).toBe(1000);
    expect(account2.amount).toBe(999010);
  });
});
