export function ksh(amount: number) {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

export function compactCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "")}k`;
  return String(n);
}
