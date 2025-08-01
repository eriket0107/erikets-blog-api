import {
  IsDate,
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { LocationText, Reference, Tag } from '../entity/post.entity';

export class UpdatePostDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationText)
  description: LocationText;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imgSrc: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({ type: [Reference] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Reference)
  references: Reference[];

  @ApiPropertyOptional({ type: [Tag] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Tag)
  tags?: Tag[] | undefined;

  @ApiPropertyOptional()
  @ValidateNested()
  @IsOptional()
  @Type(() => LocationText)
  text: LocationText;

  @ApiPropertyOptional()
  @ValidateNested()
  @IsOptional()
  @Type(() => LocationText)
  title: LocationText;
}
