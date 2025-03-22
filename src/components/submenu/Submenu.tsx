"use client";

import { useState, memo } from "react";
import Link from "next/link";
import Menu from "./menu/Menu";

const Submenu = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => setHoveredMenu(menu);
  const handleMouseLeave = () => setHoveredMenu(null);

  console.log(hoveredMenu);

  const menuItems = [
    { name: "EYEGLASSES" },
    { name: "SCREEN GLASSES" },
    { name: "KIDS GLASSES" },
    { name: "CONTACT LENSES" },
    { name: "SUNGLASSES" },
    { name: "HOME EYE-TEST" },
    { name: "STORE LOCATOR" },
  ];

    // Menu data: this can be dynamic
    const dropdownSections = [
        {
          title: "SELECT CATEGORY",
          isCategory: true,
          items: [
            {
              label: "Men",
              description: "CLASSIC SUNGLASSES\nStarting From ₹1000",
              imageUrl: "/men.png",
            },
            {
              label: "Women",
              description: "PREMIUM SUNGLASSES\nStarting From ₹2700",
              imageUrl: "/women.png",
            },
          ],
        },
        {
          title: "Our Top Picks",
          items: ["Best Seller", "New Arrivals", "Power Sunglasses"],
        },
        {
          title: "Shape",
          items: [
            "Aviator",
            "Rounders",
            "Wayfarer",
            "Rectangle",
            "Hexagon",
            "Cat-Eye",
            "Clubmaster",
          ],
        },
        {
          title: "Collection",
          items: [
            "Maverick",
            "Fashion Essentials",
            "Aerodynamics",
            "Petite Sunglasses",
            "Havana",
            "Wedding Edit",
            "Holiday Edit",
            "Pilot",
          ],
        },
      ];

  return (
    <div className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

        {/* Menu */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.name)}
            //   onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-blue-600"
              >
                {item.name}
              </Link>

              {/* Dropdown Menu */}
              {hoveredMenu === item.name && item.name === "SUNGLASSES" && (
                <Menu sections={dropdownSections} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default memo(Submenu);