export class Container {
  maxWeight: number = 100;
  currentWeight: number = 0;
  packagesWeights: {weight: number, numberOfPackage: number}[] = [];

  constructor() {
  }

  setWeight(weight: number, numberOfPackage) {
     if(this.currentWeight + weight > this.maxWeight) return false;
     this.packagesWeights.push({weight: weight, numberOfPackage: numberOfPackage});
     this.currentWeight += weight;
     return true
  }

  getSpace() {
    return this.maxWeight - this.currentWeight;
  }
}
