import ordersData from "../../orders.json";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  providerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  orderDate: string;
  deliveryDate?: string;
  deliveryAddress: string;
  rating: number;
  avatar: string;
}

export default async function OrderDetails({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  
  // Find the order by ID
  const order = (ordersData as Order[]).find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-zinc-400">
        <div className="text-6xl mb-4">❌</div>
        <p className="text-lg font-medium mb-2">Order Not Found</p>
        <p className="text-sm text-zinc-500">Order {orderId} could not be found</p>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {/* Order Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h2>
            <p className="text-sm text-gray-500">Placed on {order.orderDate}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
            order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
            order.status === 'out-for-delivery' ? 'bg-purple-100 text-purple-800' :
            'bg-red-100 text-red-800'
          }`}>
            {order.status.replace('-', ' ').toUpperCase()}
          </div>
        </div>

        {/* Customer Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
          <div className="flex items-center gap-4">
            <img 
              src={order.avatar} 
              alt={order.customerName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{order.customerName}</p>
              <p className="text-sm text-gray-500">{order.customerEmail}</p>
              <p className="text-sm text-gray-500">{order.deliveryAddress}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Order Items</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Item</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Quantity</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">${item.price.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 bg-gray-50">
                  <td colSpan={2} className="px-4 py-3 font-bold">Total Amount</td>
                  <td className="px-4 py-3 text-right font-bold">${order.totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Provider</p>
            <p className="font-medium">{order.providerName}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Rating</p>
            <div className="flex items-center gap-1">
              <span className="font-medium">{order.rating}</span>
              {order.rating > 0 && (
                <span className="text-yellow-500">⭐</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
