"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-[url('/hero-banner.jpg')] bg-cover bg-center flex items-center justify-center text-white text-center">
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Discover Your Perfect Pair</h1>
          <p className="mt-2 text-lg">Shop stylish eyeglasses at unbeatable prices</p>
          <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center">Featured Eyeglasses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src={`/products/product-${id}.jpg`}
                alt="Eyeglass"
                width={300}
                height={200}
                className="rounded-md"
              />
              <h3 className="mt-2 text-lg font-semibold">Eyeglass Model {id}</h3>
              <p className="text-gray-500">$99.99</p>
              <Button className="mt-3 flex items-center">
                <ShoppingCart className="mr-2" size={18} /> Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <h2 className="text-2xl font-bold text-center">Shop by Category</h2>
        <div className="flex justify-center mt-6 gap-6">
          {["Men", "Women", "Kids"].map((category) => (
            <Link key={category} href={`/category/${category.toLowerCase()}`}>
              <div className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600">
                {category}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}