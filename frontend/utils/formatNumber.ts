export function formatNumber(
  value: number | string,
  decimals: number = 2,
): string {
  if (value === null || value === undefined || value === "") return "0.00";

  const num = Number(value);

  if (isNaN(num)) return String(value);

  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
