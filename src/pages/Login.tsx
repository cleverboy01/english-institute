/* cSpell:disable */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Book, Mail, Lock, Eye, EyeOff } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = login(email, password);
    if (success) {
      if (rememberMe) {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u) => u.email === email);
        if (user) {
          localStorage.setItem(
            'rememberedUser',
            JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            })
          );
        }
      }

      // Get user role and redirect accordingly
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u) => u.email === email);

      if (user?.role === 'admin') {
        navigate('/admin');
      } else if (user?.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Book className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">خوش آمدید!</h1>
          <p className="text-muted-foreground">برای ادامه به حساب خود وارد شوید</p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ایمیل خود را وارد نمایید..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">رمز</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-muted-foreground">مرا به خاطر بسپار</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                رمز خود را فراموش کردم؟
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg">
              ورود
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            اکانت نساخته اید؟{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              همین حالا ثبت نام کنید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
