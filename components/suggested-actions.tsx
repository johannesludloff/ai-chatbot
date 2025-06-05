'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
  selectedVisibilityType: VisibilityType;
}

function PureSuggestedActions({
  chatId,
  append,
  selectedVisibilityType,
}: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Starte mit Informationen',
      label: 'des Verstorbenen',
      action:
        'Ich möchte eine Trauerrede erstellen. Frage mich nach den Informationen des Verstorbenen, die dir dabei helfen eine Trauerrede zu erstellen.',
    },
    {
      title: 'Starte mit einem Beispiel',
      label: 'einer Trauerrede',
      action: `Erstelle eine Trauerrede basierend auf diesen Informationen:

Vorname: Max
Nachname: Mustermann
Geburtsdatum: 01.01.1970
Geburtsort: Musterstadt
Datum des Todes: 01.01.2021
Besondere Eigenschaften oder Fähigkeiten: Feuerwehrmann, Vater, Ehemann, liebt das Meer und das Segeln
Bedeutende Errungenschaften oder Ereignisse: hat 3 Kinder, hat 2 Enkelkinder, hat 2 Häuser gebaut, hat 2 Weltreisen gemacht
Positive Werte oder Eigenschaften: Großzügig und hilfsbereit, spendete Geld an Unicef, war immer für seine Familie da

Bitte erstelle eine einfühlsame Trauerrede von etwa 5-7 Minuten Länge.`,
    },
    {
      title: 'Lade eine erstellte Trauerrede',
      label: 'und erstelle weitere in diesem Stil',
      action:
        'Ich möchte dir eine bereits erstellte Trauerrede zeigen, damit du weitere Reden in einem ähnlichen Stil erstellen kannst. Bitte erkläre mir zunächst, wie ich die Trauerrede am besten zur Verfügung stelle, und welche Informationen du für neue Reden in diesem Stil benötigst.',
    },
    {
      title: 'Überarbeite eine Trauerrede',
      label: 'in einem anderen Stil',
      action:
        'Ich habe eine bereits geschriebene Trauerrede, die ich in einem anderen Stil überarbeiten möchte. Bitte erkläre mir, wie ich die bestehende Rede teilen kann und welche Stilrichtungen möglich sind (z.B. persönlicher, traditioneller, moderner, religiöser oder weltlicher).',
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
      return false;

    return true;
  },
);
