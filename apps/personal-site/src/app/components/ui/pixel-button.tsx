import { Link } from 'react-router-dom';

interface PixelButtonProps {
  href: string;
  label: string;
}

export function PixelButton({ href, label }: PixelButtonProps) {
  const isInternal = href.startsWith('/');

  if (isInternal) {
    return (
      <Link className="pixel-button" to={href}>
        {label}
      </Link>
    );
  }

  return (
    <a className="pixel-button" href={href}>
      {label}
    </a>
  );
}
