"use client"
import { useState } from "react"

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: { rate: "", count: "" }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        if (name === "rate" || name === "count") {
            setFormData((prev) => ({
                ...prev,
                rating: {
                    ...prev.rating,
                    [name]: value,
                },
            }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch("/api/product/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formData,
                price: parseFloat(formData.price),
                rating: {
                    rate: parseFloat(formData.rating.rate),
                    count: parseInt(formData.rating.count),
                },
            }),
        })

        if (res.ok) {
            alert("Product added!")
            setFormData({
                title: "",
                price: "",
                description: "",
                category: "",
                image: "",
                rating: { rate: "", count: "" },
            })
        } else {
            alert("Failed to add product")
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-black rounded shadow mt-10">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" required />
                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />

                <div className="flex gap-4">
                    <input type="number" name="rate" value={formData.rating.rate} onChange={handleChange} placeholder="Rating" className="w-full p-2 border rounded" required />
                    <input type="number" name="count" value={formData.rating.count} onChange={handleChange} placeholder="Rating Count" className="w-full p-2 border rounded" required />
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
            </form>
        </div>
    )
}

export default AddProduct
