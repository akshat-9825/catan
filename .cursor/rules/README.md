# Cursor Rules for Catan Project

This folder contains organized cursor rules for the Catan project. Each rule file focuses on a specific aspect of the codebase to help Cursor understand project conventions and best practices.

## Rule Files

### `01-icon-system-rule.md`
Comprehensive rules for the centralized icon system:
- How to properly import icons from `@/lib/icons`
- Icon management patterns
- Type safety guidelines
- Common mistakes to avoid

## Naming Convention

Rule files use a numbered prefix (01-, 02-, etc.) to indicate priority and loading order, followed by a descriptive name that clearly indicates the rule's scope.

## Adding New Rules

When adding new rules:
1. Create a new `.md` file with an appropriate number prefix
2. Use clear, actionable guidelines
3. Include code examples for DO/DON'T patterns
4. Update this README to document the new rule

## Benefits

- **Organized**: Each rule set has its own focused file
- **Discoverable**: Clear naming makes it easy to find relevant rules
- **Maintainable**: Easy to update specific rule sets without affecting others
- **Scalable**: Simple to add new rule categories as the project grows 