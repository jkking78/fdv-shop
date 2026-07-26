import React from 'react';

export default function CategoryPills({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="category-pills">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
