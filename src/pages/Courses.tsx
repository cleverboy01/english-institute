/* cSpell:disable */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Search, ShoppingCart, Heart } from "lucide-react";
import coursesData from "@/data/courses.json";
import teachersData from "@/data/teachers.json";
import { useAuth } from "@/contexts/AuthContext";
import "./Courses.css";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  category: string;
  image: string;
  teacher: string;
  slug: string;
  rating: number;
  enrolled: number;
}

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const { user } = useAuth();

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      const parsed = JSON.parse(storedCourses) as Course[];
      setCourses(parsed);
      setFilteredCourses(parsed);
    } else {
      setCourses(coursesData);
      setFilteredCourses(coursesData);
      localStorage.setItem("courses", JSON.stringify(coursesData));
    }
  }, []);

  useEffect(() => {
    let result = [...courses];

    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLevel !== "all") {
      result = result.filter((course) => course.level === selectedLevel);
    }

    if (selectedCategory !== "all") {
      result = result.filter((course) => course.category === selectedCategory);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result.sort((a, b) => b.enrolled - a.enrolled);
        break;
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedLevel, selectedCategory, sortBy, courses]);

  const addToCart = (courseId: string) => {
    if (!user) {
      alert("لطفا ابتدا وارد شوید");
      return;
    }

    const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`) || "[]");
    if (!cart.includes(courseId)) {
      cart.push(courseId);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
      alert("دوره به سبد خرید اضافه شد!");
    } else {
      alert("این دوره قبلا به سبد خرید اضافه شده است");
    }
  };

  const addToWishlist = (courseId: string) => {
    if (!user) {
      alert("لطفا ابتدا وارد شوید");
      return;
    }

    const wishlist = JSON.parse(
      localStorage.getItem(`wishlist_${user.id}`) || "[]"
    );
    if (!wishlist.includes(courseId)) {
      wishlist.push(courseId);
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
      alert("به علاقه‌مندی‌ها اضافه شد!");
    } else {
      alert("این دوره قبلا به علاقه مندی ها اضافه شده است");
    }
  };

  const categories: string[] = [
    "همه",
    ...Array.from(new Set(courses.map((c) => c.category))),
  ];
  const levels: string[] = ["همه", "مبتدی", "متوسط", "پیشرفته"];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">همه دوره ها</h1>
        <p className="text-muted-foreground">
          بهترین دوره‌های آموزشی را انتخاب کنید
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="جستجو در دوره‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="h-10 px-4 rounded-md border border-input bg-background"
          >
            {levels.map((level: string) => (
              <option
                key={String(level)}
                value={level === "همه" ? "all" : level}
              >
                {level}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-4 rounded-md border border-input bg-background"
          >
            {categories.map((cat: string) => (
              <option key={String(cat)} value={cat === "همه" ? "all" : cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 px-4 rounded-md border border-input bg-background"
          >
            <option value="popular">محبوب ترین</option>
            <option value="rating">بیشترین امتیاز</option>
            <option value="price-low">قیمت: کم تا زیاد</option>
            <option value="price-high">قیمت: زیاد تا کم</option>
          </select>
        </div>
      </div>

      <div className="mb-6 text-sm text-muted-foreground">
        {filteredCourses.length} دوره از {courses.length} دوره
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const teacher = teachersData.find((t) => t.id === course.teacher);

            return (
              <div
                key={course.id}
                className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <button
                    onClick={() => addToWishlist(course.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-secondary transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {teacher && (
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">
                        {teacher.name}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="text-sm font-bold">{course.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({course.enrolled})
                      </span>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {(course.price / 1000).toFixed(0)}K IRR
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/courses/${course.slug}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full"
                        style={{ border: "1px solid #052861" }}
                      >
                        مشاهده جزئیات
                      </Button>
                    </Link>
                    <Button
                      size="icon"
                      onClick={() => addToCart(course.id)}
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
      ) : (
        <div className="text-center py-12 bg-card rounded-lg">
          <p className="text-xl text-muted-foreground">
            دوره‌ای با این مشخصات یافت نشد
          </p>
        </div>
      )}
    </div>
  );
};

export default Courses;
