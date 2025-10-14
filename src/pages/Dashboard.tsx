/* cSpell:disable */
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ShoppingCart,
  Heart,
  User,
  GraduationCap,
} from "lucide-react";
import coursesData from "@/data/courses.json";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  price?: number;
  level?: string;
  image: string;
  slug?: string;
  description?: string;
  category?: string;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (user) {
      loadDashboardData();
      
      // Set up interval to update counts
      const interval = setInterval(loadDashboardData, 2000);
      
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadDashboardData = () => {
    if (!user) return;

    // Load all courses from localStorage (includes new courses created by teachers)
    const storedCourses = localStorage.getItem("courses");
    const allCourses = storedCourses ? JSON.parse(storedCourses) : coursesData;

    // Load enrolled courses
    const enrollments = JSON.parse(
      localStorage.getItem(`enrollments_${user.id}`) || "[]"
    );
    const enrolled = allCourses.filter((c: Course) =>
      enrollments.includes(c.id)
    );
    setEnrolledCourses(enrolled);

    // Load cart and wishlist counts
    const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`) || "[]");
    const wishlist = JSON.parse(
      localStorage.getItem(`wishlist_${user.id}`) || "[]"
    );
    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  };

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">دسترسی محدود</h1>
        <p className="text-muted-foreground mb-6">
          برای دیدن داشبورد خود وارد شوید
        </p>
        <Link to="/login">
          <Button>ورود به حساب</Button>
        </Link>
      </div>
    );
  }

  if (user.role !== "student") {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">دسترسی محدود</h1>
        <p className="text-muted-foreground">
          شما اجازه دسترسی به این صفحه را ندارید.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">خوش آمدید, {user.name}!</h1>
        <p className="text-muted-foreground text-lg">
          سفر یادگیری زبان انگلیسی خود را ادامه دهید
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">{enrolledCourses.length}</h3>
          </div>
          <p className="text-sm text-muted-foreground">دوره های ثبت نام شده</p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-3xl font-bold">{cartCount}</h3>
          </div>
          <p className="text-sm text-muted-foreground">سبد خرید</p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-3xl font-bold">{wishlistCount}</h3>
          </div>
          <p className="text-sm text-muted-foreground">خواستنی ها</p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">0%</h3>
          </div>
          <p className="text-sm text-muted-foreground">پیشرفت متوسط</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">اقدامات سریع</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/courses">
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex-col gap-2"
            >
              <BookOpen className="h-8 w-8" />
              <span>مشاهده دوره‌ها</span>
            </Button>
          </Link>
          <Link to="/cart">
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex-col gap-2"
            >
              <ShoppingCart className="h-8 w-8" />
              <span>مشاهده سبد خرید</span>
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex-col gap-2"
            >
              <Heart className="h-8 w-8" />
              <span>خواستنی های من</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex-col gap-2"
            >
              <User className="h-8 w-8" />
              <span>پروفایل من</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="text-2xl font-bold mb-6">دوره های من</h2>
        {enrolledCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  {course.level && (
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-sm mb-4">
                      {course.level}
                    </span>
                  )}

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">پیشرفت</span>
                      <span className="font-semibold">0%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>

                  <Link to={`/courses/${course.slug}`}>
                    <Button className="w-full">ادامه یادگیری</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card p-12 rounded-lg text-center">
            <GraduationCap className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              شما هنوز در هیچ دوره ای ثبت نام نکرده اید
            </h3>
            <p className="text-muted-foreground mb-6">
              دوره‌های جذاب ما را کشف کنید و یادگیری خود را شروع کنید
            </p>
            <Link to="/courses">
              <Button variant="hero" size="lg">
                مشاهده دوره‌ها
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
