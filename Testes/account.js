export function createAccount(name, initialAmount) {
  return {
    amount: initialAmount,
    name,
    debit(value) {
      this.amount -= value;
    },
    credit(value) {
      this.amount += value;
    },
  };
}

export function deposit(account, amount) {
  account.credit(amount);
}

export function withDraw(account, amount) {
  if (account.amount < amount) throw new Error();
  account.debit(amount);
}

export function transferMoney(from, to, amount) {
  if (from.amount < amount) throw new Error();
  from.debit(amount);
  to.credit(amount);
}
