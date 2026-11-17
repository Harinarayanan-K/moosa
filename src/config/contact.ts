/**
 * CONTACT CONFIGURATION — the only place contact details need to be edited.
 * Leave either value empty until the real detail is available. No placeholder
 * destination is rendered. WhatsApp must contain international digits only,
 * without a +, spaces or brackets (country code included).
 * Run `npm run build` after editing, then deploy the dist/ directory.
 */
export const contact = {
  whatsappNumber: '919846439316',
  emailAddress: 'libinsadk@gmail.com',
  defaultEnquiry: 'Hello Chef Moosa, I would love to enquire about a personalised dining experience in Prague.',
  emailSubject: 'Private dining enquiry — Chef Moosa',
  // Optional prompts included in prefilled messages; use [] to omit them.
  enquiryFields: ['Occasion', 'Preferred date', 'Guest count', 'Location', 'Cuisine preferences', 'Dietary requirements'],
};

export function createWhatsAppLink(number: string, message: string): string | null {
  return /^[1-9]\d{6,14}$/.test(number) ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;
}

export function createEmailLink(address: string, subject: string, body = ''): string | null {
  return /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(address)
    ? `mailto:${address}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`
    : null;
}

export function enquiryMessage(context?: string): string {
  return [
    contact.defaultEnquiry,
    ...(context ? [`I am interested in ${context}.`] : []),
    ...(contact.enquiryFields.length ? [contact.enquiryFields.map(field => `${field}:`).join('\n')] : []),
  ].join('\n\n');
}

export function whatsappLink(context?: string): string | null {
  return createWhatsAppLink(contact.whatsappNumber, enquiryMessage(context));
}

export function emailLink(): string | null {
  return createEmailLink(contact.emailAddress, contact.emailSubject, enquiryMessage());
}
