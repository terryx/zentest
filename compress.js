module.exports = (str) => {
  //expect input only contain [a-z]+
  const loweredStr = str.toLowerCase();

  const body = [];
  const tail = loweredStr
    .split('')
    .map(char => {
      return {
        count: 1,
        name: char
      }
    })
    .reduce((prev, curr) => {
      //increase count if value is the same
      if (prev.name === curr.name) {
        return {
          count: curr.count + prev.count,
          name: curr.name
        }
      }

      //push the unique record
      body.push(prev);

      //resume counting
      return curr;
    });

  body.push(tail);

  const result = body
    .map(data => data.name + data.count)
    .join('');

  return result;
};
