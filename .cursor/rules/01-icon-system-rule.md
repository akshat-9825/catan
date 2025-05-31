# Icon System Rules

## 🎯 Always use the centralized icon system
- **NEVER** import icons directly from `lucide-react` or any other icon library
- **ALWAYS** import icons from `@/lib/icons`
- This ensures tree-shaking, easy library switching, consistency, and unified API for both Lucide and custom icons

### ❌ Don't do this:
```tsx
import { Sun, Moon } from "lucide-react";
import { User, Mail } from "lucide-react";
// Custom SVG directly in component
<svg>...</svg>
```

### ✅ Do this instead:
```tsx
// Both Lucide and custom icons from same place
import { Sun, Moon, User, Mail, GoogleIcon } from "@/lib/icons";
```

## 📦 Expanded Icon Management

### The icon system is managed in: `src/lib/icons/`
```
src/lib/icons/
├── index.ts           # Main entry point - exports all icons
├── GoogleIcon.tsx     # Custom Google icon component  
└── README.md          # Documentation
```

#### Main index file: `src/lib/icons/index.ts`
```tsx
import { 
  User,
  Mail, 
  Lock,
  Sun,
  Moon,
  // ... only Lucide icons you actually use
} from 'lucide-react'

export type IconComponent = typeof User

// Lucide icons
export { 
  User,
  Mail, 
  Lock,
  Sun,
  Moon,
  // ... re-export all imported Lucide icons
}

// Custom icons
export { GoogleIcon } from './GoogleIcon'
```

## 📝 Adding New Icons

### Adding Lucide Icons

1. **Add to import list** in `src/lib/icons/index.ts`:
   ```tsx
   import { 
     User,
     Mail,
     NewIcon, // <- Add here
   } from 'lucide-react'
   ```

2. **Add to export list**:
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

### Adding Custom Icons

1. **Create component file** (e.g., `src/lib/icons/CustomIcon.tsx`):
   ```tsx
   import React from "react";

   export const CustomIcon = React.forwardRef<
     SVGSVGElement,
     React.SVGProps<SVGSVGElement>
   >(({ className, ...props }, ref) => {
     return (
       <svg 
         ref={ref}
         xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 24 24"
         width="24"
         height="24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         className={className}
         {...props}
       >
         {/* Your custom SVG content */}
       </svg>
     );
   });

   CustomIcon.displayName = "CustomIcon";
   ```

2. **Export from index.ts**:
   ```tsx
   // Custom icons
   export { GoogleIcon } from './GoogleIcon'
   export { CustomIcon } from './CustomIcon' // <- Add here
   ```

3. **Use it in your component**:
   ```tsx
   import { CustomIcon } from "@/lib/icons";
   ```

## 🎨 Icon Usage Guidelines

### Use consistent sizing with Tailwind:
```tsx
import { Settings, User, GoogleIcon } from "@/lib/icons";

// ✅ Consistent sizing for all icon types
<Settings className="size-4" />        // Small icons
<User className="size-5" />            // Medium icons
<GoogleIcon className="size-6" />      // Large icons
```

### Apply semantic styling:
```tsx
import { Trash2, Info, Save, GoogleIcon } from "@/lib/icons";

// ✅ Semantic coloring works for all icons
<Trash2 className="size-4 text-destructive" />
<Info className="size-4 text-muted-foreground" />
<Save className="size-4 text-primary" />
<GoogleIcon className="size-4 text-blue-600" />
```

## 🎯 Type Safety

Use the `IconComponent` type for consistency with both Lucide and custom icons:

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

2. **Don't create custom SVG components outside the icon system**
   ```tsx
   // ❌ Wrong - inline SVG
   <svg>...</svg>
   
   // ✅ Correct - create proper custom icon
   // Add to src/lib/icons/ and export from index.ts
   import { CustomIcon } from "@/lib/icons";
   ```

3. **Don't forget to add icons to both import and export (for Lucide icons)**
   ```tsx
   // ❌ Wrong - imported but not exported
   import { User, NewIcon } from 'lucide-react'
   export { User } // NewIcon missing
   
   // ✅ Correct - imported and exported
   import { User, NewIcon } from 'lucide-react'
   export { User, NewIcon }
   ```

4. **Don't use inconsistent sizing**
   ```tsx
   // ❌ Wrong - inconsistent sizing
   <User className="w-4 h-4" />
   <GoogleIcon className="size-5" />
   
   // ✅ Correct - consistent sizing
   <User className="size-4" />
   <GoogleIcon className="size-4" />
   ```

## 📊 Benefits of This Approach

- **Unified API**: All icons work the same way regardless of source
- **Simple**: Single import location for all icons
- **Tree-shakeable**: Only imported icons are bundled
- **Scalable**: Easy to add new icons (both Lucide and custom)
- **Maintainable**: Clear import/export pattern
- **Type-safe**: Consistent typing across the app
- **Library-agnostic**: Easy to switch icon libraries
- **Extensible**: Support for custom icons alongside library icons

## 🔄 Switching Icon Libraries

To switch from `lucide-react` to another library:

1. **Update the imports in `src/lib/icons/index.ts`**:
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

3. **Custom icons remain unchanged**

4. **Done!** Your entire app now uses the new library while keeping custom icons. 