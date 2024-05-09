// utils.js

export function shortenTitle(title:string, maxLength:number) {
    if (title.length <= maxLength) {
      return title;
    } else {
      return title.substring(0, maxLength - 3) + "...";
    }
  }
  