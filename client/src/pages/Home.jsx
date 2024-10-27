'use client'

import { useNavigate } from 'react-router-dom'

export default function Example() {

    const navigate = useNavigate()
    return (
        <div className="bg-white">           
            <div className="mx-auto max-w-2xl h-screen flex flex-col justify-center">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Announcing our next round of funding.{' '}
                        <a href="#" className="font-semibold text-indigo-600">
                            <span aria-hidden="true" className="absolute inset-0" />
                            Read more <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                        Your News, Your Way.
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        Personalized news, trending topics, and seamless interaction <br /> curated just for you.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            onClick={() => navigate('/auth/register')}
                            className="rounded-md w-40 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Register now
                        </button>
                        <button
                            onClick={() => navigate('/auth/login')}
                            className="rounded-md w-40 border-indigo-600 border-[1px] px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}