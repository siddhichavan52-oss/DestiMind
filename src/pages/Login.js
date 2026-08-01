import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { loginUser } from '../utils/auth';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.email.trim()) {
      next.email = 'Enter your email.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'That email doesn\'t look right.';
    }
    if (!form.password) {
      next.password = 'Enter your password.';
    }
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      setFormError('');
      return;
    }

    const result = loginUser(form);
    if (!result.ok) {
      setErrors({});
      setFormError(result.message);
      return;
    }

    setErrors({});
    setFormError('');
    setSubmitted(true);
    setTimeout(() => navigate('/home'), 600);
  }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-brand">
        <Compass size={20} strokeWidth={1.75} />
        <span>DestiMind</span>
      </Link>

      <div className="auth-card">
        <p className="auth-eyebrow">Welcome back</p>
        <h1 className="auth-title">Log in to DestiMind</h1>
        <p className="auth-subtitle">Pick up your saved destinations and searches.</p>

        {submitted ? (
          <div className="auth-success">Logged in — redirecting you now.</div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {formError && (
              <div className="auth-error-banner">
                <AlertCircle size={16} strokeWidth={2} />
                <span>{formError}</span>
              </div>
            )}

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
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <span className="field-hint">{errors.password}</span>}
            </label>

            <button type="submit" className="auth-submit">
              Log in
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </form>
        )}

        <p className="auth-switch">
          New to DestiMind? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
