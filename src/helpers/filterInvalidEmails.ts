import formatEmailDomain from './formatEmailDomain';

function filterInvalidEmails(emailDomains: string, commitEmails: string[]): string[] {
  const allowedDomainsBox: string[] = [];

  emailDomains
    .replace(/\s/g, '')
    .split(',')
    .forEach((email) => {
      const pushedEmail = formatEmailDomain(email);
      allowedDomainsBox.push(pushedEmail);
    });
  console.log(allowedDomainsBox);

  const validEmails: string[] = [];
  commitEmails.map((el) =>
    allowedDomainsBox.map((el2) => {
      if (el.endsWith(el2)) {
        return validEmails.push(el);
      }
    })
  );
  console.log(validEmails);

  const invalidEmails = commitEmails.filter((email) => !validEmails.includes(email));
  console.log(invalidEmails);

  return invalidEmails;
}

export default filterInvalidEmails;
