import { Transaction } from "@interfaces/index";

export async function getAllTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch("../../../transactions.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return [];
  }
}

export function calculateTotalAmount(transactions: Transaction[]): string {
  if (transactions.length === 0) {
    return "0.00";
  }

  const totalTransactions = transactions.reduce((total, transaction) => {
    return total + parseFloat(transaction.amount) / 100;
  }, 0);

  return totalTransactions.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function calculateTotalTransactions(transactions: Transaction[]): number {
  return transactions.length;
}

export function calculateTotalDeposits(transactions: Transaction[]): number {
  return transactions.filter(transaction => transaction.transaction_type === "deposit").length;
}

export function calculateTotalWithdrawals(transactions: Transaction[]): number {
  return transactions.filter(transaction => transaction.transaction_type === "withdraw").length;
}

export function calculateUniqueIndustriesCount(transactions: Transaction[]): number {
  const uniqueIndustries = new Set(transactions.map(transaction => transaction.industry));
  return uniqueIndustries.size;
}

export function calculateTransactionByIndustry(transactions: Transaction[]): { name: string; value: number }[] {
  const industryCounts = new Map<string, number>();
  transactions.forEach(transaction => {
    const count = industryCounts.get(transaction.industry) || 0;
    industryCounts.set(transaction.industry, count + 1);
  });
  return Array.from(industryCounts.entries()).map(([industry, count]) => ({ name: industry, value: count }));
}

export function calculateTransactionByState(transactions: Transaction[]): { name: string; value: number }[] {
  const stateCounts = new Map<string, number>();
  transactions.forEach(transaction => {
    const count = stateCounts.get(transaction.state) || 0;
    stateCounts.set(transaction.state, count + 1);
  });
  return Array.from(stateCounts.entries()).map(([state, count]) => ({ name: state, value: count }));
}

export function calculateTransactionByAccount(transactions: Transaction[]): { name: string; value: number }[] {
  const accountCounts = new Map<string, number>();
  transactions.forEach(transaction => {
    const count = accountCounts.get(transaction.account) || 0;
    accountCounts.set(transaction.account, count + 1);
  });
  return Array.from(accountCounts.entries()).map(([account, count]) => ({ name: account, value: count }));
}

export function calculateTransactionByMonthYear(
  transactions: Transaction[],
): { name: string; Depositos: number; Despesas: number }[] {
  const monthYearData = new Map<string, { Depositos: number; Despesas: number }>();

  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

    const existingData = monthYearData.get(monthYear) || { Depositos: 0, Despesas: 0 };

    if (transaction.transaction_type === "deposit") {
      existingData.Depositos += parseFloat(transaction.amount) / 100;
    } else if (transaction.transaction_type === "withdraw") {
      existingData.Despesas += parseFloat(transaction.amount) / 100;
    }

    monthYearData.set(monthYear, existingData);
  });

  const sortedMonthYearData = Array.from(monthYearData.entries()).sort((a, b) => {
    const [monthYearA] = a;
    const [monthYearB] = b;
    const [monthA, yearA] = monthYearA.split("/");
    const [monthB, yearB] = monthYearB.split("/");
    return parseInt(yearA) - parseInt(yearB) || parseInt(monthA) - parseInt(monthB);
  });

  return sortedMonthYearData.map(([monthYear, { Depositos, Despesas }]) => ({
    name: monthYear,
    Depositos,
    Despesas,
  }));
}
