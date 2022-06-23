// make the function so that it rerenders
const RetrieveOrder = async (environment, order_id, history) => {
    try {
        await fetch(`/card/retrieveOrder${environment}`, {
            method:"POST",
            body:JSON.stringify({order_id}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => data)
        .then((body) => {
            // history.push(`/card${environment}`, body)
            console.log("retrieve order success", body)
            return body
        })
    } catch (error) {
        console.error(error);
        throw error
    }    
}

export default RetrieveOrder;