import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, X, ShoppingCart, Heart as HeartIcon } from 'lucide-react';
import coursesData from '@/data/courses.json';
import teachersData from '@/data/teachers.json';
import { useState, useEffect } from 'react';

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  rating: number;
  enrolled: number;
  image: string;
  slug: string;
  teacher: string;
};

type Teacher = {
  id: string;
  name: string;
  avatar: string;
};

export const Wishlist = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<Course[]>([]);

  useEffect(() => {
    if (user) {
      loadWishlistItems();
    }
  }, [user]);

  const loadWishlistItems = () => {
    if (!user) return;

    const storedCourses = localStorage.getItem('courses');
    const allCourses = storedCourses ? JSON.parse(storedCourses) : coursesData;

    const wishlist: string[] = JSON.parse(
      localStorage.getItem(`wishlist_${user.id}`) || '[]'
    );
    const items = allCourses.filter((c: Course) => wishlist.includes(c.id));
    setWishlistItems(items);
  };

  const removeFromWishlist = (courseId: string) => {
    if (!user) return;

    const wishlist: string[] = JSON.parse(
      localStorage.getItem(`wishlist_${user.id}`) || '[]'
    );
    const updatedWishlist = wishlist.filter((id) => id !== courseId);
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));

    const storedCourses = localStorage.getItem('courses');
    const allCourses = storedCourses ? JSON.parse(storedCourses) : coursesData;
    const items = allCourses.filter((c: Course) =>
      updatedWishlist.includes(c.id)
    );
    setWishlistItems(items);
  };

  const addToCart = (courseId: string) => {
    if (!user) return;

    const cart: string[] = JSON.parse(localStorage.getItem(`cart_${user.id}`) || '[]');
    if (!cart.includes(courseId)) {
      cart.push(courseId);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
      alert('دوره به سبد خرید اضافه شد');
    } else {
      alert('این دوره قبلا به سبد خرید اضافه شده است');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Login</h1>
        <p className="text-muted-foreground mb-6">You need to login to view your wishlist</p>
        <Link to="/login">
          <Button>Login Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">خواستنی های من</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <HeartIcon className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-4">لیست دلخواه شما خالی است</h2>
          <p className="text-muted-foreground mb-6">دوره هایی که به آنها علاقه مند هستید را اضافه کنید</p>
          <Link to="/courses">
            <Button variant="hero" size="lg">مشاهده دوره‌ها</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((course) => {
            const teacher: Teacher | undefined = teachersData.find(
              (t) => t.id === course.teacher
            );

            return (
              <div key={course.id} className="bg-card rounded-lg overflow-hidden shadow-lg group">
                <div className="relative h-48">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(course.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-destructive hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      {course.level}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

                  {teacher && (
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">{teacher.name}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="text-sm font-bold">{course.rating}</span>
                      <span className="text-xs text-muted-foreground">({course.enrolled})</span>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {(course.price / 1000).toFixed(0)}K IRR
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/courses/${course.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">مشاهده جزئیات</Button>
                    </Link>
                    <Button
                      onClick={() => addToCart(course.id)}
                      size="icon"
                      className="flex-shrink-0"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
