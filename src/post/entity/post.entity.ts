import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectId,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum LanguageType {
  BR = 'br',
  EN = 'en',
}

export class LocationText {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  br: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  en: string;
}

export class Reference {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  src: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class Tag {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color?: string;
}

@Entity()
export class Post {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column()
  title: { [K in LanguageType]: string };

  @Column()
  description: { [K in LanguageType]: string };

  @Column()
  date: Date;

  @Column()
  text: { [K in LanguageType]: string };

  @Column()
  imgSrc?: string;

  @Column({ default: false })
  isPublished?: boolean;

  @Column()
  references?: Reference[];

  @Column(() => Tag)
  tags?: Tag[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
