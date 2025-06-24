"use client"
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useMemo,
} from "react"


export interface Product {
    _id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: { rate: number; count: number }
}

interface StoreContextType {
    products: Product[]
    filtered: Product[]

    selectedCategory: string
    setSelectedCategory: (c: string) => void
    searchQuery: string
    setSearchQuery: (q: string) => void
    loading: boolean
    error: string | null
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const useStore = () => {
    const context = useContext(StoreContext)
    if (!context) {
        throw new Error("useStore must be used within a StoreProvider")
    }
    return context
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const cached = localStorage.getItem("products")
        if (cached) {
            // setProducts(JSON.parse(cached))
            setLoading(false)
        } else {
            // fetch("https://fakestoreapi.com/products")
            fetch("api/product/get")
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data.data)
                    // console.log(products)

                    // localStorage.setItem("products", JSON.stringify(data))
                })
                .catch(() => setError("Failed to load products"))
                .finally(() => setLoading(false))
        }
    }, [])



    const filtered = useMemo(() => {
        return products.filter(
            (p) =>
                (selectedCategory === "" || p.category === selectedCategory) &&
                p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [products, selectedCategory, searchQuery])

    return (
        <StoreContext.Provider
            value={{
                products,
                filtered,

                selectedCategory,
                setSelectedCategory,
                searchQuery,
                setSearchQuery,
                loading,
                error,
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}
