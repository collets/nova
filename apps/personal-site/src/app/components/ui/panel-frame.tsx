import { PropsWithChildren } from 'react';

interface PanelFrameProps extends PropsWithChildren {
  id: string;
  title: string;
}

export function PanelFrame({ id, title, children }: PanelFrameProps) {
  return (
    <section id={id} className="panel panel-frame">
      <h2 className="ui-title">{title}</h2>
      {children}
    </section>
  );
}
