import React,{memo} from "react";

interface MenuSection {
  title: string;
  items: string[] | CategoryItem[];
  isCategory?: boolean; // Flag to indicate if it's a category section
}

interface CategoryItem {
  label: string;
  description: string;
  imageUrl: string;
}

interface DropdownMenuProps {
  sections: MenuSection[];
}

const Menu: React.FC<DropdownMenuProps> = ({ sections }) => {
  return (
    <div className="absolute left-0 top-full w-full bg-white shadow-md p-4 grid grid-cols-4 gap-4">
      {sections.map((section, index) => (
        <div key={index} className="space-y-4">
          <h4 className="font-semibold">{section.title}</h4>
          <div className="space-y-2">
            {section.isCategory ? (
              section.items.map((item: any, idx) => (
                <div
                  key={idx}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.label}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-2">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <ul className="space-y-2">
                {section.items.map((item: string, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Menu);