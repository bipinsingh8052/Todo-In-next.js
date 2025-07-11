import { Button } from '@/components/ui/button'
import React from 'react'

export default function cart() {
  return (
    <div>
      heloo word
   <Button>Checkout</Button>

        {/* ✅ Outline variant */}
        <Button variant="outline">Back</Button>

        {/* ✅ Destructive variant */}
        <Button variant="destructive">Delete</Button>

        {/* ✅ Large size */}
        <Button size="lg">Large Button</Button>
    </div>
  )
}
