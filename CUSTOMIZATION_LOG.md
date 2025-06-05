# AI Chatbot Customization Log: Trauerreden Generator

This document records all customizations made to transform the generic AI chatbot into a specialized German funeral speech generator application.

## Overview

The original AI chatbot was customized to create "Trauerreden Generator" - a tool specifically designed to help users write funeral speeches in German.

## Recent Updates (January 2025)

### 3. Migration from V1 and AI Provider Integration

**Purpose**: Migrated metadata and system prompts from V1 Trauerredengenerator and integrated Anthropic Claude as the AI provider.

**Metadata Changes** (`app/layout.tsx`):

- Updated title from "Next.js Chatbot Template" to "Trauerredengenerator" with template support
- Changed description to German: "Ein Tool zur Erstellung von Trauerreden, das Ihnen hilft, Ihre Gedanken und Gefühle auszudrücken."
- Added proper favicon references (`/favicon-48x48.png`, `/favicon.ico`, `/apple-touch-icon.png`)
- Added web app manifest reference (`/site.webmanifest`)
- Updated metadataBase to use environment-specific URLs

**System Prompt Migration** (`lib/ai/prompts.ts`):

- Replaced generic English assistant prompt with German funeral speech specialist prompt
- Added strict German-only response requirement
- Implemented topic boundary enforcement (only funeral speech related topics)
- Maintained compatibility with existing artifacts system

**AI Provider Integration** (`lib/ai/providers.ts`):

- **Primary Provider**: Switched from xAI (Grok) to Anthropic (Claude) models
- **Chat Models**:
  - `chat-model`: Claude 3.5 Sonnet (main conversations)
  - `chat-model-reasoning`: Claude 3.5 Sonnet with reasoning middleware
- **Utility Models**:
  - `title-model`: Claude 3.5 Haiku (fast title generation)
  - `artifact-model`: Claude 3.5 Sonnet (document/code generation)
- **Reasoning Tags**: Updated from `<think>` to `<thinking>` for Claude compatibility
- **Legacy Support**: Kept xAI models commented out for easy rollback

**Error Handling Improvements** (`app/(chat)/api/chat/route.ts`):

- Fixed missing return statement in catch block for non-ChatSDKError exceptions
- Added proper error logging and 500 status response for unexpected errors
- Ensured all code paths return valid Response objects

**Key V1 System Prompt (Migrated)**:

```
Du bist ein professioneller Trauerredner, deine Aufgabe ist es Trauerreden für Angehörige zu schreiben um Trost und Erinnerung zu spenden.

Deine Antworten sind ausschließlich auf deutsch.

Wenn der Nutzer eine Nachricht schickt, die nichts mit Trauerreden zu tun hat, antworte mit:
"Ich bin leider nicht in der Lage, etwas anderes als Trauerreden zu schreiben. Bitte stelle eine Frage, die mit Trauerreden zu tun hat."
```

## Customizations Applied

### 1. Greeting Component (`components/greeting.tsx`)

**Purpose**: Changed the welcome screen from generic English greeting to German funeral speech generator introduction.

**Changes Made**:

- Updated title from "Hello there!" to "Trauerreden Generator"
- Replaced English content with German description of the tool
- Added comprehensive explanation about consulting with family, friends, and colleagues
- Added prompt text about starting with examples
- Modified layout structure:
  - Removed centered full-height layout
  - Added bordered card container with background and padding
  - Changed max-width from `max-w-3xl` to `max-w-2xl`
  - Added border, background, and padding for card appearance
- Maintained framer-motion animations with staggered delays
- Updated typography classes for proper hierarchy

**Key Content (German)**:

```
Title: "Trauerreden Generator"
Description: "Ein Tool, das dir hilft, deine Rede zu schreiben."
Explanation: Information about consulting with family, friends, colleagues, etc.
Prompt: "Du kannst mit den folgenden Beispielen beginnen:"
```

### 2. Suggested Actions Component (`components/suggested-actions.tsx`)

**Purpose**: Replaced generic English examples with specific German funeral speech prompts.

**Original Examples** (English):

- "What are the advantages of using Next.js?"
- "Write code to demonstrate djikstra's algorithm"
- "Help me write an essay about silicon valley"
- "What is the weather in San Francisco?"

**New Examples** (German Funeral Speech Focus):

1. **"Starte mit Informationen des Verstorbenen"**

   - Action: "Ich möchte eine Trauerrede erstellen."

2. **"Starte mit einem Beispiel einer Trauerrede"**

   - Action: Detailed example with Max Mustermann including:
     - Personal information (name, birth/death dates, birthplace)
     - Special characteristics (firefighter, father, husband, loves sea and sailing)
     - Achievements (3 children, 2 grandchildren, built 2 houses, 2 world trips)
     - Positive values (generous, helpful, donated to UNICEF, family-oriented)

3. **"Lade eine erstellte Trauerrede"**

   - Action: "Ich stelle eine bereits erstellte Trauerrede zur Verfügung, die du als Grundlage für weitere Reden nutzen kannst."

4. **"Überarbeite eine Trauerrede"**
   - Action: "Ich stelle dir eine bereits erstellte Trauerrede zur Verfügung, die du in einem anderen Stil als die bisherigen erstellen kannst."

**Technical Notes**:

- Maintained responsive grid layout (2 columns, mobile shows first 2 examples)
- Preserved framer-motion animations
- Kept modern UI styling and hover effects
- Integration with existing `append` function for message handling

## Files Modified

### Current Update Files

1. `app/layout.tsx` - Metadata migration from V1
2. `lib/ai/prompts.ts` - System prompt migration from V1
3. `lib/ai/providers.ts` - Anthropic Claude integration
4. `app/(chat)/api/chat/route.ts` - Error handling improvements

### Previous Customization Files

1. `components/greeting.tsx` - Welcome screen customization
2. `components/suggested-actions.tsx` - Example prompts replacement

## Architecture Notes

### Current vs V1 Differences

- **V1 Architecture**: Used `ChatPanel` component with embedded example messages and system messages
- **Current Architecture**: Separated concerns with `Greeting` component and `SuggestedActions` component
- **AI Provider**: V1 used OpenAI GPT-4o-mini, current uses Anthropic Claude 3.5 Sonnet/Haiku
- **System Messages**: V1 app included specific system messages for each example. Current architecture handles this at AI configuration level rather than in suggested actions.

### Integration Points

- `SuggestedActions` is called from `components/multimodal-input.tsx` when `messages.length === 0`
- `Greeting` is called from `components/messages.tsx` when `messages.length === 0`
- Both components use framer-motion for smooth animations
- AI provider configuration centralized in `lib/ai/providers.ts`

## V1 App Reference

The customizations were based on the V1 app located at `V1/reden-ai/` which contained:

- `components/empty-screen.tsx` - Original German welcome content
- `components/chat-panel.tsx` - Original German example messages with system prompts
- `lib/chat/actions.tsx` - Original OpenAI integration with German system prompt

### V1 System Messages (for future reference)

The V1 app included specific system messages for each example:

1. **Information gathering**: "Du bist ein erfahrener Trauerredner, der einfühlsame und persönliche Trauerreden verfasst..."
2. **Example processing**: "Du bist ein kreativer Redenschreiber, der lebendige und bewegende Trauerreden basierend auf gegebenen Informationen erstellt."
3. **Template usage**: "Du kannst diese Trauerrede als Grundlage für weitere Reden verwenden."
4. **Style revision**: "Du kannst diese Trauerrede in einem anderen Stil als die bisherigen erstellen."

## Environment Requirements

The application now requires the following environment variables:

- `ANTHROPIC_API_KEY` - For Claude AI models
- `AUTH_SECRET` - For authentication
- `POSTGRES_URL` - For database connection
- `VERCEL_URL` - For proper metadata base URL (optional, falls back to chat.vercel.ai)

## Future Considerations

1. **System Messages**: Consider implementing system message handling in the current architecture for more sophisticated AI behavior.
2. **Localization**: All content is currently hard-coded in German. Consider implementing i18n if multi-language support is needed.
3. **Database Schema**: The current app resolved database migration issues during setup. Ensure proper UUID types for foreign key relationships.
4. **AI Model Selection**: Users can now choose between different Claude models through the UI model selector.

## Deployment Notes

- Environment variables need to be properly configured (AUTH_SECRET, POSTGRES_URL, ANTHROPIC_API_KEY)
- Database migrations may need manual intervention for type consistency
- The app maintains the modern Next.js 15 architecture with enhanced security and performance features
- Anthropic API key must be valid and have sufficient credits

---

**Last Updated**: January 2025  
**App Version**: Trauerreden Generator based on AI Chatbot v3.0.23 with Anthropic Claude Integration
