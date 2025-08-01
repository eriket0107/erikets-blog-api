import {
  IsDate,
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LocationText, Reference, Tag } from '../entity/post.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  date: Date;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationText)
  @ApiProperty()
  description: LocationText;

  @IsOptional()
  @IsString()
  @ApiProperty()
  imgSrc: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isPublished?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ type: [Reference] })
  @Type(() => Reference)
  references: Reference[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ type: [Tag] })
  @Type(() => Tag)
  tags?: Tag[] | undefined;

  @ValidateNested()
  @IsNotEmpty()
  @ApiProperty()
  @Type(() => LocationText)
  text: LocationText;

  @ValidateNested()
  @IsNotEmpty()
  @ApiProperty()
  @Type(() => LocationText)
  title: LocationText;
}
