import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import teachersData from '@/data/teachers.json';

export const Teachers = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">با اساتید ما آشنا شوید</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
از اساتید معتبر با سوابق اثبات شده در تدریس زبان انگلیسی بهره مند شوید
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachersData.map((teacher) => (
          <div key={teacher.id} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
            <div className="relative h-64 overflow-hidden">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {teacher.name}
              </h3>
              <p className="text-secondary font-semibold mb-2">{teacher.specialty}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 fill-secondary text-secondary" />
                <span className="font-bold">{teacher.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({teacher.students}+ دانشجو)
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {teacher.bio}
              </p>

              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="text-muted-foreground">تجربه:</span>
                <span className="font-semibold">{teacher.experience} سال</span>
              </div>

              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-2">گواهینامه ها:</div>
                <div className="flex flex-wrap gap-2">
                  {teacher.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <Link to={`/teachers/${teacher.id}`}>
                <Button className="w-full" variant="outline">
                  مشاهده پروفایل
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;