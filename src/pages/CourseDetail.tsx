/* cSpell:disable */
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Star,
  Clock,
  Users,
  BookOpen,
  ShoppingCart,
  Heart,
  CheckCircle,
} from "lucide-react";
import coursesData from "@/data/courses.json";
import teachersData from "@/data/teachers.json";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

interface SyllabusSession {
  title: string;
  description: string;
  duration?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  category?: string;
  image: string;
  teacher: string;
  slug: string;
  rating?: number;
  enrolled?: number;
  duration?: string;
  sessions?: number;
  learningPoints?: string[];
  fullDescription?: string;
  syllabus?: SyllabusSession[];
  requirements?: string[];
}

export const CourseDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    let allCourses: Course[] = coursesData as Course[];

    if (storedCourses) {
      allCourses = JSON.parse(storedCourses) as Course[];
    }

    const foundCourse = allCourses.find((c: Course) => c.slug === slug);
    setCourse(foundCourse || null);
  }, [slug]);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">دوره یافت نشد</h1>
        <p className="text-muted-foreground mb-8">
          دوره مورد نظر شما وجود ندارد
        </p>
        <Link to="/courses">
          <Button>بازگشت به لیست دوره‌ها</Button>
        </Link>
      </div>
    );
  }

  const teacher = teachersData.find((t) => t.id === course.teacher);

  const addToCart = () => {
    if (!user) {
      alert("لطفا ابتدا وارد شوید");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`) || "[]");
    if (!cart.includes(course.id)) {
      cart.push(course.id);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
      alert("دوره به سبد خرید اضافه شد!");
    } else {
      alert("این دوره قبلا به سبد خرید اضافه شده است");
    }
  };

  const addToWishlist = () => {
    if (!user) {
      alert("لطفا ابتدا وارد شوید");
      navigate("/login");
      return;
    }

    const wishlist = JSON.parse(
      localStorage.getItem(`wishlist_${user.id}`) || "[]"
    );
    if (!wishlist.includes(course.id)) {
      wishlist.push(course.id);
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
      alert("به علاقه‌مندی‌ها اضافه شد!");
    } else {
      alert("قبلا به علاقه‌مندی‌ها اضافه شده است");
    }
  };

  const enrollNow = () => {
    if (!user) {
      alert("لطفا ابتدا وارد شوید");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`) || "[]");
    if (!cart.includes(course.id)) {
      cart.push(course.id);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
    navigate("/cart");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-bold rounded-full">
                {course.level}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-white/90 mb-6">{course.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-white mb-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-secondary text-secondary" />
                <span className="font-bold">{course.rating || 5.0}</span>
                <span className="opacity-80">
                  ({course.enrolled || 0} دانشجو)
                </span>
              </div>
              {course.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
              )}
              {course.sessions && (
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.sessions} جلسه</span>
                </div>
              )}
            </div>

            {teacher && (
              <Link to={`/teachers/${teacher.id}`}>
                <div className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <div>
                    <p className="text-sm opacity-80">مدرس دوره</p>
                    <p className="font-bold">{teacher.name}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Course Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              {course.learningPoints && course.learningPoints.length > 0 && (
                <div className="bg-card rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">
                    آنچه یاد خواهید گرفت
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.learningPoints.map((point: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Description */}
              <div className="bg-card rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">توضیحات دوره</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>{course.fullDescription || course.description}</p>
                </div>
              </div>

              {/* Course Content */}
              {course.syllabus && course.syllabus.length > 0 && (
                <div className="bg-card rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">محتوای دوره</h2>
                  <div className="space-y-3">
                    {course.syllabus.map((session: SyllabusSession, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold">{session.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {session.description}
                          </p>
                        </div>
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {course.requirements && course.requirements.length > 0 && (
                <div className="bg-card rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">پیش‌نیازها</h2>
                  <ul className="space-y-2">
                    {course.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Teacher Info */}
              {teacher && (
                <div className="bg-card rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">درباره مدرس</h2>
                  <div className="flex items-start gap-4">
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-24 h-24 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
                      <p className="text-secondary mb-2">{teacher.specialty}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          <span>{teacher.rating}</span>
                        </div>
                        <span>{teacher.experience} سال تجربه</span>
                        <span>{teacher.students}+ دانشجو</span>
                      </div>
                      <p className="text-muted-foreground">{teacher.bio}</p>
                      <Link to={`/teachers/${teacher.id}`}>
                        <Button variant="outline" size="sm" className="mt-4">
                          مشاهده پروفایل
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 shadow-xl sticky top-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />

                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {(course.price / 1000000).toFixed(1)} میلیون تومان
                  </div>
                  <p className="text-sm text-muted-foreground">قیمت کامل دوره</p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button onClick={enrollNow} size="lg" className="w-full">
                    ثبت‌نام در دوره
                  </Button>
                  <Button
                    onClick={addToCart}
                    variant="outline"
                    size="lg"
                    className="w-full gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    افزودن به سبد خرید
                  </Button>
                  <Button
                    onClick={addToWishlist}
                    variant="outline"
                    size="lg"
                    className="w-full gap-2"
                  >
                    <Heart className="h-5 w-5" />
                    افزودن به علاقه‌مندی‌ها
                  </Button>
                </div>

                <div className="border-t pt-6 space-y-3">
                  <h3 className="font-bold mb-4">این دوره شامل:</h3>
                  {course.duration && (
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{course.duration} محتوای ویدیویی</span>
                    </div>
                  )}
                  {course.sessions && (
                    <div className="flex items-center gap-3 text-sm">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>{course.sessions} جلسه آموزشی</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-5 w-5 text-primary" />
                    <span>دسترسی مادام‌العمر</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>گواهینامه پایان دوره</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
