import { Injectable } from '@nestjs/common';

@Injectable()
export class DistributorService {

  allThickness = []

  writeData(data) {
    this.allThickness = data;
  }

  getData() {
    return this.allThickness
  }

}
