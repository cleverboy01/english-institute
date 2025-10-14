import { Award, Users, BookOpen, TrendingUp } from "lucide-react";

export const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">درباره موسسه</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          ما مشتاقانه تلاش می‌کنیم تا به دانشجویان در دستیابی به اهداف زبان
          انگلیسی‌شان از طریق روش‌های نوآورانه آموزشی و پشتیبانی متعهدانه کمک
          کنیم.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">چشم انداز ما</h2>
          <p className="text-muted-foreground leading-relaxed">
            تبدیل شدن به پیشروترین مؤسسه آموزش زبان انگلیسی است که به‌دلیل برتری
            در تدریس، برنامهٔ درسی نوآورانه و موفقیت دانشجویان شناخته می‌شود.
            هدف ما پرورش شهروندان جهانی است که بتوانند به‌طور مؤثر در میان
            فرهنگ‌های مختلف ارتباط برقرار کنند.
          </p>
        </div>

        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">ماموریت ما</h2>
          <p className="text-muted-foreground leading-relaxed">
            ارائه آموزش زبان انگلیسی باکیفیت که به دانشجویان توانایی می‌دهد با
            اعتماد‌به‌نفس در هر موقعیتی ارتباط برقرار کنند. ما باور داریم که
            یادگیری زبان باید جذاب، مؤثر و در دسترس همه باشد.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <div className="bg-primary/10 p-6 rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-2">15+</h3>
          <p className="text-muted-foreground">سال های تعالی</p>
        </div>

        <div className="bg-secondary/20 p-6 rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-2">5,000+</h3>
          <p className="text-muted-foreground">رضایت دانشجویان</p>
        </div>

        <div className="bg-success/20 p-6 rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-2">50+</h3>
          <p className="text-muted-foreground">اساتید خبره</p>
        </div>

        <div className="bg-primary/10 p-6 rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-2">98%</h3>
          <p className="text-muted-foreground">میزان موفقیت</p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          چرا ما را انتخاب کنید؟
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">اساتید خبره</h3>
            <p className="text-muted-foreground">
اساتید ما افراد بومی دارای گواهی معتبر هستند که تجربه گسترده‌ای در آموزش و اشتیاق فراوانی برای کمک به موفقیت دانشجویان دارند.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">روش‌های اثبات‌شده</h3>
            <p className="text-muted-foreground">
              ما از روش‌های آموزشی بین‌المللی استفاده می‌کنیم که اثربخشی آن‌ها
              برای دستیابی به نتایج موفقیت‌آمیز ثابت شده است.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">کلاس‌های کوچک
</h3>
            <p className="text-muted-foreground">
حداکثر ۱۲ دانشجو در هر کلاس باعث می‌شود توجه شخصی‌تری به هر فرد شود و فرصت بیشتری برای تمرین مکالمه وجود داشته باشد.


            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">برنامه ریزی انعطاف پذیر</h3>
            <p className="text-muted-foreground">
کلاس‌های صبح، بعدازظهر، عصر و آخر هفته را ارائه می‌دهیم تا با برنامه شلوغ شما سازگار باشد.


            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">امکانات مدرن
</h3>
            <p className="text-muted-foreground">
کلاس‌های مجهز به جدیدترین فناوری‌ها و منابع آموزشی برای ارتقای تجربه یادگیری.


            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">گواهی پایان دوره
</h3>
            <p className="text-muted-foreground">
پس از اتمام موفقیت‌آمیز دوره، گواهی‌نامه‌های بین‌المللی معتبر دریافت خواهید کرد.


            </p>
          </div>
        </div>
      </div>

      {/* Our History */}
      <div className="bg-card p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">تاریخچه ما</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            مؤسسه زبان انگلیسی ما که در سال ۲۰۰۸ تأسیس شد، با هدفی ساده آغاز به
            کار کرد: ارائه آموزش باکیفیت زبان انگلیسی به دانشجویان با هر
            پیش‌زمینه و سطحی. آنچه به‌عنوان یک مرکز کوچک با تنها سه معلم آغاز
            شد، امروزه به یکی از معتبرترین مؤسسات آموزش زبان در منطقه تبدیل شده
            است.
          </p>
          <p>
            در طی ۱۵ سال گذشته، به هزاران دانشجو کمک کرده‌ایم تا به اهداف زبانی
            خود دست یابند، چه برای قبولی در آزمون‌های بین‌المللی، چه پیشرفت
            شغلی، و چه افزایش اعتمادبه‌نفس در مکالمه به زبان انگلیسی. موفقیت ما
            بر پایهٔ آموزش عالی، روش‌های نوآورانه و توجه صادقانه به پیشرفت هر
            دانشجو بنا شده است.
          </p>
          <p>
            امروز مفتخریم که مجموعه‌ای کامل از دوره‌ها را با تدریس اساتید بومی
            متخصص و با بهره‌گیری از جدیدترین فناوری‌ها و منابع آموزشی ارائه
            می‌کنیم. تعهد ما به برتری و موفقیت دانشجویانمان همچنان استوار و
            دقیقاً مانند روز نخست ادامه دارد.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
