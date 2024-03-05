export function getLatexFromHtmlString(html_string){
    let segregate_strings = segregateStringFromHtml(html_string)
    let latex = getOnlyLatexFromStrings(segregate_strings)
    return latex;
  }

export function segregateStringFromHtml(inputString) {
    inputString = inputString.replaceAll('<br/>','\n')
    inputString = inputString.replaceAll('<br>','\n')
    // Regular expression to match HTML tags
    const htmlRegex = /<[^>]+>/g;
  
    // Split the input string into an array of blocks based on HTML tags
    const blocks = inputString.split(htmlRegex);
  
    // Extract the HTML tags and intersperse them with the blocks
    const htmlTags = inputString.match(htmlRegex);
    const result = [];
    for (let i = 0; i < blocks.length; i++) {
      result.push(blocks[i]);
      if (i < htmlTags?.length) {
        result.push(htmlTags[i]);
      }
    }
  
    return result;
  }

  export function getOnlyLatexFromStrings(str){

    for(let i=0;i<str.length;i++){
     if(i<str.length-3 && str[i]?.includes("mq-selectable")){
      let latex = str[i+1].substring(1, str[i+1].length-1);
      i=i+3
      return latex
     }
    }

  }

