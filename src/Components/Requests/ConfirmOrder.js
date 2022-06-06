const ConfirmOrder = async (payment_method_id, order_id) => {
    let data = {payment_method_id, order_id}

    try {
        await fetch("/card/confirmOrderSandbox", {
            method: "POST",
            body:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => data)
        .then((body) => alert("Order was succesfully captured"))
    } catch (error) {
        console.error(error);
    throw error;
    }
}

export default ConfirmOrder;