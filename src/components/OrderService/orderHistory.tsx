export interface OrderHistoryProps {
    orderHistory: string[]
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({orderHistory}) => {
    return (
        <div>
            {orderHistory.map((order) => (
                <div key={order}>
                    <p>{order}</p>
                </div>
            ))}
        </div>
    )
}