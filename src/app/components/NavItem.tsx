import React from "react";

interface NavItemProps {
  label: string;
}

export const NavItem = ({ label }: NavItemProps) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};
