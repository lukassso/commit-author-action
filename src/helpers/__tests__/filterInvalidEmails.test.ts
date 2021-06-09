import filterInvalidEmails from '../filterInvalidEmails';

describe('filterInvalidEmails', () => {
  it('should return an empty array when all domains match', () => {
    const emailDomains = '@gmail.com';
    const commitEmails = [
      'ab@gmail.com',
      'a.b@gmail.com',
      'a+b@gmail.com',
      'd_f@gmail.com',
      '@gmail.com',
    ];
    expect(filterInvalidEmails(emailDomains, commitEmails)).toEqual([]);
  });

  it('should filter invalid emails from multiple domains', () => {
    const emailDomains = '@gmail.com,hotmail.com,outlook.com';
    const commitEmails = ['a@gmail.com', 'a.b@hotmail.com', 'a+b@outlook.com', 'd_f@dropbox.com'];
    expect(filterInvalidEmails(emailDomains, commitEmails)).toEqual(['d_f@dropbox.com']);
  });
});
