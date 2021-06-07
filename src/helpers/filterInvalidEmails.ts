function filterInvalidEmails(emailDomains: string[], commitEmails: string[]): string[] {
  const invalidEmails: [] = [];
  emailDomains.forEach((email) => {
    commitEmails.filter((email) => !emailDomains.includes(email));
    invalidEmails.push(email);
  });
  return invalidEmails;
}

export default filterInvalidEmails;
