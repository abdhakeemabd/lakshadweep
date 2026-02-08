import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import loginImage from "../../assets/img/login.png"
import Logo from '../../assets/admin-panel-icon/logo/logo-white.svg'

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [passwordMetrics, setPasswordMetrics] = useState({
    strength: 'Poor',
    metCount: 0,
    checks: {
      length: false,
      capitalStart: false,
      number: false,
      special: false
    }
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    const checks = {
      length: pass.length >= 6,
      capitalStart: /^[A-Z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass)
    };

    const metCount = Object.values(checks).filter(Boolean).length;
    let strength = 'Poor';
    if (metCount >= 3) strength = 'Fair';
    if (metCount === 4) strength = 'Good';
    if (metCount === 4 && pass.length >= 10) strength = 'Strong';

    return { checks, strength, metCount };
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    if (id === 'password') {
      const metrics = validatePassword(value);
      setPasswordMetrics(metrics);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordMetrics.metCount < 4) return;

    setLoading(true);
    console.log("Admin login attempt:", formData);

    setTimeout(() => {
      setLoading(false);
      navigate('/admin/vendors-list');
    }, 800);
  };

  const getStrengthColor = () => {
    switch (passwordMetrics.strength) {
      case 'Strong': return 'bg-[#16C032]';
      case 'Good': return 'bg-green-600';
      case 'Fair': return 'bg-[#FFB800]';
      default: return 'bg-[#EB0D0D]';
    }
  };

  const isFormValid = formData.username && passwordMetrics.metCount === 4;

  return (
    <div className="min-h-screen bg-[#0F2446] px-4">
      <div className="container-fluid mx-auto px-3">
        <div className="rounded-[1rem] grid md:grid-cols-2 items-center">
          <div className="md:block p-3 h-full flex items-center justify-center">
            <div className="relative aspect-[634/809] max-h-[calc(100vh-30px)] w-full">
              <img src={loginImage} alt="Login Illustration" className="w-full h-full object-cover rounded-[29px]" />
            </div>
          </div>
          <div className="p-4 lg:px-10 lg:py-10">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-10 lg:mb-20">
                <img src={Logo} alt="Go Rogue Logo" className="mx-auto mb-6 block mx-auto mb-[80px] w-[clamp(250px,22vw,329px)] max-w-full h-auto object-contain" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-[17.52px] text-[#EDEDED] mb-2">Username</label>
                  <input id="username" type="text" value={formData.username} onChange={handleInputChange} placeholder="Enter your username" className="fs-[14px] w-full h-[51px] placeholder:text-[#C4C4C4] px-5 rounded-xl border border-[#DFDFDF] bg-[#0D1F3A] text-[#fff] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all duration-200" required />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-[17.52px] text-[#EDEDED] mb-2">Password</label>
                  <div className="relative">
                    <input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} placeholder="Enter your password" className="fs-[14px] w-full h-[51px] placeholder:text-[#C4C4C4] px-5 pr-12 rounded-xl border border-[#DFDFDF] bg-[#0D1F3A] text-[#fff] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all duration-200" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white transition-colors">
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[13px] text-[#BFBFBF]">Password Strength: <span className={`font-bold ${passwordMetrics.strength === 'Poor' ? 'text-[#EB0D0D]' : passwordMetrics.strength === 'Fair' ? 'text-[#FFB800]' : 'text-[#16C032]'}`}>{passwordMetrics.strength}</span></span>
                        <span className="text-[13px] text-[#BFBFBF]">{passwordMetrics.metCount}/4</span>
                      </div>
                      <div className="h-1 w-full bg-[#1A3A6D] rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${getStrengthColor()}`}
                          style={{ width: `${(passwordMetrics.metCount / 4) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex flex-col gap-3 mt-3 min-h-[40px] justify-center">
                        {passwordMetrics.metCount === 4 ? (
                          <div className="flex items-center gap-2 text-[14px] text-[#16C032] font-bold animate-bounce">
                            <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-900/20">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                            Success! Good password
                          </div>
                        ) : (
                          <>
                            {!passwordMetrics.checks.capitalStart ? (
                              <div className="flex items-center gap-2 text-[13px] text-[#BFBFBF] animate-fadeIn">
                                <div className="w-4 h-4 rounded-full border-2 border-[#1A3A6D] flex-shrink-0"></div>
                                Next step: <span className="text-[#EDEDED] font-medium">Start with a Capital letter</span>
                              </div>
                            ) : !passwordMetrics.checks.special ? (
                              <div className="flex items-center gap-2 text-[13px] text-[#BFBFBF] animate-fadeIn">
                                <div className="w-4 h-4 rounded-full border-2 border-[#1A3A6D] flex-shrink-0"></div>
                                Next step: <span className="text-[#EDEDED] font-medium">Add a special character</span>
                              </div>
                            ) : !passwordMetrics.checks.number ? (
                              <div className="flex items-center gap-2 text-[13px] text-[#BFBFBF] animate-fadeIn">
                                <div className="w-4 h-4 rounded-full border-2 border-[#1A3A6D] flex-shrink-0"></div>
                                Next step: <span className="text-[#EDEDED] font-medium">Include at least one number</span>
                              </div>
                            ) : !passwordMetrics.checks.length && (
                              <div className="flex items-center gap-2 text-[13px] text-[#BFBFBF] animate-fadeIn">
                                <div className="w-4 h-4 rounded-full border-2 border-[#1A3A6D] flex-shrink-0"></div>
                                Next step: <span className="text-[#EDEDED] font-medium">Enter at least 6 characters</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-2 mb-4 lg:mb-6 mt-6 lg:mt-10">
                  <button type="submit" disabled={loading || !isFormValid} className={`w-full h-[58px] rounded-xl text-white font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group ${isFormValid ? 'bg-[#FF6A21] hover:bg-[#ff8447] active:scale-[0.98] cursor-pointer' : 'bg-[#1A3A6D] opacity-50 cursor-not-allowed'}`}>
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-[14px] text-[#BFBFBF] font-light">
                    ©2025 <span className="">Go Rogue</span>. Admin Access Only.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
