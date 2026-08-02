import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { signupUser } from '../utils/auth';
import './Auth.css';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Enter your name.';
    if (!form.email.trim()) {
      next.email = 'Enter your email.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'That email doesn\'t look right.';
    }
    if (!form.password) {
      next.password = 'Create a password.';
    } else if (form.password.length < 6) {
      next.password = 'Password needs at least 6 characters.';
    }
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    const result = signupUser(form);
    if (!result.ok) {
      setErrors({ email: result.message });
      return;
    }

    setErrors({});
    setSubmitted(true);
    // Account is saved — send them to log in with the same credentials.
    setTimeout(() => navigate('/login'), 1200);
  }

  return (
    <div className="auth-page auth-page--signup">
      <Link to="/" className="auth-brand">
        <Compass size={20} strokeWidth={1.75} />
        <span>DestiMind</span>
      </Link>

      <div className="auth-card">
        <p className="auth-eyebrow">Get started</p>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Set your preferences once, get matches every time.</p>

        {submitted ? (
          <div className="auth-success">Account created — taking you to log in.</div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label className="field">
              <span className="field-label">Name</span>
              <div className={`field-input ${errors.name ? 'field-error' : ''}`}>
                <User size={16} strokeWidth={1.75} />
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <span className="field-hint">{errors.name}</span>}
            </label>

            <label className="field">
              <span className="field-label">Email</span>
              <div className={`field-input ${errors.email ? 'field-error' : ''}`}>
                <Mail size={16} strokeWidth={1.75} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="field-hint">{errors.email}</span>}
            </label>

            <label className="field">
              <span className="field-label">Password</span>
              <div className={`field-input ${errors.password ? 'field-error' : ''}`}>
                <Lock size={16} strokeWidth={1.75} />
                <input
                  type="password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <span className="field-hint">{errors.password}</span>}
            </label>

            <button type="submit" className="auth-submit">
              Create account
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </form>
        )}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}