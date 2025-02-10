import React from 'react'   

const  OrderConfirmationLoading = ()=> {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 sm:p-6 md:p-8">
      
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 px-6 py-8 animate-pulse h-16 rounded" />

        <div className="p-6">
          <div className="text-center mb-8 space-y-2">
            <div className="h-6 w-48 bg-gray-200 rounded mx-auto animate-pulse " />
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto animate-pulse " />
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-8">
            <div className="space-y-4">
              <div className="h-7 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-2">
                {[41,42,43].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-7 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-2">
                {[1,2,3,4].map((_, i) => (
                  <div key={i} className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200 my-8" />

          <div className="mb-8">
            <div className="h-7 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
    </div>
          </div>

          <div className="h-px bg-gray-200 my-8" />

          <div className="bg-gray-100 p-6 rounded-lg flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded animate-pulse flex-shrink-0" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
          {[10,20,30].map((_, i) => (
            <div key={i} className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationLoading