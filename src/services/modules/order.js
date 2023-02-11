import hyRequest from "../request"

export function getOrderList(type = "all"){
    return hyRequest.get({
        url: "`/order/list?type=${type}`"
    })
}