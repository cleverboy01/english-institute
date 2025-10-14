import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">با ما تماس بگیرید</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
اگر سوالی دارید خوشحال می‌شویم از شما بشنویم. برای ما پیام ارسال کنید و ما در کوتاه‌ترین زمان ممکن پاسخ خواهیم داد.        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">برای ما پیام بفرستید</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">نام *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="نام خود را وارد نمایید"
              />
            </div>

            <div>
              <Label htmlFor="email">ایمیل *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="ایمیل خود را وارد نمایید"
              />
            </div>

            <div>
              <Label htmlFor="phone">تلفن همراه</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="شماره خود را وارد نمایید"
              />
            </div>

            <div>
              <Label htmlFor="subject">موضوع *</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="چطور میتونم کمکتون کنم؟"
              />
            </div>

            <div>
              <Label htmlFor="message">پیام *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="درباره موضوع خود بیشتر توضیح دهید"
                rows={6}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" variant="hero">
              ارسال پیام
            </Button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">اطلاعات تماس</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">آدرس</h3>
                  <p className="text-muted-foreground">
                    تهران - نیاوران -<br />
تهران - نیاوران                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">تلفن</h3>
                  <p className="text-muted-foreground">
                    +98 21 1234 5678<br />
                    +98 912 345 6789
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">ایمیل</h3>
                  <p className="text-muted-foreground">
                    info@englishinstitute.com<br />
                    support@englishinstitute.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
<div>
  <h3 className="font-semibold mb-1">ساعات اداری</h3>
  <p className="text-muted-foreground">
    دوشنبه تا جمعه: ۸ صبح تا ۸ شب<br />
    شنبه: ۹ صبح تا ۶ عصر<br />
    یکشنبه: تعطیل
  </p>
</div>

              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-card p-4 rounded-lg shadow-lg">
            <div className="aspect-video bg-muted rounded-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51847.81680284272!2d51.338076!3d35.699739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0a00e7f1e8b0e0!2sTehran%2C%20Iran!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Our Location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;