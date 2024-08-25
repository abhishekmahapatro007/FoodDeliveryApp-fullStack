import React from 'react'

const OrderPage = () => {
  return (
    <div className='p-4 lg:px-20 xl:px-40'>
      <table className='w-full border-separate border-spacing-3'>
        <thead>
          <tr className='text-left'>
            <th className='hidden md:block'>Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className='hidden md:block'>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-sm md:text-base bg-fuchisia-50'>
            <td className='hidden md:block py-6 px-1'>2312321321312</td>
            <td className='py-6 px-1'>13.12.1212</td>
            <td className='py-6 px-1'>99.12</td>
            <td className='hidden md:block py-6 px-1'>menu lol</td>
            <td className='py-6 px-1'>On the way</td>
          </tr>

          <tr className='text-sm md:text-base odd:bg-gray-100'>
            <td className='hidden md:block py-6 px-1'>2312321321312</td>
            <td className='py-6 px-1'>13.12.1212</td>
            <td className='py-6 px-1'>99.12</td>
            <td className='hidden md:block py-6 px-1'>menu lol</td>
            <td className='py-6 px-1'>On the way</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrderPage
