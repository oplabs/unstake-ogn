type ValueType = string | number | bigint | boolean;

export function bigintToFloat(value: ValueType, decimals: number = 18): number {
  try {
    const bigintValue = BigInt(value);
    const factor = BigInt(10 ** decimals);
    const integralPart = bigintValue / factor;
    const fractionalPart = bigintValue % factor;
    const fractionalAsString = fractionalPart
      .toString()
      .padStart(decimals, '0'); // Ensure 18 decimal places

    // Combine integral and fractional parts and convert to a floating-point number
    return parseFloat(integralPart.toString() + '.' + fractionalAsString);
  } catch {
    return 0;
  }
}

export function formatEth(value: ValueType, round = false, digits = 4) {
  if (round) {
    return bigintToFloat(value).toLocaleString(undefined, {
      maximumFractionDigits: digits,
    });
  }

  const number = bigintToFloat(value)
    .toLocaleString(undefined, {
      maximumFractionDigits: 18,
    })
    .split('.');

  if (number.length === 1) {
    return number[0];
  }

  return `${number[0]}.${number[1].slice(0, 4)}`;
}
