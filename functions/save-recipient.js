

exports.handler = (event, context, callback) => {

  const data = JSON.parse(event.body);
  console.log("Function `save recipient` invoked", data);
  
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
  
};
