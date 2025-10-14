import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Clock,
  Star,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import coursesData from "@/data/courses.json";
import teachersData from "@/data/teachers.json";

export const Home = () => {
  const [courses, setCourses] = useState(coursesData.slice(0, 6));
  const [teachers, setTeachers] = useState(teachersData.slice(0, 4));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              انگلیسی را با اساتید حرفه‌ای یاد بگیرید
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
              مهارت‌های انگلیسی خود را با روش‌های اثبات‌شده و راهنمایی‌های
              شخصی‌شده متحول کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/courses">
                <Button size="xl" variant="secondary" className="gap-2">
                  مشاهده دوره‌ها <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button
                  size="xl"
                  variant="outline"
                  className="bg-white/10 text-white border-white hover:bg-white hover:text-primary"
                >
                  شروع دوره رایگان
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">سابقه </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">5,000+</div>
              <div className="text-sm text-muted-foreground">
                رضایت دانشجویان{" "}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">نرخ موفقیت</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">
                دوره های موجود
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              چرا بهترین انتخابیم؟
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              ما بهترین تجربه یادگیری زبان انگلیسی را با روش‌های اثبات‌شده و
              اساتید متخصص ارائه می‌دهیم
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">اساتید خبره</h3>
              <p className="text-muted-foreground">
از اساتید بومی معتبر با سال‌ها تجربه تدریس بیاموزید
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">کلاس های کوچک</h3>
              <p className="text-muted-foreground">
حداکثر ۱۲ نفر در هر کلاس برای توجه شخصی بیشتر              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 text-success mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">دوره‌های معتبر</h3>
              <p className="text-muted-foreground">
                دوره‌های معتبرمدارک معتبر بین‌المللی پس از اتمام دوره
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">برنامه‌ریزی منعطف</h3>
              <p className="text-muted-foreground">
کلاس‌ها صبح، عصر و آخر هفته برگزار می‌شود              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
محبوب ترین دوره ها            </h2>
            <p className="text-muted-foreground text-lg">
از بین دوره‌های محبوب ما انتخاب کنید            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
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
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      {teacher && (
                        <>
                          <img
                            src={teacher.avatar}
                            alt={teacher.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm text-muted-foreground">
                            {teacher.name}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="text-sm font-semibold">
                          {course.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({course.enrolled})
                        </span>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {(course.price / 1000).toFixed(0)}K IRR
                      </div>
                    </div>

                    <Link to={`/courses/${course.slug}`}>
                      <Button className="w-full" variant="outline">
                        مشاهده جزئیات
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses">
              <Button size="lg" variant="hero" className="gap-2">
                مشاهده همه دوره ها <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              با اساتید ما آشنا شوید
            </h2>
            <p className="text-muted-foreground text-lg">
از بهترین اساتید این حوزه یاد بگیرید           </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <Link key={teacher.id} to={`/teachers/${teacher.id}`}>
                <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow text-center group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-sm text-secondary mb-2">
                      {teacher.specialty}
                    </p>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="text-sm font-semibold">
                        {teacher.rating}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {teacher.experience} سابقه تدریس • {teacher.students}
                      + دانشجو
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/teachers">
              <Button size="lg" variant="outline" className="gap-2">
                مشاهده همه اساتید <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
آماده شروع سفر انگلیسی خود هستید؟          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
به هزاران دانشجوی موفق بپیوندید که مهارت های خود را با ما تغییر داده اند
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="xl" variant="secondary">
حالا شروع کنید              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="xl"
                variant="outline"
                className="bg-white/10 text-white border-white hover:bg-white hover:text-primary"
              >
با ما تماس بگیرید               </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
