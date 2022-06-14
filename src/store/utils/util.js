export const getTargetGroup = (group_code) => {
    var yr = ''
    switch(group_code){
      case '1000':  yr = `Year 1`; break;
      case '0100':  yr = `Year 2`; break;
      case '0010':  yr = `Year 3`; break;
      case '0001':  yr = `Year 4`; break;
      case '0011':  yr = `Year 3 & Year 4`; break;
      case '0101':  yr = `Year 2 & Year 4`; break;
      case '0110':  yr = `Year 2 & Year 3`; break;
      case '0111':  yr = `Year 2,Year 3 & Year 4`; break;
      case '1011':  yr = `Year 1,Year 3 & Year 4`; break;
      case '1100':  yr = `Year 1 & Year 2`; break;
      case '1010':  yr = `Year 1 & Year 3`; break;
      case '1001':  yr = `Year 1 & Year 4`; break;
      case '1110':  yr = `Year 1,Year 2 & Year 3`; break;
      case '1101':  yr = `Year 1,Year 2 & Year 4`; break;
      case '1111':  yr = `Year 1,Year 2,Year 3 & Year 4`; break;
      case '0000':  yr = `All Students`; break;
      //default: yr = `International students`; break;
    }
    return yr
}