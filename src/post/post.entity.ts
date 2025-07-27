import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

export enum LanguageType {
  BR = 'br',
  EN = 'en',
}

export class Reference {
  src: string;
  name: string;
}

export class Tag {
  label: string;
  slug: string;
  color?: string;
}

@Entity()
export class Post {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column()
  imgSrc: string;

  @Column()
  title: { [K in LanguageType]: string };

  @Column()
  description: { [K in LanguageType]: string };

  @Column()
  date: Date;

  @Column()
  text: { [K in LanguageType]: string };

  @Column({ default: false })
  isPublished: boolean;

  @Column()
  references: Reference[];

  @Column(() => Tag)
  tags?: Tag[];
}
