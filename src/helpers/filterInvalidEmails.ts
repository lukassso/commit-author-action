import formatEmailDomain from './formatEmailDomain';

function filterInvalidEmails(emailDomains: string, commitEmails: string[]): string[] {
  const allowedDomains: string[] = [];

  emailDomains
    .replace(/\s/g, '')
    .split(',')
    .forEach((email) => {
      const pushedEmail = formatEmailDomain(email);
      allowedDomains.push(pushedEmail);
    });

  const invalidEmails = commitEmails.filter((commitEmail) =>
    allowedDomains.every((domain) => !commitEmail.endsWith(domain))
  );

  return invalidEmails;
}

export default filterInvalidEmails;
