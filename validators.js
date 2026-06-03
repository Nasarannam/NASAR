function isOrganizationGmail(email) {
  return typeof email === 'string' && /^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(email.trim());
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function isValidEmployee({ ename, sal, loc }) {
  const salary = Number(sal);
  return (
    typeof ename === 'string' && ename.trim().length > 0 &&
    Number.isFinite(salary) && salary >= 0 &&
    typeof loc === 'string' && loc.trim().length > 0
  );
}

module.exports = { isOrganizationGmail, normalizeEmail, isValidEmployee };
