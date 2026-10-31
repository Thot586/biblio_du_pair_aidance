import { useState } from 'react';
import { Link } from 'react-router';
import { ExternalLink } from '@/shared/ui/ExternalLink';
import panel from '@/shared/ui/Panel.module.css';
import { NEEDS } from './needs';

export function ToolChooser() {
  const [needId, setNeedId] = useState<string | null>(null);
  const need = NEEDS.find((candidate) => candidate.id === needId);

  return (
    <div className={panel.tool}>
      <fieldset className={panel.step}>
        <legend className={panel.stepTitle}>Que cherchez-vous en ce moment ?</legend>
        <ul className={panel.choices}>
          {NEEDS.map((option) => (
            <li key={option.id}>
              <label className={panel.choice}>
                <input
                  type="radio"
                  name="besoin"
                  checked={needId === option.id}
                  onChange={() => setNeedId(option.id)}
                />
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div aria-live="polite">
        {need && (
          <section className={panel.result}>
            <h2 className={panel.stepTitle}>Par où commencer</h2>
            <p>{need.advice}</p>
            <ul className={panel.choices}>
              {need.tools.map((tool) => (
                <li key={tool.name}>
                  <ExternalLink href={tool.url}>{tool.name}</ExternalLink> : {tool.why}
                </li>
              ))}
            </ul>
            <p>
              Pour vous guider : <Link to={need.lesson.to}>{need.lesson.label}</Link>
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
