import { Link } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";

import {
  Book,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <img
              src={`${import.meta.env.BASE_URL}Images/logo4.png`}
                style={{ width: "100px" }}
                alt="لوگو"
              />{" "}
              <span className="text-xl font-bold">
                آموزشگاه الماس
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              موسسه برتر آموزش زبان انگلیسی با اساتید خبره و روش‌های تدریس
              اثبات‌شده. موفقیت شما ماموریت ماست
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/mrezakazemi_"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courses"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  همه دوره‌ها{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/teachers"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  اساتید ما{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  درباره ما{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  بلاگ{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  با ما تماس بگیرید{" "}
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-bold text-lg mb-4">محبوب ترین دوره ها</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courses?filter=ielts"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  آمادگی آیلتس{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/courses?filter=toefl"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  آمادگی تافل
                </Link>
              </li>
              <li>
                <Link
                  to="/courses?filter=business"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  انگلیسی تجاری
                </Link>
              </li>
              <li>
                <Link
                  to="/courses?filter=conversation"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  انگلیسی مکالمه
                </Link>
              </li>
              <li>
                <Link
                  to="/courses?filter=beginner"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  انگلیسی برای مبتدیان
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">با ما تماس بگیرید </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaTelegramPlane className="h-5 w-5 text-primary flex-shrink-0" />
                <Link to="https://t.me/Mrezakazemix">
                  <span>Telegram</span>
                </Link>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span>mkazemi.contact@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} موسسه زبان انگلیسی الماس. تمامی
            حقوق محفوظ است. |{" "}
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              حریم خصوصی
            </Link>{" "}
            |{" "}
            <Link to="/terms" className="hover:text-primary transition-colors">
              شرایط خدمات
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
