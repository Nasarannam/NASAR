require('dotenv').config();

const path = require('path');
const bcrypt = require('bcryptjs');
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { pool, initializeDatabase } = require('./db');
const { requireLogin, redirectIfLoggedIn } = require('./middleware');
const { isOrganizationGmail, normalizeEmail, isValidEmployee } = require('./validators');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  store: new pgSession({ pool, createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET || 'development-only-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60,
  },
}));

app.get('/', (req, res) => {
  res.redirect(req.session.organizationId ? '/employees' : '/login');
});

app.get('/register', redirectIfLoggedIn, (req, res) => {
  res.render('register', { error: null, values: {} });
});

app.post('/register', redirectIfLoggedIn, async (req, res, next) => {
  try {
    const orgGmail = normalizeEmail(req.body.orgGmail);
    const password = String(req.body.password || '');

    if (!isOrganizationGmail(orgGmail)) {
      return res.status(400).render('register', {
        error: 'Please enter a valid organization Gmail address ending with @gmail.com.',
        values: { orgGmail },
      });
    }

    if (password.length < 6) {
      return res.status(400).render('register', {
        error: 'Password must be at least 6 characters.',
        values: { orgGmail },
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      'INSERT INTO organizations (org_gmail, password_hash) VALUES ($1, $2) RETURNING id, org_gmail',
      [orgGmail, passwordHash]
    );

    req.session.organizationId = result.rows[0].id;
    req.session.orgGmail = result.rows[0].org_gmail;
    return res.redirect('/employees');
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).render('register', {
        error: 'This organization Gmail is already created. Please login with the same credentials.',
        values: { orgGmail: normalizeEmail(req.body.orgGmail) },
      });
    }
    return next(error);
  }
});

app.get('/login', redirectIfLoggedIn, (req, res) => {
  res.render('login', { error: null, values: {} });
});

app.post('/login', redirectIfLoggedIn, async (req, res, next) => {
  try {
    const orgGmail = normalizeEmail(req.body.orgGmail);
    const password = String(req.body.password || '');
    const result = await pool.query('SELECT id, org_gmail, password_hash FROM organizations WHERE org_gmail = $1', [orgGmail]);
    const organization = result.rows[0];

    if (!organization || !(await bcrypt.compare(password, organization.password_hash))) {
      return res.status(401).render('login', {
        error: 'Invalid Gmail or password. Use the same credentials created during registration.',
        values: { orgGmail },
      });
    }

    req.session.organizationId = organization.id;
    req.session.orgGmail = organization.org_gmail;
    return res.redirect('/employees');
  } catch (error) {
    return next(error);
  }
});

app.post('/logout', requireLogin, (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    return res.redirect('/login');
  });
});

app.get('/employees', requireLogin, async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT serialno, ename, sal, loc FROM employees WHERE organization_id = $1 ORDER BY serialno ASC',
      [req.session.organizationId]
    );
    return res.render('employees', {
      orgGmail: req.session.orgGmail,
      employees: result.rows,
      error: null,
      editing: null,
      values: {},
    });
  } catch (error) {
    return next(error);
  }
});

app.post('/employees', requireLogin, async (req, res, next) => {
  try {
    if (!isValidEmployee(req.body)) {
      return res.status(400).redirect('/employees');
    }

    await pool.query(
      'INSERT INTO employees (organization_id, ename, sal, loc) VALUES ($1, $2, $3, $4)',
      [req.session.organizationId, req.body.ename.trim(), Number(req.body.sal), req.body.loc.trim()]
    );
    return res.redirect('/employees');
  } catch (error) {
    return next(error);
  }
});

app.get('/employees/:serialno/edit', requireLogin, async (req, res, next) => {
  try {
    const employeeResult = await pool.query(
      'SELECT serialno, ename, sal, loc FROM employees WHERE serialno = $1 AND organization_id = $2',
      [req.params.serialno, req.session.organizationId]
    );

    if (!employeeResult.rows[0]) return res.status(404).redirect('/employees');

    const listResult = await pool.query(
      'SELECT serialno, ename, sal, loc FROM employees WHERE organization_id = $1 ORDER BY serialno ASC',
      [req.session.organizationId]
    );

    return res.render('employees', {
      orgGmail: req.session.orgGmail,
      employees: listResult.rows,
      error: null,
      editing: employeeResult.rows[0],
      values: employeeResult.rows[0],
    });
  } catch (error) {
    return next(error);
  }
});

app.post('/employees/:serialno/update', requireLogin, async (req, res, next) => {
  try {
    if (!isValidEmployee(req.body)) return res.status(400).redirect('/employees');

    await pool.query(
      `UPDATE employees
       SET ename = $1, sal = $2, loc = $3, updated_at = NOW()
       WHERE serialno = $4 AND organization_id = $5`,
      [req.body.ename.trim(), Number(req.body.sal), req.body.loc.trim(), req.params.serialno, req.session.organizationId]
    );
    return res.redirect('/employees');
  } catch (error) {
    return next(error);
  }
});

app.post('/employees/:serialno/delete', requireLogin, async (req, res, next) => {
  try {
    await pool.query(
      'DELETE FROM employees WHERE serialno = $1 AND organization_id = $2',
      [req.params.serialno, req.session.organizationId]
    );
    return res.redirect('/employees');
  } catch (error) {
    return next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Something went wrong. Please check server logs and database connection.');
});

if (require.main === module) {
  initializeDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Master DB employee app running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Database initialization failed:', error.message);
      process.exit(1);
    });
}

module.exports = app;
