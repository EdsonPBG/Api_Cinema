import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateMovieSessionDto) {}