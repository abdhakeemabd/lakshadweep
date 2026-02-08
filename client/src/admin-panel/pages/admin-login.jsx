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
    console.log("Admin login attempt:", formData);

    setTimeout(() => {
      setLoading(false);
      navigate('/admin/vendors-list');
    }, 800);
  };

  const isFormValid = formData.username.trim() !== '' && formData.password.trim() !== '';

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
                  <input 
                    id="username" 
                    type="text" 
                    value={formData.username} 
                    onChange={handleInputChange} 
                    placeholder="Enter your username" 
                    className="fs-[14px] w-full h-[51px] placeholder:text-[#C4C4C4] px-5 rounded-xl border border-[#DFDFDF] bg-[#0D1F3A] text-[#fff] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all duration-200" 
                    required 
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-[17.52px] text-[#EDEDED] mb-2">Password</label>
                  <div className="relative">
                    <input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      value={formData.password} 
                      onChange={handleInputChange} 
                      placeholder="Enter your password" 
                      className="fs-[14px] w-full h-[51px] placeholder:text-[#C4C4C4] px-5 pr-12 rounded-xl border border-[#DFDFDF] bg-[#0D1F3A] text-[#fff] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all duration-200" 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white transition-colors"
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="pt-2 mb-4 lg:mb-6 mt-6 lg:mt-10">
                  <button 
                    type="submit" 
                    disabled={loading || !isFormValid} 
                    className={`relative overflow-hidden w-full h-[58px] rounded-xl text-white font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group ${isFormValid ? 'cursor-pointer shadow-[#FF6A21]/20' : 'bg-[#1A3A6D] opacity-50 cursor-not-allowed'}`}
                  >
                    <div 
                      className={`absolute inset-0 bg-[#FF6A21] transition-transform duration-500 ease-in-out ${isFormValid ? 'translate-x-0' : '-translate-x-full'}`}
                    ></div>
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        "Sign In"
                      )}
                    </div>
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
