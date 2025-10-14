/* cSpell:disable */
import { Link } from "react-router-dom";
import {
  Book,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  GraduationCap,
  Users,
  BookOpen,
  PlusCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Course {
  id: string;
  teacher: string;
  title: string;
  description: string;
  price: number;
  level: string;
  category: string;
  image: string;
  slug: string;
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [teacherCoursesCount, setTeacherCoursesCount] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role === "teacher") {
        // Load teacher's courses count
        const storedCourses = localStorage.getItem("courses");
        const allCourses: Course[] = storedCourses ? JSON.parse(storedCourses) : [];
        const teacherCourses = allCourses.filter(
          (c: Course) => c.teacher === user.id
        );
        setTeacherCoursesCount(teacherCourses.length);
      } else {
        // Load cart and wishlist for students
        const cart = JSON.parse(
          localStorage.getItem(`cart_${user.id}`) || "[]"
        );
        const wishlist = JSON.parse(
          localStorage.getItem(`wishlist_${user.id}`) || "[]"
        );
        setCartCount(cart.length);
        setWishlistCount(wishlist.length);
      }
    } else {
      setCartCount(0);
      setWishlistCount(0);
      setTeacherCoursesCount(0);
    }
  }, [user]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center text-xl font-bold">
            <img
              src="/public/Images/logo4.png"
              style={{ width: "100px" }}
              alt="لوگو"
            />
            <span className="hidden sm:inline">
              آموزشگاه زبان انگلیسی الماس
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/courses"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              دوره ها
            </Link>
            <Link
              to="/teachers"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              اساتید
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              درباره ما
            </Link>
            <Link
              to="/blog"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              بلاگ
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              راه های ارتباطی
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {isAuthenticated ? (
              <>
                {user?.role === "teacher" ? (
                  <>
                    {/* Teacher: My Courses */}
                    <Link to="/teacher/dashboard">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        title="دوره‌های من"
                      >
                        <BookOpen className="h-5 w-5" />
                        {teacherCoursesCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {teacherCoursesCount}
                          </span>
                        )}
                      </Button>
                    </Link>

                    {/* Teacher: Create New Course */}
                    <Link to="/teacher/dashboard">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="ایجاد دوره جدید"
                      >
                        <PlusCircle className="h-5 w-5" />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Student: Cart */}
                    <Link to="/cart">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        title="سبد خرید"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartCount}
                          </span>
                        )}
                      </Button>
                    </Link>

                    {/* Student: Wishlist */}
                    <Link to="/wishlist">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        title="علاقه‌مندی‌ها"
                      >
                        <Heart className="h-5 w-5" />
                        {wishlistCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-secondary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {wishlistCount}
                          </span>
                        )}
                      </Button>
                    </Link>
                  </>
                )}

                {/* User Menu */}
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    to={
                      user?.role === "admin"
                        ? "/admin"
                        : user?.role === "teacher"
                        ? "/teacher/dashboard"
                        : "/dashboard"
                    }
                  >
                    <Button variant="ghost" className="gap-2">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                      <span className="hidden lg:inline">{user.name}</span>
                      {user.role === "teacher" && (
                        <span className="hidden lg:inline text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          استاد
                        </span>
                      )}
                      {user.role === "student" && (
                        <span className="hidden lg:inline text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
                          دانشجو
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={logout}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost">ورود</Button>
                </Link>
                <Link to="/register">
                  <Button variant="hero">ثبت نام</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            <Link
              to="/courses"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              دوره ها
            </Link>
            <Link
              to="/teachers"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              اساتید
            </Link>
            <Link
              to="/about"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              درباره ما
            </Link>
            <Link
              to="/blog"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              بلاگ
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              راه های ارتباطی
            </Link>

            {!isAuthenticated && (
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    ورود
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="hero" className="w-full">
                    ثبت نام
                  </Button>
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <div className="flex flex-col gap-2 pt-4 border-t">
                {user?.role === "teacher" && (
                  <>
                    <Link
                      to="/teacher/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full gap-2">
                        <BookOpen className="h-4 w-4" />
                        دوره‌های من ({teacherCoursesCount})
                      </Button>
                    </Link>
                  </>
                )}

                {user?.role === "student" && (
                  <>
                    <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        سبد خرید ({cartCount})
                      </Button>
                    </Link>
                    <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full gap-2">
                        <Heart className="h-4 w-4" />
                        علاقه‌مندی‌ها ({wishlistCount})
                      </Button>
                    </Link>
                  </>
                )}

                <Link
                  to={
                    user?.role === "admin"
                      ? "/admin"
                      : user?.role === "teacher"
                      ? "/teacher/dashboard"
                      : "/dashboard"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    داشبورد
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  خروج
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
