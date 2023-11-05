export const getTime = () => {
  const now = new Date();
  return now.toISOString();
};

export const adaptOfferType = (type: string) => type.slice(0, 1).toUpperCase() + type.slice(1);
