// course.model.ts
export class Course {
  constructor(
    public _id: string,
   public courseName: string,
   public courseDetail: string,
   public courseImage: string,
   public coursePrice: number,
   public courseFile: string,
   public createdAt?: string,
   public updatedAt?: string,
  ){
    
  }
  }
  