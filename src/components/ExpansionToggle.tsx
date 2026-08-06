import { useEffect, useState } from 'react';
import { EXPANSIONS } from '~/expansions';
import type { Expansion } from '~/items';
import { groupLabel } from '~/styles/theme.css';
import {
  checkBox,
  checkBoxDisabled,
  checkBoxEnabled,
  container,
  expansionIcon,
  expansionIconDisabled,
  expansionIconEnabled,
  toggleInner,
  toggleItem,
  toggleItemDisabled,
  toggleItemEnabled,
  toggleRow,
} from './ExpansionToggle.css';

// Any non-base expansion string from Item.expansion gets a boolean toggle,
// plus a 'base' entry for the original game. Adding a new expansion to the
// Expansion union in items.ts automatically requires an entry here.
export type ExpansionState = { base: boolean } & Record<
  Exclude<Expansion, ''>,
  boolean
>;

const STORAGE_KEY = 'ror-enabled-expansions';

interface ExpansionToggleProps {
  onExpansionChange: (state: ExpansionState) => void;
}

// Build the default "everything enabled" state from the expansions config.
// Inactive expansions still get a true default so they work once activated
// without a code change. Exported so the route can seed its initial state from
// the same source rather than a hardcoded literal that can drift.
export function defaultExpansionState(): ExpansionState {
  const state = { base: true } as ExpansionState;
  for (const exp of EXPANSIONS) {
    if (exp.key !== '') {
      (state as Record<string, boolean>)[exp.key] = true;
    }
  }
  return state;
}

// Merge persisted preferences over the current defaults. Missing keys fall back
// to the default (true), so an expansion added since the user last visited
// shows up automatically; stored keys for expansions that no longer exist are
// dropped. Flip the fallback to false here to make new expansions opt-in.
function mergeStoredState(stored: unknown): ExpansionState {
  const base = defaultExpansionState();
  if (stored && typeof stored === 'object') {
    for (const key of Object.keys(base) as (keyof ExpansionState)[]) {
      const value = (stored as Record<string, unknown>)[key];
      if (typeof value === 'boolean') {
        base[key] = value;
      }
    }
  }
  return base;
}

export function ExpansionToggle({ onExpansionChange }: ExpansionToggleProps) {
  const [enabledExpansions, setEnabledExpansions] = useState<ExpansionState>(
    defaultExpansionState,
  );

  // Load persisted preferences after mount. Reading localStorage during the
  // initial render would diverge from the server-rendered markup, so it is
  // deferred to an effect.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setEnabledExpansions(mergeStoredState(JSON.parse(raw)));
      }
    } catch {
      // Ignore malformed or unavailable storage and keep the defaults.
    }
  }, []);

  useEffect(() => {
    onExpansionChange(enabledExpansions);
  }, [enabledExpansions, onExpansionChange]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enabledExpansions));
    } catch {
      // Ignore unavailable storage (e.g. private mode).
    }
  }, [enabledExpansions]);

  const toggleExpansion = (expansion: keyof ExpansionState) => {
    setEnabledExpansions((prev) => ({
      ...prev,
      [expansion]: !prev[expansion],
    }));
  };

  // Render toggles for every active, non-base expansion. The icon is optional
  // — when absent the toggle shows its checkbox and label only.
  const toggleable = EXPANSIONS.filter((exp) => exp.active && exp.key !== '');

  return (
    <div className={container}>
      <span className={groupLabel}>Expansions</span>
      <div className={toggleRow}>
        {toggleable.map((exp) => {
          const key = exp.key as Exclude<Expansion, ''>;
          const isEnabled = enabledExpansions[key];
          const itemClassName = `${toggleItem} ${isEnabled ? toggleItemEnabled : toggleItemDisabled}`;
          const boxClassName = `${checkBox} ${isEnabled ? checkBoxEnabled : checkBoxDisabled}`;
          const iconClassName = `${expansionIcon} ${isEnabled ? expansionIconEnabled : expansionIconDisabled}`;

          return (
            <button
              key={key}
              type="button"
              className={itemClassName}
              onClick={() => toggleExpansion(key)}
              aria-pressed={isEnabled}
              title={`${exp.name} - Click to ${isEnabled ? 'disable' : 'enable'}`}
            >
              <span className={toggleInner}>
                <span className={boxClassName} aria-hidden="true">
                  {isEnabled ? '✓' : ''}
                </span>
                {exp.icon && (
                  <span
                    className={iconClassName}
                    style={{ backgroundImage: `url(${exp.icon})` }}
                    aria-hidden="true"
                  />
                )}
                {exp.shortName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ExpansionToggle;
