export function CheckInputIsNumber(evt: any) {
    /*
    .html-> (keypress)="isNumber($event)"
    .ts->
    isNumber(evt: any) {
    return CheckInputIsNumber(evt);
  }
    */
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

export function amountToWords (num: string) {
  const word_1 = ['','ONE ','TWO ','THREE ','FOUR ', 'FIVE ','SIX ','SEVEN ','EIGHT ','NINE ','TEN ','ELEVEN ','TWELVE ','THIRTEEN ','FOURTEEN ','FIFTEEN ','SIXTEEN ','SEVENTEEN ','EIGHTEEN ','NINETEEN '];
  const word_2 = ['', '', 'TWENTY','THIRTY','FOURTY','FIFTY', 'SIXTY','SEVENTY','EIGHTY','NINETY'];
  
  if (num.toString().length > 9) return 'Overflow';
  
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  
  if (!n) return "" ; 
  
  let str = 'INR ';
  str += (n[1] != "0" && n[1] != "00") ? (word_1[Number(n[1])] || word_2[n[1][0]] + ' ' + word_1[n[1][1]]) + 'CRORE ' : '';
  str += (n[2] != "0" && n[2] != "00") ? (word_1[Number(n[2])] || word_2[n[2][0]] + ' ' + word_1[n[2][1]]) + 'LAKH ' : '';
  str += (n[3] != "0" && n[3] != "00") ? (word_1[Number(n[3])] || word_2[n[3][0]] + ' ' + word_1[n[3][1]]) + 'THOUSAND ' : '';
  str += (n[4] != "0" && n[4] != "00") ? (word_1[Number(n[4])] || word_2[n[4][0]] + ' ' + word_1[n[4][1]]) + 'HUNDRED ' : '';
  str += (n[5] != "0" && n[5] != "00") ? (str != 'INR ' ? 'AND ' : '') + (word_1[Number(n[5])] || word_2[n[5][0]] + ' ' + word_1[n[5][1]]) + 'ONLY ' : 'ONLY';
  return str;
}