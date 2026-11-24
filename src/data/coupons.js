// type: "percent" (value = %), "flat" (value = ₹), "shipping" (free delivery).
export const coupons = [
  { code: "WELCOME10", label: "10% off, up to ₹300", type: "percent", value: 10, max: 300, min: 499 },
  { code: "SAVE100", label: "Flat ₹100 off", type: "flat", value: 100, min: 999 },
  { code: "FESTIVE15", label: "15% off, up to ₹500", type: "percent", value: 15, max: 500, min: 1999 },
  { code: "FREESHIP", label: "Free delivery", type: "shipping", value: 0, min: 499 },
];
