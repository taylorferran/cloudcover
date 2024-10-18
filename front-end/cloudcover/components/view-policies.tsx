'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically come from an API or database
const policies = [
  { id: 1, flightNumber: "AA1234", costToCover: 50 },
  { id: 2, flightNumber: "UA5678", costToCover: 75 },
  { id: 3, flightNumber: "DL9012", costToCover: 60 },
  { id: 4, flightNumber: "WN3456", costToCover: 40 },
  { id: 5, flightNumber: "B67890", costToCover: 55 },
]

export function ViewPoliciesComponent() {
  const handleCoverPolicy = (policyId: number) => {
    // Here you would typically handle the action to cover the policy,
    // such as sending a request to an API
    console.log(`Covering policy with ID: ${policyId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Policies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <Card key={policy.id} className="w-full">
            <CardHeader>
              <CardTitle>Flight {policy.flightNumber}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                Cost to Cover: ${policy.costToCover.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleCoverPolicy(policy.id)}
              >
                Cover This Policy
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}