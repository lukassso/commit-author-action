import formatEmailDomain from './formatEmailDomain';

function filterInvalidEmails(emailDomainInput: string, commitEmails: string[]): string[] {
  const emailDomains = [];

  const emailDomain = formatEmailDomain(emailDomainInput);
  const invalidEmails = commitEmails.filter((email) => !email.endsWith(emailDomain));
  emailDomains.push(emailDomain);
  return invalidEmails;
}

export default filterInvalidEmails;
