export const paymentConfig = {
  banco: process.env.NEXT_PUBLIC_BANK_NAME || "[Nombre del Banco]",
  beneficiario: process.env.NEXT_PUBLIC_PAYEE_NAME || "[Nombre del Tesorero/a]",
  clabe: process.env.NEXT_PUBLIC_CLABE || "[Tu Número de CLABE]",
  concepto: process.env.NEXT_PUBLIC_TRANSFER_CONCEPT || "Rifa Siera Code",
};