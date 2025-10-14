/* cSpell:disable */
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import coursesData from "../../data/courses.json";
import { useAuth } from "../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Upload, X } from "lucide-react";

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
  duration?: string;
  sessions?: number;
}

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    level: "",
    category: "",
    image: "",
    duration: "",
    sessions: "",
  });

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    } else {
      setCourses(coursesData);
      localStorage.setItem("courses", JSON.stringify(coursesData));
    }
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }, [courses]);

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("حجم فایل نباید بیشتر از 2 مگابایت باشد");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("فقط فایل‌های تصویری مجاز هستند");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData((prev) => ({
          ...prev,
          image: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setImagePreview(course.image);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      level: course.level,
      category: course.category || "",
      image: course.image,
      duration: course.duration || "",
      sessions: course.sessions?.toString() || "",
    });
  };

  const handleNewCourse = () => {
    setEditingCourse(null);
    setImagePreview("");
    setFormData({
      title: "",
      description: "",
      price: "",
      level: "",
      category: "",
      image: "",
      duration: "",
      sessions: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.image) {
      alert("لطفا تصویر دوره را انتخاب کنید");
      return;
    }

    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id
            ? {
                ...c,
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                level: formData.level,
                category: formData.category,
                image: formData.image,
                slug: createSlug(formData.title),
                duration: formData.duration,
                sessions: parseInt(formData.sessions) || 0,
              }
            : c
        )
      );
      alert("دوره با موفقیت ویرایش شد!");
    } else {
      const newCourse: Course = {
        id: uuidv4(),
        teacher: user.id,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        level: formData.level,
        category: formData.category,
        image: formData.image,
        slug: createSlug(formData.title),
        rating: 5.0,
        enrolled: 0,
        duration: formData.duration || "10 ساعت",
        sessions: parseInt(formData.sessions) || 20,
      };
      setCourses((prev) => [...prev, newCourse]);
      alert("دوره جدید با موفقیت ایجاد شد!");
    }

    setEditingCourse(null);
    setImagePreview("");
    setFormData({
      title: "",
      description: "",
      price: "",
      level: "",
      category: "",
      image: "",
      duration: "",
      sessions: "",
    });
  };

  const handleDelete = (courseId: string) => {
    if (
      window.confirm("آیا مطمئن هستید که میخواهید این دوره را حذف کنید؟")
    ) {
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
      alert("دوره با موفقیت حذف شد!");
    }
  };

  if (!user || user.role !== "teacher") {
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">داشبورد استاد</h1>

      <div className="mb-8 bg-card rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            {editingCourse ? "ویرایش دوره" : "ایجاد دوره جدید"}
          </h2>
          {editingCourse && (
            <Button onClick={handleNewCourse} variant="outline">
              انصراف از ویرایش
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-2">
              عنوان دوره
            </label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              placeholder="مثلا: آموزش React از صفر تا صد"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              توضیحات دوره
            </label>
            <Textarea
              name="description"
              value={formData.description}
              placeholder="توضیحات کامل درباره دوره..."
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                قیمت (ریال)
              </label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                placeholder="مثلا: 5000000"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                سطح دوره
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full h-10 px-4 rounded-md border border-input bg-background"
                required
              >
                <option value="">انتخاب کنید</option>
                <option value="مبتدی">مبتدی</option>
                <option value="متوسط">متوسط</option>
                <option value="پیشرفته">پیشرفته</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                دسته‌بندی
              </label>
              <Input
                type="text"
                name="category"
                value={formData.category}
                placeholder="مثلا: برنامه‌نویسی"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                مدت زمان
              </label>
              <Input
                type="text"
                name="duration"
                value={formData.duration}
                placeholder="مثلا: 15 ساعت"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              تعداد جلسات
            </label>
            <Input
              type="number"
              name="sessions"
              value={formData.sessions}
              placeholder="مثلا: 25"
              onChange={handleChange}
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium mb-2">
              تصویر دوره
            </label>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="پیش نمایش"
                  className="w-full h-64 object-cover rounded-lg border-2 border-primary"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="mt-2 text-sm text-muted-foreground">
                  برای تغییر تصویر، روی دکمه زیر کلیک کنید
                </div>
                <label
                  htmlFor="image-upload"
                  className="mt-2 inline-block cursor-pointer"
                >
                  <div className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                    انتخاب تصویر دیگر
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-12 w-12 text-primary mb-4" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">
                      برای آپلود کلیک کنید
                    </span>{" "}
                    یا تصویر را بکشید و رها کنید
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG یا JPEG (حداکثر 2MB)
                  </p>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!formData.image}
          >
            {editingCourse ? "ذخیره تغییرات" : "ایجاد دوره"}
          </Button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">دوره‌های شما</h2>

        {courses.filter((c) => c.teacher === user.id).length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg">
            <p className="text-muted-foreground text-lg">
              شما هنوز هیچ دوره‌ای ایجاد نکرده‌اید.
            </p>
            <Button onClick={handleNewCourse} className="mt-4">
              اولین دوره خود را بسازید
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((c) => c.teacher === user.id)
              .map((course) => (
                <div
                  key={course.id}
                  className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2 line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                        {course.level}
                      </span>
                      <span className="text-muted-foreground">
                        {course.category}
                      </span>
                    </div>

                    <p className="font-semibold text-primary text-lg mb-4">
                      {course.price.toLocaleString()} ریال
                    </p>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(course)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        ویرایش
                      </Button>
                      <Link to={`/courses/${course.slug}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          مشاهده
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(course.id)}
                        variant="destructive"
                        size="sm"
                      >
                        حذف
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
