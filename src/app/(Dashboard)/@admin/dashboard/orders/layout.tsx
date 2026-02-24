export default function layout({ 
  children, 
  orderDetails 
}: { 
  children: React.ReactNode;
  orderDetails?: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex-1">{children}</div>
      <div className="w-80">
        {orderDetails}
      </div>
    </div>
  )
}
