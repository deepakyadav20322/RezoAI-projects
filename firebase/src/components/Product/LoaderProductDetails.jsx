import React from 'react'
export default function ProductDetailSkeleton() {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Skeleton */}
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
  
          {/* Content Skeleton */}
          <div className="space-y-4">
            {/* Title Skeleton */}
            <div className="h-8 bg-gray-200 rounded-md w-3/4 animate-pulse" />
  
            {/* Brand Skeleton */}
            <div className="h-4 bg-gray-200 rounded-md w-1/4 animate-pulse" />
  
            {/* Tags and Rating Skeleton */}
            <div className="flex items-center gap-4">
              <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
  
            {/* Price Skeleton */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-6 w-16 bg-gray-200 rounded-md animate-pulse" />
            </div>
  
          
            <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse" />
  \
            <div className='space-y-8'>
            <div className="space-y-6">
              <div className="h-4 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse" />
            </div>
  
          
            <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
  
          
            <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse mt-12" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  