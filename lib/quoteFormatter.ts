import { ItemWithPrice } from './priceList';

export function formatQuote(items: ItemWithPrice[]): string {
  const foundItems = items.filter((item) => item.found && item.price);
  const notFoundItems = items.filter((item) => !item.found || !item.price);

  let message = '📋 *Your Quote*\n\n';

  if (foundItems.length > 0) {
    let grandTotal = 0;

    foundItems.forEach((item) => {
      const itemLine = `• ${item.matchedName}: ${item.quantity} ${item.unit} × ₹${item.price} = *₹${item.totalPrice?.toFixed(2)}*\n`;
      message += itemLine;
      grandTotal += item.totalPrice || 0;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Total: ₹${grandTotal.toFixed(2)}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━\n\n`;
  }

  if (notFoundItems.length > 0) {
    message += '❌ *Items Not Found:*\n';
    notFoundItems.forEach((item) => {
      message += `• ${item.item} (${item.quantity} ${item.unit})\n`;
    });
    message += '\nPlease contact us for pricing on these items.\n\n';
  }

  message += '📝 *Note:* Prices are indicative. Final price and availability will be confirmed upon order.\n\n';
  message += '💬 Reply with any changes or confirm your order!';

  return message;
}
