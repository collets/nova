import { type MouseEvent } from 'react';
import { NavSection } from '../../types/site';
import { NavLink } from 'react-router-dom';

interface MenuListProps {
  items: NavSection[];
  onItemSelect?: (id: string, event: MouseEvent<HTMLAnchorElement>) => void;
}

export function MenuList({ items, onItemSelect }: MenuListProps) {
  return (
    <ul className="menu-list">
      {items.map((item) => (
        <li key={item.id}>
          <NavLink
            to={item.href}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            onClick={(event) => onItemSelect?.(item.id, event)}
          >
            <span className="cursor" aria-hidden="true">
              ▶
            </span>
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
