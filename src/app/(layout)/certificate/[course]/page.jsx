import Certificate from '@/components/Certificate'
import React from 'react'

export default function Page({ params }) {
    return (
        <div>
            <Certificate course={params?.course} />
        </div>
    )
}
