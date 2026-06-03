const test = require('node:test');
const assert = require('node:assert/strict');
const { isOrganizationGmail, normalizeEmail, isValidEmployee } = require('../validators');

test('accepts only gmail addresses for organization login', () => {
  assert.equal(isOrganizationGmail('company@gmail.com'), true);
  assert.equal(isOrganizationGmail('COMPANY@GMAIL.COM'), true);
  assert.equal(isOrganizationGmail('company@yahoo.com'), false);
  assert.equal(isOrganizationGmail('not-an-email'), false);
});

test('normalizes emails before storing or logging in', () => {
  assert.equal(normalizeEmail('  Company@Gmail.Com  '), 'company@gmail.com');
});

test('validates employee records', () => {
  assert.equal(isValidEmployee({ ename: 'Asha', sal: '50000', loc: 'Hyderabad' }), true);
  assert.equal(isValidEmployee({ ename: '', sal: '50000', loc: 'Hyderabad' }), false);
  assert.equal(isValidEmployee({ ename: 'Asha', sal: '-1', loc: 'Hyderabad' }), false);
  assert.equal(isValidEmployee({ ename: 'Asha', sal: '50000', loc: '' }), false);
});
