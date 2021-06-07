import { getInput, setOutput, setFailed, info, warning } from '@actions/core';

import { INPUT, OUTPUT } from 'constants/io';
import { GITHUB_EVENT } from 'constants/env';
import { FALSE } from 'constants/boolean';
import getCommitEmails from 'helpers/getCommitEmails';
import formatEmailDomain from 'helpers/formatEmailDomain';
import filterInvalidEmails from 'helpers/filterInvalidEmails';

async function checkEmail(): Promise<void> {
  const emailDomainsBox: [] = [];
  const emailDomainsMain = INPUT.EMAIL_DOMAIN;
  emailDomainsMain.split(',').forEach((email) => {
    const pushedEmail: string = getInput(email, { required: true });
    emailDomainsBox.push(pushedEmail);
  });
  const emailDomains = emailDomainsBox.forEach((email) => {
    formatEmailDomain(email);
  });
  info(`Email domains: ${emailDomains}`);

  const commitEmails = await getCommitEmails(GITHUB_EVENT);

  if (!commitEmails) {
    return warning('Could not found emails');
  }
  info(`Emails to check: ${commitEmails}`);

  const invalidEmails = filterInvalidEmails(emailDomains, commitEmails);

  handleSetOutput(invalidEmails, emailDomains);
}

function handleSetOutput(invalidEmails: string[], emailDomains: string[]): void {
  const isValid = invalidEmails.length === 0;

  setOutput(OUTPUT.IS_VALID, isValid);

  if (isValid) {
    return info('Emails are valid');
  }

  const errorOnFail = getInput(INPUT.ERROR_ON_FAIL);
  const errorMessage = `Invalid emails found. Invalid emails: ${invalidEmails}. It should be end with ${emailDomains}`;

  if (errorOnFail === FALSE) {
    warning(errorMessage);
  } else {
    throw Error(errorMessage);
  }
}

checkEmail().catch((error) => {
  setFailed(error.message);
});

export default checkEmail;
