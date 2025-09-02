// @ts-expect-error this allows to serialize bigint
BigInt.prototype!.toJSON = function () {
  return this.toString();
};

export {};
