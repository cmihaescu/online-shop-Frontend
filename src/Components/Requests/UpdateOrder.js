const UpdateOrderLive = async (sum, currency, order_id, history) => {
  let data = { amount: sum, currency:currency, order_id:order_id};

  try {
    await fetch("/card/updateOrderLive", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .then((body) => {
        history.push("/cardLive", body);
        console.log('update Order response', body)
      });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default UpdateOrderLive;
