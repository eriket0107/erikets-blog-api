import { Reference, Tag } from '../post.entity';

export class PostCreateDto {
  date: Date;
  description: { br: string; en: string };
  imgSrc: string;
  isPublished: boolean;
  references: Reference[];
  tags?: Tag[] | undefined;
  text: { br: string; en: string };
  title: { br: string; en: string };
}
