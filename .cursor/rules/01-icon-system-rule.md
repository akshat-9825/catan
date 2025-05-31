# Icon System Rules

## 🎯 Always use the centralized icon system
- **NEVER** import icons directly from `lucide-react` or any other icon library
- **ALWAYS** import icons from `@/lib/icons`
- This ensures tree-shaking, easy library switching, and consistency

### ❌ Don't do this:
```tsx
import { Sun, Moon } from "lucide-react";
import { User, Mail } from "lucide-react";
```

### ✅ Do this instead:
```tsx
import { Sun, Moon, User, Mail } from "@/lib/icons";
```

## 📦 Simple Icon Management

### The icon system is managed in a single file: `src/lib/icons.ts`
```tsx
import { 
  User,
  Mail, 
  Lock,
  Sun,
  Moon,
  // ... only icons you actually use
} from 'lucide-react'

export type IconComponent = typeof User

export { 
  User,
  Mail, 
  Lock,
  Sun,
  Moon,
  // ... re-export all imported icons
}
```

## 📝 Adding New Icons

When you need a new icon:

1. **Add it to the import list** in `src/lib/icons.ts`:
   ```tsx
   import { 
     User,
     Mail,
     NewIcon, // <- Add here
   } from 'lucide-react'
   ```

2. **Add it to the export list**:
   ```tsx
   export { 
     User,
     Mail,
     NewIcon, // <- Add here
   }
   ```

3. **Use it in your component**:
   ```tsx
   import { NewIcon } from "@/lib/icons";
   ```

## 🎨 Icon Usage Guidelines

### Use consistent sizing with Tailwind:
```tsx
import { Settings, User } from "@/lib/icons";

// ✅ Consistent sizing
<Settings className="size-4" />        // Small icons
<User className="size-5" />            // Medium icons
<Home className="size-6" />            // Large icons
```

### Apply semantic styling:
```tsx
import { Trash2, Info, Save } from "@/lib/icons";

// ✅ Semantic coloring
<Trash2 className="size-4 text-destructive" />
<Info className="size-4 text-muted-foreground" />
<Save className="size-4 text-primary" />
```

## 🎯 Type Safety

Use the `IconComponent` type for consistency:

```tsx
import { IconComponent } from "@/lib/icons";

interface ButtonProps {
  icon: IconComponent;
  label: string;
}

function IconButton({ icon: Icon, label }: ButtonProps) {
  return (
    <button>
      <Icon className="size-4" />
      {label}
    </button>
  );
}
```

## 🚫 Common Mistakes to Avoid

1. **Don't import from lucide-react directly**
   ```tsx
   // ❌ Wrong
   import { User } from "lucide-react";
   
   // ✅ Correct  
   import { User } from "@/lib/icons";
   ```

2. **Don't forget to add icons to both import and export**
   ```tsx
   // ❌ Wrong - imported but not exported
   import { User, NewIcon } from 'lucide-react'
   export { User } // NewIcon missing
   
   // ✅ Correct - imported and exported
   import { User, NewIcon } from 'lucide-react'
   export { User, NewIcon }
   ```

3. **Don't use inconsistent sizing**
   ```tsx
   // ❌ Wrong - inconsistent sizing
   <User className="w-4 h-4" />
   <Mail className="size-5" />
   
   // ✅ Correct - consistent sizing
   <User className="size-4" />
   <Mail className="size-4" />
   ```

## 📊 Benefits of This Approach

- **Simple**: Single file to manage all icons
- **Tree-shakeable**: Only imported icons are bundled
- **Scalable**: Easy to add new icons as needed
- **Maintainable**: Clear import/export pattern
- **Type-safe**: Consistent typing across the app
- **Library-agnostic**: Easy to switch icon libraries

## 🔄 Switching Icon Libraries

To switch from `lucide-react` to another library:

1. **Update the import in `src/lib/icons.ts`**:
   ```tsx
   // Before
   import { User, Mail } from 'lucide-react'
   
   // After
   import { FaUser as User, FaEnvelope as Mail } from 'react-icons/fa'
   ```

2. **Update the type if needed**:
   ```tsx
   export type IconComponent = typeof User // Will automatically match new library
   ```

3. **Done!** Your entire app now uses the new library. 