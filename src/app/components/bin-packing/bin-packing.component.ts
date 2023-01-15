import {Component, OnInit} from '@angular/core';
import {Container} from "../../utils/container";

@Component({
  selector: 'app-bin-packing',
  templateUrl: './bin-packing.component.html',
  styleUrls: ['./bin-packing.component.css']
})
export class BinPackingComponent implements OnInit{
  weights: number[][] = [
    [57,27,12,86,14,55,12,90,12,79,10,69,89,74,55,41,20,33,87,88],
    [38,66,70,84,56,17,6,60,49,37,5,59,17,18,45,83,73,58,73,37],
    [89,83,7,78,57,14,71,29,51,59,18,38,25,88,74,33,57,81,93,58]
  ]
  tables: {containers: Container[], complexity: number, name: string, dim: number}[] = [];

  ngOnInit() {
    for (let i = 0; i < this.weights.length; i++) {
      this.tables.push({...this.nfa(this.weights[i]), name: `NFA Unsorted C${i + 1}`, dim: 20});
      this.tables.push({...this.ffa(this.weights[i]), name: `FFA Unsorted C${i + 1}`, dim: 20});
      this.tables.push({...this.wfa(this.weights[i]), name: `WFA Unsorted C${i + 1}`, dim: 20});
      this.tables.push({...this.bfa(this.weights[i]), name: `BFA Unsorted C${i + 1}`, dim: 20});
    }

    for (let i = 0; i < this.weights.length; i++) {
      const sortedWeightsAscending = this.weights[i].sort((a, b) => b - a);
      this.tables.push({...this.nfa(sortedWeightsAscending), name: `NFA Sorted Ascending C${i + 1}`, dim: 20});
      this.tables.push({...this.ffa(sortedWeightsAscending), name: `FFA Sorted Ascending C${i + 1}`, dim: 20});
      this.tables.push({...this.wfa(sortedWeightsAscending), name: `WFA Sorted Ascending C${i + 1}`, dim: 20});
      this.tables.push({...this.bfa(sortedWeightsAscending), name: `BFA Sorted Ascending C${i + 1}`, dim: 20});
    }

    for (let i = 0; i < this.weights.length; i++) {
      const sortedWeightsDescending = this.weights[i].sort((a, b) => a - b);
      this.tables.push({...this.nfa(sortedWeightsDescending), name: `NFA Sorted Descending C${i + 1}`, dim: 20});
      this.tables.push({...this.ffa(sortedWeightsDescending), name: `FFA Sorted Descending C${i + 1}`, dim: 20});
      this.tables.push({...this.wfa(sortedWeightsDescending), name: `WFA Sorted Descending C${i + 1}`, dim: 20});
      this.tables.push({...this.bfa(sortedWeightsDescending), name: `BFA Sorted Descending C${i + 1}`, dim: 20});
    }

    const combinedWeights = [...this.weights[0], ...this.weights[1], ...this.weights[2]];

    this.tables.push({...this.nfa(combinedWeights), name: `NFA Unsorted C1-3`, dim: 60});
    this.tables.push({...this.ffa(combinedWeights), name: `FFA Unsorted C1-3`, dim: 60});
    this.tables.push({...this.wfa(combinedWeights), name: `WFA Unsorted C1-3`, dim: 60});
    this.tables.push({...this.bfa(combinedWeights), name: `BFA Unsorted C1-3`, dim: 60});

    const sortedWeightsAscendingCombined = combinedWeights.sort((a, b) => b - a);
    this.tables.push({...this.nfa(sortedWeightsAscendingCombined), name: `NFA Sorted Ascending C1-3`, dim: 60});
    this.tables.push({...this.ffa(sortedWeightsAscendingCombined), name: `FFA Sorted Ascending C1-3`, dim: 60});
    this.tables.push({...this.wfa(sortedWeightsAscendingCombined), name: `WFA Sorted Ascending C1-3`, dim: 60});
    this.tables.push({...this.bfa(sortedWeightsAscendingCombined), name: `BFA Sorted Ascending C1-3`, dim: 60});

    const sortedWeightsDescendingCombined = combinedWeights.sort((a, b) => b - a);
    this.tables.push({...this.nfa(sortedWeightsDescendingCombined), name: `NFA Sorted Descending C1-3`, dim: 60});
    this.tables.push({...this.ffa(sortedWeightsDescendingCombined), name: `FFA Sorted Descending C1-3`, dim: 60});
    this.tables.push({...this.wfa(sortedWeightsDescendingCombined), name: `WFA Sorted Descending C1-3`, dim: 60});
    this.tables.push({...this.bfa(sortedWeightsDescendingCombined), name: `BFA Sorted Descending C1-3`, dim: 60});


    this.sortPackages();
    console.log(this.tables);
  }

  sortPackages() {
    this.tables.forEach(table => {
      table.containers.forEach(container => {
        const packagesWeights = container.packagesWeights;
        container.packagesWeights = new Array(table.dim);
        packagesWeights.forEach(pack => {
          container.packagesWeights[pack.numberOfPackage] = pack;
        })
      })
    })
  }


  nfa(weights: number[]): {containers: Container[], complexity: number} {
    if(weights.length === 0) return null;
    let j = 0;
    let complexity = 1;
    const newContainer = new Container();
    newContainer.setWeight(weights[0], 0);
    const containers = [newContainer];
    weights.slice(1).forEach((weight, index) => {
      complexity += 1;
      if(!containers[j].setWeight(weight, index + 1)) {
        containers.push(new Container());
        j += 1;
        containers[j].setWeight(weight, index + 1);
        complexity += 1
      }
    })
    return  {containers: containers, complexity: complexity}
  }

  ffa(weights: number[]): {containers: Container[], complexity: number} {
    if(weights.length === 0) return null;
    let j = 0;
    let complexity = 1;

    let isWeightSet = false;
    const newContainer = new Container();
    newContainer.setWeight(weights[0], 0);
    const containers = [newContainer];
    weights.slice(1).forEach((weight, index) => {
      if(!containers[j].setWeight(weight, index + 1)) {
        for(let n = 0; n < containers.length; n++) {
          isWeightSet = containers[n].setWeight(weight, index + 1);
          complexity += 1;
          if (isWeightSet) break;
        }
        if (!isWeightSet) {
          containers.push(new Container());
          j += 1;
          containers[j].setWeight(weight, index + 1);
          complexity += 1
        }
      }
    })
    return  {containers: containers, complexity: complexity}
  }

  wfa(weights: number[]): {containers: Container[], complexity: number} {
    if(weights.length === 0) return null;
    let j = 0;
    let complexity = 1;
    const newContainer = new Container();
    newContainer.setWeight(weights[0], 0);
    const containers = [newContainer];
    weights.slice(1).forEach((weight, index) => {
      complexity += 1;
      if(!containers[j].setWeight(weight, index + 1)) {
        let maxSpace = 0;
        let maxIndex = 0;
        for(let n = 0; n < containers.length; n++) {
          complexity += 1;
          const space = containers[n].getSpace();
          if (maxSpace < space) {
            maxSpace = space;
            maxIndex = n;
          }
        }
        complexity += 1;
        if (maxSpace < weight) {
          containers.push(new Container());
          j += 1;
          containers[j].setWeight(weight, index + 1);
          complexity += 1
        } else {
          containers[maxIndex].setWeight(weight, index + 1);
        }
      }
    })
    return  {containers: containers, complexity: complexity}
  }

  bfa(weights: number[]): {containers: Container[], complexity: number} {
    if(weights.length === 0) return null;
    let j = 0;
    let complexity = 1;
    const newContainer = new Container();
    newContainer.setWeight(weights[0], 0);
    const containers = [newContainer];
    weights.slice(1).forEach((weight, index) => {
      complexity += 1;
      if(!containers[j].setWeight(weight, index + 1)) {
        let minSpace = 0;
        let minIndex = j;
        for(let n = j; n > -1; n--) {
          let space = containers[n].getSpace();
          complexity += 2;
          if (minSpace > space && space >= weight) {
            minSpace = space;
            minIndex = n;
          }
        }
        complexity += 3;
        if(minSpace < weight) {
          containers.push(new Container());
          j += 1;
          containers[j].setWeight(weight, index + 1);
        } else {
          containers[minIndex].setWeight(weight, index + 1);
        }
      }
    })
    return  {containers: containers, complexity: complexity}
  }

}
