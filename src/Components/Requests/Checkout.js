const Checkout = async (sum, currency, history, environment) => {
  let data = { amount: sum*100, currency};

console.log('environment:', environment)
  try {
    await fetch(`/card/newOrder${environment}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .then((body) => {
        history.push(`/card${environment}`, body);
      });
  } catch (err) {
    console.error(err);
  }
};

export default Checkout;
