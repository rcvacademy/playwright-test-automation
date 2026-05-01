# Login Feature Test Plan

## Application Overview

Comprehensive test plan for the Login feature at http://localhost:3000/store/login covering happy paths, negative cases, accessibility, security, and edge cases. Each scenario assumes a fresh browser state unless noted. Use the seed test [tests/seed.spec.ts](tests/seed.spec.ts) to prepare the page.

## Test Scenarios

### 1. Login Feature

**Seed:** `tests/seed.spec.ts`

#### 1.1. Happy path — valid credentials

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; test account exists: testuser@example.com / P@ssword123
    - expect: Browser cookies and localStorage cleared
    - expect: Test account exists and is active
  2. Navigate to http://localhost:3000/store/login
    - expect: Login page loads successfully
    - expect: Email and Password fields visible
    - expect: Login button visible and enabled
  3. Enter email testuser@example.com and password P@ssword123
    - expect: Inputs accept credentials
  4. Click the Login button
    - expect: User is redirected to store homepage or dashboard
    - expect: Authenticated UI elements (account menu) are visible
    - expect: Authentication cookie or token is present
    - expect: No error messages shown

#### 1.2. Invalid credentials — wrong password

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; test account exists
    - expect: Starting state clean
    - expect: Test account available
  2. Open login page, enter valid email with incorrect password, click Login
    - expect: User remains on login page
    - expect: Clear, specific error shown (e.g., 'Invalid email or password')
    - expect: No authentication cookie or token set

#### 1.3. Invalid credentials — unknown email

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; use non-existent email unknown@example.com
    - expect: Starting state clean
  2. Open login page, enter unknown email and any password, click Login
    - expect: User remains on login page
    - expect: Error message indicates invalid credentials or account not found
    - expect: No auth cookie/token set

#### 1.4. Empty fields validation

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Open login page with both email and password empty, click Login
    - expect: Client-side validation triggers
    - expect: Inline errors shown for required fields (email/password)
    - expect: No network request is sent for authentication

#### 1.5. Invalid email format validation

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Enter invalid email 'not-an-email' and a password, click Login
    - expect: Inline validation shows 'Please enter a valid email address' or equivalent
    - expect: Form submission prevented until corrected

#### 1.6. Password visibility toggle

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Open login page, enter a password, click the password visibility (eye) icon
    - expect: Password input type toggles between 'password' and 'text'
    - expect: Displayed characters match typed password when visible
    - expect: Toggle is keyboard accessible

#### 1.7. Remember me persists login after restart

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; 'Remember me' feature exists
    - expect: Starting state clean
  2. Open login page, check 'Remember me', enter valid credentials, click Login
    - expect: Login succeeds
    - expect: Auth cookie/token has long expiry or persistent flag set
  3. Simulate browser restart (close & reopen), navigate to store or login page
    - expect: User remains authenticated (still logged in) when revisiting site
    - expect: Protected pages accessible without re-login

#### 1.8. Forgot password link navigates to reset flow

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Open login page and click 'Forgot password' link
    - expect: User navigates to password reset page or modal appears
    - expect: Password reset form contains an email input and submit action

#### 1.9. Rate limiting / brute-force protection

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; test account exists
    - expect: Starting state clean
  2. Perform multiple rapid failed login attempts (e.g., 6 attempts) with wrong password
    - expect: Server applies throttling or rate limiting (429) or shows captcha/temporary lockout
    - expect: Further attempts are blocked for a cooling-off period
    - expect: No credential leakage

#### 1.10. Account lockout after repeated failures

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; account lockout policy enabled
    - expect: Starting state clean
  2. Trigger repeated failed attempts until lockout threshold reached
    - expect: Account becomes temporarily locked or requires unlock flow
    - expect: Login attempts return explicit locked-account message
    - expect: Administrator or unlock email flow described in app is available

#### 1.11. SQL injection attempt in email or password

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Enter SQL payload "' OR '1'='1' --" into email and any password, click Login
    - expect: Login fails normally
    - expect: No data leak or unexpected behavior
    - expect: Server treats input as data, not executable query

#### 1.12. XSS attempt in email or password fields

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Enter payload "<script>alert('xss')</script>" into form fields and submit
    - expect: No script execution in browser
    - expect: Inputs are sanitized or encoded
    - expect: No DOM injection occurs and no alerts appear

#### 1.13. CSRF token and anti-CSRF checks

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Inspect login form markup and the outgoing POST request for presence of a CSRF token or anti-CSRF header
    - expect: Form includes CSRF token (hidden field) or server expects anti-CSRF header
    - expect: Requests without valid CSRF token are rejected by server (tested in a controlled environment)

#### 1.14. Cookie security attributes (HttpOnly, Secure, SameSite)

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; HTTPS environment if applicable
    - expect: Starting state clean
  2. Perform a successful login and inspect authentication cookie attributes
    - expect: Cookie has HttpOnly flag
    - expect: Cookie has SameSite set (Lax/Strict)
    - expect: Cookie has Secure flag when served over HTTPS
    - expect: No sensitive tokens exposed to JavaScript

#### 1.15. Prevent double submission / duplicate requests

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Fill credentials, then double-click the Login button rapidly
    - expect: Application prevents duplicate requests (single submission handled)
    - expect: UI shows loading indicator or disables button during request
    - expect: No duplicate accounts or side effects occur

#### 1.16. Network failure during submit (offline)

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Simulate network offline before clicking Login (throttle or offline mode), then submit
    - expect: User sees a clear network error message
    - expect: Form remains filled allowing retry
    - expect: No partial authentication occurs

#### 1.17. Server 500 error handling

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; ability to stub server responses
    - expect: Starting state clean
  2. Stub login endpoint to return 500, submit valid credentials
    - expect: User sees a friendly error message (e.g., 'Something went wrong')
    - expect: No sensitive error stack trace is shown to user
    - expect: Form allows retry

#### 1.18. Session expiry and protected route redirect

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; test account exists
    - expect: Starting state clean
  2. Login successfully, then delete or expire auth cookie/token, navigate to a protected page
    - expect: User is redirected to login page
    - expect: Optional message indicates session expired and re-login required

#### 1.19. Accessibility: keyboard navigation, labels, and ARIA

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Tab through the page from first focusable element to last
    - expect: Tab order is logical (Email → Password → Remember me → Login → Forgot password)
    - expect: All form fields have visible labels or aria-labels
    - expect: Error messages are announced via aria-live regions
    - expect: Focus states are visible and keyboard operable

#### 1.20. Very long input and max-length handling

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Paste very long strings (e.g., 5000 chars) into email and password fields and attempt submit
    - expect: Inputs either enforce max-length or return validation error
    - expect: Application does not crash or become unresponsive
    - expect: Server safely handles long input without injection or buffer issues

#### 1.21. Redirect to previous page after login (redirect param)

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; protected page requires auth
    - expect: Starting state clean
  2. Attempt to access a protected page (/checkout) which redirects to login with a redirect parameter, complete login
    - expect: After successful login the user is redirected back to the original protected page (/checkout)
    - expect: State (cart, form data) is preserved where applicable

#### 1.22. Logout clears session and redirects to public page

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; test account exists
    - expect: Starting state clean
  2. Login successfully, then click Logout from account menu
    - expect: User is redirected to homepage or login page
    - expect: Authentication cookie/token is removed or invalidated
    - expect: Accessing protected pages redirects to login

#### 1.23. Form submit using Enter key

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state
    - expect: Starting state clean
  2. Enter valid credentials and press Enter while focused on password field
    - expect: Form submits successfully identical to clicking Login
    - expect: User is authenticated and redirected appropriately

#### 1.24. Password manager / browser autofill support

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Fresh browser state; password manager available
    - expect: Starting state clean
  2. Trigger browser autofill or use saved credentials to populate fields, then submit
    - expect: Autofill populates email and password fields correctly
    - expect: Submission works with autofilled credentials
    - expect: No broken UI or lost focus issues

#### 1.25. Localization / translated messages (if supported)

**File:** `tests/login.spec.ts`

**Steps:**
  1. Assumptions: Application supports multiple languages
    - expect: Starting state clean
  2. Change Accept-Language or use language selector to switch locale (e.g., Spanish), open login page
    - expect: Labels, placeholders and error messages are translated appropriately
    - expect: Validation messages remain clear and actionable in selected language
