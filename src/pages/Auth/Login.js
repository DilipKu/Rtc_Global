import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import './Login.css';

const Login = ({ isAdminRoute = false }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (user) {
      if (isAdminRoute) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(location.state?.from?.pathname || '/', { replace: true });
      }
    }
  }, [user, isAdminRoute, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error: signInError } = await signIn(email, password);
        if (signInError) throw signInError;
        
        setTimeout(() => {
          if (isAdminRoute) {
             navigate('/admin/dashboard');
          } else {
             const from = location.state?.from?.pathname || '/';
             navigate(from, { replace: true });
          }
        }, 500);
      } else {
        const { error: signUpError } = await signUp(email, password, name);
        if (signUpError) throw signUpError;
        setError('Registration successful! Please check your email.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Animated Background Elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      <div className="login-box reveal stagger-1">
        <div className="login-header">
          <div className="login-icon-wrapper">
            <ShieldCheck size={32} className="login-icon" />
          </div>
          <h2 className="login-title">
            {isAdminRoute ? 'Admin Portal' : 'Welcome Back'}
          </h2>
          <p className="login-subtitle">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Fill in the details to create your account'}
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className={`login-alert ${error.includes('successful') ? 'alert-success' : 'alert-error'}`}>
              {error}
            </div>
          )}

          <div className="input-group">
            {!isLogin && (
              <div className="input-field reveal stagger-2">
                <div className="input-icon"><User size={18} /></div>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            
            <div className="input-field reveal stagger-3">
              <div className="input-icon"><Mail size={18} /></div>
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="input-field reveal stagger-4">
              <div className="input-icon"><Lock size={18} /></div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-btn reveal stagger-5"
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <>
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
          
          <div className="login-footer reveal stagger-6">
            <button
              type="button"
              className="toggle-mode-btn"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
