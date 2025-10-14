import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag } from 'lucide-react';
import coursesData from '@/data/courses.json';
import teachersData from '@/data/teachers.json';
import { useState, useEffect } from 'react';

type Course = {
  id: string;
  title: string;
  price: number;
  level: string;
  image: string;
  teacher: string;
};

export const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Course[]>([]);

  useEffect(() => {
    if (user) {
      loadCartItems();
    }
  }, [user]);

  const loadCartItems = () => {
    if (!user) return;

    const storedCourses = localStorage.getItem('courses');
    const allCourses = storedCourses ? JSON.parse(storedCourses) : coursesData;
    
    const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`) || '[]');
    const items = allCourses.filter((c: Course) => cart.includes(c.id));
    setCartItems(items);
  };

  const removeFromCart = (courseId: string) => {
    if (!user) return;

    const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`) || '[]');
    const updatedCart = cart.filter((id: string) => id !== courseId);
    localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));

    const storedCourses = localStorage.getItem('courses');
    const allCourses = storedCourses ? JSON.parse(storedCourses) : coursesData;
    const items = allCourses.filter((c: Course) => updatedCart.includes(c.id));
    setCartItems(items);
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('سبد خرید شما خالی است');
      return;
    }

    // Get current enrollments
    const enrollments = JSON.parse(localStorage.getItem(`enrollments_${user.id}`) || '[]');

    // Add cart items to enrollments
    const courseIds = cartItems.map((c) => c.id);
    const updatedEnrollments = [...new Set([...enrollments, ...courseIds])];
    localStorage.setItem(`enrollments_${user.id}`, JSON.stringify(updatedEnrollments));

    // Clear cart
    localStorage.setItem(`cart_${user.id}`, JSON.stringify([]));

    // Redirect to dashboard
    alert('پرداخت موفقیت آمیز بود! دوره به حساب شما اضافه شد');
    navigate('/dashboard');
  };

  const totalPrice = cartItems.reduce((sum, course) => sum + course.price, 0);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Login</h1>
        <p className="text-muted-foreground mb-6">You need to login to view your cart</p>
        <Link to="/login">
          <Button>Login Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">سبد خرید</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h2>
          <p className="text-muted-foreground mb-6">برای شروع برخی از دوره ها رو اضافه کنید</p>
          <Link to="/courses">
            <Button variant="hero" size="lg">
              مشاهده دوره‌ها
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((course) => {
              const teacher = teachersData.find((t) => t.id === course.teacher);

              return (
                <div key={course.id} className="bg-card p-6 rounded-lg shadow-lg flex gap-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-32 h-24 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {teacher?.name} • {course.level}
                    </p>
                    <div className="text-lg font-bold text-primary">
                      {(course.price / 1000).toFixed(0)}K IRR
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(course.id)}
                    className="text-destructive hover:text-destructive/80 flex-shrink-0"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-4">خلاصه سفارش</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">جمع جزئی ({cartItems.length} تعداد)</span>
                  <span className="font-semibold">{(totalPrice / 1000).toFixed(0)}K IRR</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">مالیات (9%)</span>
                  <span className="font-semibold">{((totalPrice * 0.09) / 1000).toFixed(0)}K IRR</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>جمع کل</span>
                  <span className="text-primary">{((totalPrice * 1.09) / 1000).toFixed(0)}K IRR</span>
                </div>
              </div>

              <Button onClick={handleCheckout} className="w-full mb-4" size="lg" variant="hero">
                ادامه تسویه حساب
              </Button>

              <Link to="/courses">
                <Button variant="outline" className="w-full">
                  انصراف
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
