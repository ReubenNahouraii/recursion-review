// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  // declare a result variable of type array
  let result = [];
  // helper function takes a node parameter --declare
  let intoEachNode = node => {
  //  check if the nodes classlist has any classes
    if (node.classList) {
      // cycle through classname looking for target 
      if (node.classList.contains(className)) {
        // if found add element to result  
        result.push(node);
      }
    }
    // check if node has any children
    if (node.childNodes) {
      //  if yes  
      node.childNodes.forEach(child => {
        // call function and pass children
        intoEachNode(child);
      });
    }
  };
    
  // invoke the helper function on the document body
  intoEachNode(document.body);

  return result;
};