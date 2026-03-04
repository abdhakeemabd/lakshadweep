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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.username === 'admin' && formData.password === 'Admin@123') {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      console.log("Admin login successful");

      setTimeout(() => {
        setLoading(false);
        navigate('/admin/dashboard');
      }, 800);
    } else {
      setTimeout(() => {
        setLoading(false);
        alert("Invalid username or password. Please try again.");
      }, 500);
    }
  };

  const isFormValid = formData.username.trim() !== '' && formData.password.trim() !== '';

  return (
    <div className="min-h-screen bg-[#0F2446] flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 items-center gap-8 lg:gap-16">
          <div className="items-center justify-center hidden md:flex">
            <div className="relative aspect-[634/809] w-full max-w-[550px]">
              <img src={loginImage} alt="Login Illustration" className="w-full h-full object-cover rounded-[29px]" />
            </div>
          </div>
          <div className="w-full max-w-[453px] mx-auto md:mx-0">
            <div className="text-center mb-12">
              <img src={Logo} alt="Go Rogue Logo" className="mx-auto w-[clamp(200px,20vw,300px)] h-auto object-contain" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-[17.52px] text-[#EDEDED] mb-2">Username</label>
                <input id="username" type="text" value={formData.username} onChange={handleInputChange} placeholder="Enter your username" className="w-full h-[51px] placeholder:text-[#C4C4C4]/60 px-5 rounded-xl border border-[#DFDFDF] bg-[#0D1F3A] text-white focus:ring-1 focus:ring-[#FF6A21] focus:border-[#FF6A21] outline-none transition-all duration-200" required />
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-[17.52px] text-[#EDEDED] mb-2">Password</label>
                <div className="relative">
                  <input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} placeholder="Enter your password" className="w-full h-[51px] placeholder:text-[#C4C4C4]/60 px-5 pr-12 rounded-xl border border-[#DFDFDF] bg-[#0D1F3A] text-white focus:ring-1 focus:ring-[#FF6A21] focus:border-[#FF6A21] outline-none transition-all duration-200" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer">
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>
              <div className="pt-4">
                <button type="submit" disabled={loading || !isFormValid} className={`w-full h-[58px] rounded-xl text-white font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${isFormValid ? 'bg-[#FF6A21] hover:bg-[#e85a1a] shadow-[#FF6A21]/20 cursor-pointer' : 'bg-[#1A3A6D] opacity-50 cursor-not-allowed'}`}>
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
              <div className="text-center mt-12 text-white/40 text-sm">
                © {new Date().getFullYear()} <span className="">Go Rogue</span>. Admin Access Only.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
