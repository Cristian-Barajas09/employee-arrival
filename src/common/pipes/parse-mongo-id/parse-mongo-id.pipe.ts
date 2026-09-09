import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  public transform(value: any, metadata: ArgumentMetadata) {


    if (!isValidObjectId(value)) {
      throw new BadRequestException(`the id ${value} is not valid`);
    }

    return value;
  }
}
